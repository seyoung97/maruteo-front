// Query Keys for React Query
// 타입 안전성과 계층적 구조를 위한 쿼리 키 정의

// src/services/queryKeys.ts
export const AUTH_QUERY_KEY = {
  all: ['auth'] as const,
  
  // 사용자 정보 관련
  user: () => ['auth', 'user'] as const,
  currentUser: () => ['auth', 'current-user'] as const,
  
  // 회원가입 관련
  register: {
    all: () => ['auth', 'register'] as const,
    validation: (field: string) => ['auth', 'register', 'validation', field] as const,
    emailCheck: (email: string) => ['auth', 'register', 'email-check', email] as const,
    usernameCheck: (username: string) => ['auth', 'register', 'username-check', username] as const,
    progress: () => ['auth', 'register', 'progress'] as const,
  },
  
  // 프로필 관련
  profile: {
    all: () => ['auth', 'profile'] as const,
    basic: () => ['auth', 'profile', 'basic'] as const,
    talents: () => ['auth', 'profile', 'talents'] as const,
    image: () => ['auth', 'profile', 'image'] as const,
  },
  
  // 로그인/인증 관련
  login: () => ['auth', 'login'] as const,
  logout: () => ['auth', 'logout'] as const,
  refresh: () => ['auth', 'refresh'] as const,
  
  // 권한/상태 관련
  authStatus: () => ['auth', 'status'] as const,
  permissions: (userId?: string) => 
    userId ? ['auth', 'permissions', userId] as const : ['auth', 'permissions'] as const,
};

export const CLASS_QUERY_KEY = {
  all: ['class'] as const,
  lists: () => ['class', 'list'] as const,
  list: (filters?: Record<string, unknown>) => 
    filters ? ['class', 'list', filters] as const : ['class', 'list'] as const,
  detail: (id: string | number) => ['class', 'detail', id] as const,
  byCategory: (category: string) => ['class', 'category', category] as const,
  search: (query: string) => ['class', 'search', query] as const,
};

export const GIVER_QUERY_KEY = {
  all: ['giver'] as const,
  lists: () => ['giver', 'list'] as const,
  list: (filters?: Record<string, unknown>) => 
    filters ? ['giver', 'list', filters] as const : ['giver', 'list'] as const,
  detail: (id: string | number) => ['giver', 'detail', id] as const,
  classes: (giverId: string | number) => ['giver', giverId, 'classes'] as const,
};

export const CHAT_QUERY_KEY = {
  all: ['chat'] as const,
  rooms: () => ['chat', 'rooms'] as const,
  room: (roomId: string | number) => ['chat', 'room', roomId] as const,
  messages: (roomId: string | number) => ['chat', 'room', roomId, 'messages'] as const,
};

export const RECOMMEND_QUERY_KEY = {
  all: ['recommendation'] as const,
  withParams: (params: Record<string, unknown>) => ['recommendation', params] as const,
  forUser: (userId?: string | number) => 
    userId ? ['recommendation', 'user', userId] as const : ['recommendation', 'user'] as const,
};

export const CLASS_LIST = ['classList'];
export const GIVER_LIST = ['giverList'];
export const CLASS_DETAIL = (id: number) => ['classDetail', id];
export const GIVER_DETAIL = (id: number) => ['giverDetail', id];

export const USER_WANT_TALENTS = ['userWantTalents'];
export const MY_INFO = ['myInfo'];
export const TALENT_LIST = ['talentList'];

// 사용 예시:
// useQuery({ queryKey: CLASS_QUERY_KEY.detail(1), queryFn: ... })
// useQuery({ queryKey: CLASS_QUERY_KEY.list({ category: 'cooking' }), queryFn: ... })
// queryClient.invalidateQueries({ queryKey: CLASS_QUERY_KEY.all }) 