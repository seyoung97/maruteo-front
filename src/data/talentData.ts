import type { TalentCategory } from '../services/talentTypes';

export const TALENT_CATEGORIES: TalentCategory[] = [
  {
    id: 'memory',
    name: '암기',
    subCategories: [
      { id: 'memory-technique', name: '암기법', categoryId: 'memory' },
      { id: 'vocabulary', name: '어휘', categoryId: 'memory' },
    ]
  },
  {
    id: 'piano',
    name: '피아노',
    subCategories: [
      { id: 'piano-basic', name: '피아노 기초', categoryId: 'piano' },
      { id: 'piano-advanced', name: '피아노 고급', categoryId: 'piano' },
    ]
  },
  {
    id: 'music',
    name: '음악',
    subCategories: [
      { id: 'guitar', name: '기타', categoryId: 'music' },
      { id: 'electric-guitar', name: '일렉 기타', categoryId: 'music' },
      { id: 'bass', name: '베이스', categoryId: 'music' },
      { id: 'drums', name: '드럼', categoryId: 'music' },
      { id: 'ukulele', name: '우쿨렐레', categoryId: 'music' },
      { id: 'saxophone', name: '색소폰', categoryId: 'music' },
    ]
  },
  {
    id: 'it',
    name: 'IT',
    subCategories: [
      { id: 'programming', name: '프로그래밍', categoryId: 'it' },
      { id: 'web-dev', name: '웹 개발', categoryId: 'it' },
    ]
  },
  {
    id: 'exercise',
    name: '운동',
    subCategories: [
      { id: 'fitness', name: '헬스', categoryId: 'exercise' },
      { id: 'yoga', name: '요가', categoryId: 'exercise' },
    ]
  },
  {
    id: 'writing',
    name: '글쓰기',
    subCategories: [
      { id: 'creative-writing', name: '창작', categoryId: 'writing' },
      { id: 'essay', name: '에세이', categoryId: 'writing' },
    ]
  },
  {
    id: 'art',
    name: '미술',
    subCategories: [
      { id: 'drawing', name: '드로잉', categoryId: 'art' },
      { id: 'painting', name: '페인팅', categoryId: 'art' },
    ]
  },
  {
    id: 'farming',
    name: '농업',
    subCategories: [
      { id: 'gardening', name: '원예', categoryId: 'farming' },
      { id: 'farming-basic', name: '농업 기초', categoryId: 'farming' },
    ]
  }
];