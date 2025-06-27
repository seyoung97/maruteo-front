import apiClient from './apiClient';

// ===================== 타입 정의 =====================
// 1. 수업 목록 조회
export interface GetClassListRequest {
  category?: string;
  instructor_role?: string;
  sort?: string;
  page?: number;
  limit?: number;
}
export interface GetClassListResponse {
  message: string;
  data: Array<{
    id: number;
    title: string;
    description: string;
    location: string;
    date: string;
    garlic_count: number;
    rating: number;
    instructor: {
      id: number;
      name: string;
      role: string;
      profile_image: string;
    };
    thumbnail: string;
    is_liked: boolean;
    created_at: string;
  }>;
  pagination: {
    current_page: number;
    total_pages: number;
    total_count: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

// 2. 기부자(재능자) 목록 조회
export interface GetGiverListRequest {
  role?: string;
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
}
export interface GetGiverListResponse {
  message: string;
  data: Array<{
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    birth: string;
    role: string;
    gender: string;
    address: string;
    bio: string;
    profile_image: string;
    garlic_count: number;
    rating: number;
    is_liked: boolean;
    created_at: string;
  }>;
  pagination: {
    current_page: number;
    total_pages: number;
    total_count: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

// 3. 수업 상세 조회
export interface GetClassDetailResponse {
  message: string;
  data: {
    id: number;
    title: string;
    description: string;
    location: string;
    date: string;
    garlic_count: number;
    rating: number;
    instructor: {
      id: number;
      name: string;
      role: string;
      profile_image: string;
    };
    thumbnail: string;
    is_liked: boolean;
    created_at: string;
    // 필요시 상세 필드 추가
  };
}

// 4. 기부자(재능자) 상세 조회
export interface GetGiverDetailResponse {
  message: string;
  data: {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    birth: string;
    role: string;
    gender: string;
    address: string;
    bio: string;
    profile_image: string;
    garlic_count: number;
    rating: number;
    is_liked: boolean;
    created_at: string;
    // 필요시 상세 필드 추가
  };
}

// 5. 찜한 기부자 목록 조회
export interface GetUserWantTalentsRequest {
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
}
export interface GetUserWantTalentsResponse {
  message: string;
  data: Array<{
    user_id: number;
    talent_id: number;
    user: {
      id: number;
      name: string;
      username: string;
      role: string;
      profile_image: string;
      garlic_count: number;
      rating: number;
    };
    talent: {
      id: number;
      name: string;
    };
    liked_at: string;
  }>;
  pagination: {
    current_page: number;
    total_pages: number;
    total_count: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

// 6. 기부자 찜하기
export interface LikeGiverRequest {
  user_id: number;
  talent_id: number;
  action: 'like';
}
export interface LikeGiverResponse {
  message: string;
  data: {
    user_id: number;
    talent_id: number;
    is_liked: boolean;
  };
}

// 7. 기부자 찜 취소
export interface UnlikeGiverRequest {
  user_id: number;
  talent_id: number;
}
export interface UnlikeGiverResponse {
  message: string;
}

// 8. 내 정보 조회
export interface MyInfoResponse {
  message: string;
  data: {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    birth: string;
    role: string;
    gender: string;
    address: string;
    bio: string;
    profile_image: string;
    created_at: string;
  };
}

// 9. 재능(카테고리) 목록 조회
export interface TalentListResponse {
  message: string;
  data: Array<{
    id: number;
    name: string;
  }>;
}

// ===================== API 함수 =====================
// 1. 수업 목록 조회
export const getClassList = async (params: GetClassListRequest) => {
  const { data } = await apiClient.get<GetClassListResponse>('/lessons', { params });
  return data;
};

// 2. 기부자(재능자) 목록 조회
export const getGiverList = async (params: GetGiverListRequest) => {
  const { data } = await apiClient.get<GetGiverListResponse>('/users', { params });
  return data;
};

// 3. 수업 상세 조회
export const getClassDetail = async (id: number) => {
  const { data } = await apiClient.get<GetClassDetailResponse>(`/lessons/${id}`);
  return data;
};

// 4. 기부자(재능자) 상세 조회
export const getGiverDetail = async (id: number) => {
  const { data } = await apiClient.get<GetGiverDetailResponse>(`/users/${id}`);
  return data;
};

// 5. 찜한 기부자 목록 조회
export const getUserWantTalents = async (params: GetUserWantTalentsRequest) => {
  const { data } = await apiClient.get<GetUserWantTalentsResponse>('/user-want-talents', { params });
  return data;
};

// 6. 기부자 찜하기
export const likeGiver = async (body: LikeGiverRequest) => {
  const { data } = await apiClient.post<LikeGiverResponse>('/user-want-talents', body);
  return data;
};

// 7. 기부자 찜 취소
export const unlikeGiver = async (body: UnlikeGiverRequest) => {
  const { data } = await apiClient.delete<UnlikeGiverResponse>('/user-want-talents', { data: body });
  return data;
};

// 8. 내 정보 조회
export const getMyInfo = async () => {
  const { data } = await apiClient.get<MyInfoResponse>('/users/me');
  return data;
};

// 9. 재능(카테고리) 목록 조회
export const getTalentList = async () => {
  const { data } = await apiClient.get<TalentListResponse>('/talents');
  return data;
}; 