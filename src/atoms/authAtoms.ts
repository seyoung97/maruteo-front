import { atom } from 'jotai';

export interface User {
  id: string;
  email: string;
  name: string;
  userType: 'elder' | 'young';
  phone: string;
  birthDate: string;
}

// 사용자 정보 atom
export const userAtom = atom<User | null>(null);

// 로그인 상태 atom
export const isAuthenticatedAtom = atom((get) => get(userAtom) !== null);

// 로딩 상태 atom
export const authLoadingAtom = atom(false);