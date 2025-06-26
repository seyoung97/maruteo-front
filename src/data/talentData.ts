import type { TalentCategory } from '../services/talentTypes';

export const TALENT_CATEGORIES: TalentCategory[] = [
  {
    id: 'cooking',
    name: '요리',
    subCategories: [
      { id: 'korean-food', name: '한식', categoryId: 'cooking' },
      { id: 'chinese-food', name: '중식', categoryId: 'cooking' },
      { id: 'japanese-food', name: '일식', categoryId: 'cooking' },
      { id: 'western-food', name: '양식', categoryId: 'cooking' },
      { id: 'cooking-etc', name: '기타', categoryId: 'cooking' },
    ]
  },
  {
    id: 'it',
    name: 'IT',
    subCategories: [
      { id: 'smartphone-usage', name: '스마트폰 사용', categoryId: 'it' },
      { id: 'delivery-app-usage', name: '배달앱 사용', categoryId: 'it' },
      { id: 'internet-banking', name: '인터넷 뱅킹', categoryId: 'it' },
      { id: 'kiosk-usage', name: '키오스크 사용법', categoryId: 'it' },
      { id: 'voice-phishing', name: '보이스 피싱', categoryId: 'it' },
      { id: 'it-etc', name: '기타', categoryId: 'it' },
    ]
  },
  {
    id: 'instrument',
    name: '악기',
    subCategories: [
      { id: 'piano', name: '피아노', categoryId: 'instrument' },
      { id: 'guitar', name: '기타', categoryId: 'instrument' },
      { id: 'drums', name: '드럼', categoryId: 'instrument' },
      { id: 'ukulele', name: '우쿨렐레', categoryId: 'instrument' },
      { id: 'instrument-etc', name: '기타', categoryId: 'instrument' },
    ]
  },
  {
    id: 'exercise',
    name: '운동',
    subCategories: [
      { id: 'fitness', name: '헬스', categoryId: 'exercise' },
      { id: 'yoga', name: '요가', categoryId: 'exercise' },
      { id: 'walking', name: '걷기', categoryId: 'exercise' },
      { id: 'pingpong', name: '탁구', categoryId: 'exercise' },
      { id: 'exercise-etc', name: '기타', categoryId: 'exercise' },
    ]
  },
  {
    id: 'writing',
    name: '글쓰기',
    subCategories: [
      { id: 'diary', name: '일기', categoryId: 'writing' },
      { id: 'letter', name: '편지', categoryId: 'writing' },
      { id: 'poem', name: '시', categoryId: 'writing' },
      { id: 'essay', name: '수필', categoryId: 'writing' },
      { id: 'writing-etc', name: '기타', categoryId: 'writing' },
    ]
  },
  {
    id: 'art',
    name: '미술',
    subCategories: [
      { id: 'drawing', name: '수채화', categoryId: 'art' },
      { id: 'painting', name: '색연필화', categoryId: 'art' },
      { id: 'calligraphy', name: '캘리그라피', categoryId: 'art' },
      { id: 'paper-craft', name: '종이접기', categoryId: 'art' },
      { id: 'art-etc', name: '기타', categoryId: 'art' },
    ]
  },
  {
    id: 'farming',
    name: '농업',
    subCategories: [
      { id: 'gardening', name: '텃밭 가꾸기', categoryId: 'farming' },
      { id: 'farming-basic', name: '화분 관리', categoryId: 'farming' },
      { id: 'farming-basic', name: '작물 재배', categoryId: 'farming' },
      { id: 'farming-etc', name: '기타', categoryId: 'farming' },
    ]
  }
];