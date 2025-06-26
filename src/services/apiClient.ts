import type { InternalAxiosRequestConfig } from 'axios';
import axios, { AxiosError } from 'axios';

import appConfig from '../config';
import { AuthErrorType, createApiError } from './types';

// 개발 환경에서는 프록시 사용 (상대 경로), 프로덕션에서는 절대 URL 사용
export const baseURL = import.meta.env.DEV ? '' : appConfig.API_URL;

// 토큰 관리 유틸리티 - Access 토큰만 사용
export const tokenManager = {
  getAccessToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken');
  },
  
  setAccessToken: (accessToken: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken);
    }
  },
  
  removeAccessToken: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
    }
  },
  
  hasAccessToken: (): boolean => {
    const token = tokenManager.getAccessToken();
    return token !== null && token !== '';
  },

  // JWT 토큰 만료 시간 확인 (선택적 기능)
  isTokenExpired: (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp < now;
    } catch {
      return true;
    }
  }
};

const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true, // 쿠키 포함하여 요청
});

// Request Interceptor: 모든 요청에 자동으로 토큰 추가
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 인증이 필요없는 엔드포인트 (화이트리스트)
    const publicEndpoints = ['/api/login', '/api/register'];
    const isPublicEndpoint = publicEndpoints.some(endpoint => 
      config.url?.includes(endpoint)
    );

    if (isPublicEndpoint) {
      return config;
    }

    const accessToken = tokenManager.getAccessToken();

    // 토큰을 헤더에 추가
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: 토큰 만료 시 자동 처리
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // 401 Unauthorized: 토큰이 만료되거나 유효하지 않음
    if (error.response?.status === 401) {
      tokenManager.removeAccessToken();
      
      // 로그인 페이지로 리다이렉트
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/auth/')) {
        window.location.href = '/auth/login';
      }
      
      return Promise.reject(createApiError.auth(AuthErrorType.TOKEN_EXPIRED, 401));
    }

    // 403 Forbidden: 권한 없음
    if (error.response?.status === 403) {
      return Promise.reject(createApiError.auth(AuthErrorType.PERMISSION_DENIED, 403));
    }

    // 기타 에러는 그대로 전달
    return Promise.reject(error);
  }
);

export default apiClient;

export const isAxiosError = <E>(err: unknown | AxiosError<E>): err is AxiosError<E> => {
  return axios.isAxiosError(err);
};

export * from './types';
