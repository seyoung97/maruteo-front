import { atom } from 'jotai';

export interface RegisterFormData {
  // RegisterPage 데이터
  role: '청년' | '어르신';
  name: string;
  email: string;
  phone: string;
  birth: string;
  password: string;
  confirm_password: string;
  
  // ProfilePage 데이터
  gender: '남성' | '여성';
  address: string;
  bio: string;
  username: string;
  profile_image: string;
  
  // 재능 데이터
  have_talents: string[];
  want_talents: string[];
}

// 개별 필드 atoms
export const roleAtom = atom<'청년' | '어르신'>('청년');
export const nameAtom = atom('');
export const emailAtom = atom('');
export const phoneAtom = atom('');
export const birthAtom = atom('');
export const passwordAtom = atom('');
export const confirmPasswordAtom = atom('');
export const genderAtom = atom<'남성' | '여성'>('남성');
export const addressAtom = atom('');
export const bioAtom = atom('');
export const usernameAtom = atom('');
export const profileImageAtom = atom('');
export const haveTalentsAtom = atom<string[]>([]);
export const wantTalentsAtom = atom<string[]>([]);

// 전체 폼 데이터를 조합하는 derived atom
export const registerFormAtom = atom<RegisterFormData>((get) => ({
  role: get(roleAtom),
  name: get(nameAtom),
  email: get(emailAtom),
  phone: get(phoneAtom),
  birth: get(birthAtom),
  password: get(passwordAtom),
  confirm_password: get(confirmPasswordAtom),
  gender: get(genderAtom),
  address: get(addressAtom),
  bio: get(bioAtom),
  username: get(usernameAtom),
  profile_image: get(profileImageAtom),
  have_talents: get(haveTalentsAtom),
  want_talents: get(wantTalentsAtom),
}));