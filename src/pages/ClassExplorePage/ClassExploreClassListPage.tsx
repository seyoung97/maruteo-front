import CommonCard from '@/components/common/CommonCard';
import CommonSelect from '@/components/common/CommonSelect';
import { Box, Heading, Input, SimpleGrid } from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const filterOptions = [
  { label: '최신순', value: 'latest' },
  { label: '인기순', value: 'popular' },
  { label: '찜 많은순', value: 'garlic' },
  { label: '별점 높은 순', value: 'rating' },
];

// 예시 더미 데이터
const dummyClasses = [
  { id: 1, title: '할머니표 마늘닭볶음 버벌', thumbnail: '/class1.jpg', garlic: 120, rating: 4.7, badge: '청년', type: 'youth', category: '한식' },
  { id: 2, title: '의성마늘불고기 배우기', thumbnail: '/class2.jpg', garlic: 98, rating: 4.5, badge: '청년', type: 'youth', category: '한식' },
  { id: 3, title: '된장국 클래스', thumbnail: '/class3.jpg', garlic: 80, rating: 4.3, badge: '청년', type: 'youth', category: '한식' },
  { id: 4, title: '김치찌개 클래스', thumbnail: '/class4.jpg', garlic: 60, rating: 4.1, badge: '청년', type: 'youth', category: '한식' },
  { id: 5, title: '중식 볶음밥 클래스', thumbnail: '/class5.jpg', garlic: 50, rating: 3.8, badge: '어르신', type: 'senior', category: '중식' },
];

const userType: 'senior' | 'youth' = 'senior'; // 예시: 로그인 유저 타입

const ClassExploreClassListPage = () => {
  const { category } = useParams();
  const [filter, setFilter] = useState('latest');
  const [search, setSearch] = useState('');

  // 카테고리, 유저타입별 필터링
  const filtered = dummyClasses.filter(c => c.category === category && (userType === 'senior' ? c.type === 'youth' : c.type === 'senior'));
  // 검색
  const searched = filtered.filter(c => c.title.includes(search));
  // 정렬
  const sortData = (data, sortKey) => {
    switch (sortKey) {
      case 'garlic': return [...data].sort((a, b) => b.garlic - a.garlic);
      case 'rating': return [...data].sort((a, b) => b.rating - a.rating);
      case 'popular': return [...data].sort((a, b) => b.garlic - a.garlic); // 임시
      default: return data;
    }
  };
  const sorted = sortData(searched, filter);

  return (
    <Box p={4}>
      <Heading size="md" mb={2}>{category} 수업 전체</Heading>
      <Input placeholder="수업 검색" mb={2} value={search} onChange={e => setSearch(e.target.value)} />
      <CommonSelect options={filterOptions} value={filter} onChange={setFilter} placeholder="정렬 기준 선택" />
      <SimpleGrid columns={2} gap={4} mt={4}>
        {sorted.map(cls => (
          <CommonCard key={cls.id} thumbnail={cls.thumbnail} title={cls.title} garlicCount={cls.garlic} rating={cls.rating} badgeText={cls.badge} onClick={() => {}} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ClassExploreClassListPage; 