export interface ResponseDTO<T> {
  cause: string | null;
  data: T;
  error: string | null;
  message: string | null;
  status: number;
  timeStamp: Date;
}

// ========== 에러 타입 정의 ==========

// 에러 카테고리 분류
export enum ErrorCategory {
  NETWORK = 'NETWORK',           // 네트워크 관련 에러
  AUTHENTICATION = 'AUTH',       // 인증/인가 에러  
  VALIDATION = 'VALIDATION',     // 입력값 검증 에러
  SERVER = 'SERVER',            // 서버 내부 에러
  CLIENT = 'CLIENT',            // 클라이언트 에러
  BUSINESS = 'BUSINESS',        // 비즈니스 로직 에러
  UNKNOWN = 'UNKNOWN'           // 알 수 없는 에러
}

// HTTP 상태코드별 에러 타입
export enum HttpErrorCode {
  // 4xx Client Errors
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  
  // 5xx Server Errors
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

// 네트워크 에러 타입
export enum NetworkErrorType {
  TIMEOUT = 'TIMEOUT',
  CONNECTION_ERROR = 'CONNECTION_ERROR',
  DNS_ERROR = 'DNS_ERROR',
  SSL_ERROR = 'SSL_ERROR',
}

// 인증 관련 에러 타입
export enum AuthErrorType {
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_INVALID = 'TOKEN_INVALID',
  TOKEN_MISSING = 'TOKEN_MISSING',
  REFRESH_TOKEN_EXPIRED = 'REFRESH_TOKEN_EXPIRED',
  LOGIN_REQUIRED = 'LOGIN_REQUIRED',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
}

// 커스텀 에러 클래스
export class ApiError extends Error {
  public readonly category: ErrorCategory;
  public readonly statusCode?: number;
  public readonly errorCode?: string;
  public readonly cause?: string;
  public readonly timestamp: Date;
  public readonly requestId?: string;
  public readonly details?: Record<string, unknown>;

  constructor({
    message,
    category,
    statusCode,
    errorCode,
    cause,
    requestId,
    details,
  }: {
    message: string;
    category: ErrorCategory;
    statusCode?: number;
    errorCode?: string;
    cause?: string;
    requestId?: string;
    details?: Record<string, unknown>;
  }) {
    super(message);
    this.name = 'ApiError';
    this.category = category;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.cause = cause;
    this.timestamp = new Date();
    this.requestId = requestId;
    this.details = details;

    // Error 클래스 상속 시 필요한 설정
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  // 에러를 JSON으로 직렬화
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      category: this.category,
      statusCode: this.statusCode,
      errorCode: this.errorCode,
      cause: this.cause,
      timestamp: this.timestamp,
      requestId: this.requestId,
      details: this.details,
    };
  }

  // 사용자 친화적 메시지 생성
  getUserMessage(): string {
    switch (this.category) {
      case ErrorCategory.NETWORK:
        return '네트워크 연결을 확인해주세요.';
      case ErrorCategory.AUTHENTICATION:
        return '로그인이 필요합니다.';
      case ErrorCategory.VALIDATION:
        return '입력값을 확인해주세요.';
      case ErrorCategory.SERVER:
        return '서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
      case ErrorCategory.BUSINESS:
        return this.message || '요청을 처리할 수 없습니다.';
      default:
        return '알 수 없는 오류가 발생했습니다.';
    }
  }
}

// 특정 에러 타입들
export class NetworkError extends ApiError {
  constructor(type: NetworkErrorType, originalError?: Error) {
    super({
      message: `네트워크 오류: ${type}`,
      category: ErrorCategory.NETWORK,
      errorCode: type,
      cause: originalError?.message,
    });
  }
}

export class AuthenticationError extends ApiError {
  constructor(type: AuthErrorType, statusCode: number = 401) {
    super({
      message: `인증 오류: ${type}`,
      category: ErrorCategory.AUTHENTICATION,
      statusCode,
      errorCode: type,
    });
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: Record<string, unknown>) {
    super({
      message,
      category: ErrorCategory.VALIDATION,
      statusCode: 400,
      details,
    });
  }
}

export class ServerError extends ApiError {
  constructor(statusCode: number, message?: string) {
    super({
      message: message || '서버 오류가 발생했습니다.',
      category: ErrorCategory.SERVER,
      statusCode,
    });
  }
}

// 에러 팩토리 함수들
export const createApiError = {
  network: (type: NetworkErrorType, originalError?: Error) => 
    new NetworkError(type, originalError),
    
  auth: (type: AuthErrorType, statusCode?: number) => 
    new AuthenticationError(type, statusCode),
    
  validation: (message: string, details?: Record<string, unknown>) => 
    new ValidationError(message, details),
    
  server: (statusCode: number, message?: string) => 
    new ServerError(statusCode, message),
    
  business: (message: string, details?: Record<string, unknown>) => 
    new ApiError({
      message,
      category: ErrorCategory.BUSINESS,
      details,
    }),
    
  unknown: (message: string, originalError?: Error) => 
    new ApiError({
      message,
      category: ErrorCategory.UNKNOWN,
      cause: originalError?.message,
    }),
};

// 에러 타입 가드 함수들
export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof ApiError;
};

export const isNetworkError = (error: unknown): error is NetworkError => {
  return error instanceof NetworkError;
};

export const isAuthError = (error: unknown): error is AuthenticationError => {
  return error instanceof AuthenticationError;
};

export const isValidationError = (error: unknown): error is ValidationError => {
  return error instanceof ValidationError;
};

export const isServerError = (error: unknown): error is ServerError => {
  return error instanceof ServerError;
};