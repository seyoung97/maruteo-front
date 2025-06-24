import { useState } from 'react';
import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import CommonCard from '@/components/common/CommonCard';
import CommonSelect from '@/components/common/CommonSelect';
import { useNavigate } from 'react-router-dom';

// 재능탐색 메인 페이지 - 카테고리 진입, 분기

// 더미 데이터 (AllClassListPage와 동일)
const dummyClasses = [
  { id: 1, title: '된장국 클래스', thumbnail: '/class1.jpg', garlic: 120, rating: 4.7, badge: '청년', type: 'youth' },
  { id: 2, title: '김치찌개 클래스', thumbnail: '/class2.jpg', garlic: 98, rating: 4.5, badge: '청년', type: 'youth' },
  { id: 3, title: '잡채 클래스', thumbnail: '/class3.jpg', garlic: 80, rating: 4.3, badge: '청년', type: 'youth' },
  { id: 4, title: '불고기 클래스', thumbnail: '/class4.jpg', garlic: 60, rating: 4.1, badge: '청년', type: 'youth' },
  { id: 5, title: '청국장 클래스', thumbnail: '/class5.jpg', garlic: 50, rating: 3.8, badge: '어르신', type: 'senior' },
];

const filterOptions = [
  { label: '최신순', value: 'latest' },
  { label: '인기순', value: 'popular' },
  { label: '찜 많은순', value: 'garlic' },
  { label: '별점 높은 순', value: 'rating' },
];

// 예시: 로그인 유저 타입 (실제론 context 등에서 받아야 함)
const userType: 'senior' | 'youth' = 'senior';

const ClassExplorePage = () => {
  const [sort, setSort] = useState('latest');
  const navigate = useNavigate();

  // 유저 타입에 따라 보여줄 데이터 필터링
  const filteredClasses = dummyClasses.filter(
    c => userType === 'senior' ? c.type === 'youth' : c.type === 'senior'
  );

  // 정렬 함수
  const sortData = (data: any[], sortKey: string) => {
    switch (sortKey) {
      case 'garlic': return [...data].sort((a, b) => b.garlic - a.garlic);
      case 'rating': return [...data].sort((a, b) => b.rating - a.rating);
      case 'popular': return [...data].sort((a, b) => b.garlic - a.garlic); // 임시: 인기순=찜순
      default: return data;
    }
  };

  return (
    <Box p={4}>
      <Heading size="md" mb={2}>수업 전체 목록</Heading>
      <CommonSelect
        options={filterOptions}
        value={sort}
        onChange={v => setSort(String(v))}
        placeholder="정렬 기준 선택"
      />
      <SimpleGrid columns={2} gap={4} mt={4}>
        {sortData(filteredClasses, sort).map(cls => (
          <CommonCard
            key={cls.id}
            thumbnail={cls.thumbnail}
            title={cls.title}
            garlicCount={cls.garlic}
            rating={cls.rating}
            badgeText={cls.badge}
            onClick={() => navigate(`/class/${cls.id}`)}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ClassExplorePage; 