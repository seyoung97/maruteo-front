// Query Keys for React Query
// 타입 안전성과 계층적 구조를 위한 쿼리 키 정의

export const AUTH_QUERY_KEY = {
  all: ['auth'] as const,
  user: () => ['auth', 'user'] as const,
  profile: () => ['auth', 'profile'] as const,
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

// 사용 예시:
// useQuery({ queryKey: CLASS_QUERY_KEY.detail(1), queryFn: ... })
// useQuery({ queryKey: CLASS_QUERY_KEY.list({ category: 'cooking' }), queryFn: ... })
// queryClient.invalidateQueries({ queryKey: CLASS_QUERY_KEY.all }) 