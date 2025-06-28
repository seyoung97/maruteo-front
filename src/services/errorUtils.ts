import { AxiosError } from 'axios';
import {
  ApiError,
  AuthErrorType,
  createApiError,
  ErrorCategory,
  HttpErrorCode,
  NetworkErrorType,
  type ResponseDTO
} from './types';

// ========== 에러 변환 함수들 ==========

/**
 * Axios 에러를 ApiError로 변환
 */
export const transformAxiosError = (error: AxiosError): ApiError => {
  // 네트워크 에러 (요청이 서버에 도달하지 못함)
  if (!error.response) {
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      return createApiError.network(NetworkErrorType.TIMEOUT, error);
    }
    if (error.code === 'ERR_NETWORK') {
      return createApiError.network(NetworkErrorType.CONNECTION_ERROR, error);
    }
    return createApiError.network(NetworkErrorType.CONNECTION_ERROR, error);
  }

  const { status, data } = error.response;
  const responseData = data as ResponseDTO<unknown>;

  // 서버에서 온 에러 메시지 우선 사용
  const message = responseData?.message || responseData?.error || error.message;
  const cause = responseData?.cause || undefined;

  // HTTP 상태코드별 에러 분류
  switch (status) {
    case HttpErrorCode.UNAUTHORIZED:
      // 토큰 관련 에러 세분화
      if (message?.includes('token') || message?.includes('expired')) {
        return createApiError.auth(AuthErrorType.TOKEN_EXPIRED, status);
      }
      if (message?.includes('invalid')) {
        return createApiError.auth(AuthErrorType.TOKEN_INVALID, status);
      }
      return createApiError.auth(AuthErrorType.LOGIN_REQUIRED, status);

    case HttpErrorCode.FORBIDDEN:
      return createApiError.auth(AuthErrorType.PERMISSION_DENIED, status);

    case HttpErrorCode.BAD_REQUEST:
    case HttpErrorCode.UNPROCESSABLE_ENTITY:
      return createApiError.validation(message, { 
        cause,
        originalError: responseData 
      });

    case HttpErrorCode.NOT_FOUND:
      return createApiError.business('요청한 리소스를 찾을 수 없습니다.', {
        cause,
        statusCode: status
      });

    case HttpErrorCode.CONFLICT:
      return createApiError.business('이미 존재하는 데이터입니다.', {
        cause,
        statusCode: status
      });

    case HttpErrorCode.TOO_MANY_REQUESTS:
      return createApiError.business('너무 많은 요청입니다. 잠시 후 다시 시도해주세요.', {
        cause,
        statusCode: status
      });

    case HttpErrorCode.INTERNAL_SERVER_ERROR:
    case HttpErrorCode.BAD_GATEWAY:
    case HttpErrorCode.SERVICE_UNAVAILABLE:
    case HttpErrorCode.GATEWAY_TIMEOUT:
      return createApiError.server(status, message);

    default:
      // 기타 에러들
      if (status >= 400 && status < 500) {
        return createApiError.business(message, { cause, statusCode: status });
      }
      if (status >= 500) {
        return createApiError.server(status, message);
      }
      return createApiError.unknown(message, error);
  }
};

/**
 * 일반 에러를 ApiError로 변환
 */
export const transformGenericError = (error: unknown): ApiError => {
  if (error instanceof ApiError) {
    return error;
  }

  if (error instanceof Error) {
    return createApiError.unknown(error.message, error);
  }

  if (typeof error === 'string') {
    return createApiError.unknown(error);
  }

  return createApiError.unknown('알 수 없는 오류가 발생했습니다.');
};

// ========== 에러 처리 헬퍼 함수들 ==========

/**
 * 재시도 가능한 에러인지 확인
 */
export const isRetryableError = (error: ApiError): boolean => {
  // 네트워크 에러는 재시도 가능
  if (error.category === ErrorCategory.NETWORK) {
    return true;
  }

  // 5xx 서버 에러는 재시도 가능
  if (error.category === ErrorCategory.SERVER) {
    return true;
  }

  // 429 Too Many Requests는 재시도 가능
  if (error.statusCode === HttpErrorCode.TOO_MANY_REQUESTS) {
    return true;
  }

  return false;
};

/**
 * 토큰 갱신이 필요한 에러인지 확인
 */
export const isTokenRefreshNeeded = (error: ApiError): boolean => {
  return (
    error.category === ErrorCategory.AUTHENTICATION &&
    error.errorCode === AuthErrorType.TOKEN_EXPIRED
  );
};

/**
 * 로그아웃이 필요한 에러인지 확인
 */
export const isLogoutRequired = (error: ApiError): boolean => {
  return (
    error.category === ErrorCategory.AUTHENTICATION &&
    (error.errorCode === AuthErrorType.TOKEN_INVALID ||
     error.errorCode === AuthErrorType.REFRESH_TOKEN_EXPIRED)
  );
};

/**
 * 사용자에게 표시할 에러 메시지 생성
 */
export const getDisplayMessage = (error: ApiError): string => {
  // 개발 환경에서는 상세 메시지, 운영 환경에서는 사용자 친화적 메시지
  if (import.meta.env.DEV) {
    return `[${error.category}] ${error.message}`;
  }

  return error.getUserMessage();
};

/**
 * 에러 로깅용 정보 생성
 */
export const getErrorLogInfo = (error: ApiError, context?: Record<string, unknown>) => {
  return {
    ...error.toJSON(),
    context,
    stack: error.stack,
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
    url: typeof window !== 'undefined' ? window.location.href : undefined,
  };
};

// ========== 에러 처리 데코레이터 ==========

/**
 * 비동기 함수의 에러를 자동으로 변환하는 래퍼
 */
export const withErrorHandling = <T extends unknown[], R>(
  fn: (...args: T) => Promise<R>
) => {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw transformGenericError(error);
    }
  };
};

/**
 * 에러 발생 시 기본값을 반환하는 래퍼
 */
export const withErrorFallback = <T extends unknown[], R>(
  fn: (...args: T) => Promise<R>,
  fallback: R
) => {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args);
    } catch (error) {
      console.error('Error caught and fallback applied:', error);
      return fallback;
    }
  };
}; 