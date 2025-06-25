import apiClient, { tokenManager } from './apiClient';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    userType: 'elder' | 'young';
    phone: string;
    birthDate: string;
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  userType: 'elder' | 'young';
  phone: string;
  birthDate: string;
  passwordConfirm: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  userType: 'elder' | 'young';
  phone: string;
  birthDate: string;
}

export const authService = {
  // 로그인
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/api/login', data);
    const { accessToken } = response.data;
    
    // 토큰 저장
    tokenManager.setAccessToken(accessToken);
    
    return response.data;
  },

  // 회원가입
  register: async (data: RegisterRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/api/register', data);
    const { accessToken } = response.data;
    
    // 토큰 저장
    tokenManager.setAccessToken(accessToken);
    
    return response.data;
  },

  // 현재 사용자 정보 조회
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  },

  // 로그아웃
  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      // 서버 요청 성공/실패와 관계없이 로컬 토큰 제거
      tokenManager.removeAccessToken();
    }
  },

  // 로그인 상태 확인
  isLoggedIn: (): boolean => {
    return tokenManager.hasAccessToken();
  },

  // 토큰 유효성 검사 (선택적)
  isTokenValid: (): boolean => {
    const token = tokenManager.getAccessToken();
    if (!token) return false;
    
    return !tokenManager.isTokenExpired(token);
  },
};