import { CommonCard } from '@/components/Card';
import { CommonSelect } from '@/components/Select';
import { Box, Heading, Input, SimpleGrid, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const filterOptions = [
  { label: '최신순', value: 'latest' },
  { label: '인기순', value: 'popular' },
  { label: '찜 많은순', value: 'garlic' },
  { label: '별점 높은 순', value: 'rating' },
];

// 예시 더미 데이터
const dummyGivers = [
  { id: 1, name: '김춘자', username: '@chunja', thumbnail: '/img1.jpg', garlic: 430, rating: 4.8, badge: '청년', type: 'youth', category: '한식', liked: true, isPopular: true, isNew: false },
  { id: 2, name: '이덕배', username: '@duckduck', thumbnail: '/img2.jpg', garlic: 320, rating: 4.5, badge: '청년', type: 'youth', category: '한식', liked: true, isPopular: false, isNew: true },
  { id: 3, name: '최민준', username: '@minji123', thumbnail: '/img3.jpg', garlic: 150, rating: 4.2, badge: '청년', type: 'youth', category: '한식', liked: false, isPopular: true, isNew: true },
  { id: 4, name: '정지영', username: '@ji-chef', thumbnail: '/img4.jpg', garlic: 89, rating: 4.0, badge: '청년', type: 'youth', category: '한식', liked: false, isPopular: false, isNew: false },
  { id: 5, name: '이옥자', username: '@dokja', thumbnail: '/img5.jpg', garlic: 70, rating: 3.9, badge: '어르신', type: 'senior', category: '중식', liked: false, isPopular: false, isNew: true },
];

const userType: 'senior' | 'youth' = 'senior'; // 예시: 로그인 유저 타입

const ClassExploreGiverListPage = () => {
  const { category } = useParams();
  const [filter, setFilter] = useState('latest');
  const [search, setSearch] = useState('');

  // 카테고리, 유저타입별 필터링
  const filtered = dummyGivers.filter(g => g.category === category && (userType === 'senior' ? g.type === 'youth' : g.type === 'senior'));
  // 검색
  const searched = filtered.filter(g => g.name.includes(search) || g.username.includes(search));
  // 정렬
  const sortData = (data, sortKey) => {
    switch (sortKey) {
      case 'garlic': return [...data].sort((a, b) => b.garlic - a.garlic);
      case 'rating': return [...data].sort((a, b) => b.rating - a.rating);
      case 'popular': return [...data].sort((a, b) => b.isPopular ? -1 : 1);
      default: return data;
    }
  };
  const sorted = sortData(searched, filter);

  // 상단 2+2+2
  const liked = sorted.filter(g => g.liked).slice(0, 2);
  const popular = sorted.filter(g => g.isPopular && !g.liked).slice(0, 2);
  const isNew = sorted.filter(g => g.isNew && !g.liked && !g.isPopular).slice(0, 2);
  const rest = sorted.filter(g => !liked.includes(g) && !popular.includes(g) && !isNew.includes(g));

  return (
    <Box p={4}>
      <Heading size="md" mb={2}>{category} 재능기부자 전체</Heading>
      <Input placeholder="기부자 검색" mb={2} value={search} onChange={e => setSearch(e.target.value)} />
      <CommonSelect options={filterOptions} value={filter} onChange={setFilter} placeholder="정렬 기준 선택" />
      <Text mt={4} mb={1} fontWeight="bold">내가 찜한 기부자</Text>
      <SimpleGrid columns={2} gap={4} mb={2}>
        {liked.map(giver => (
          <CommonCard key={giver.id} thumbnail={giver.thumbnail} title={giver.name} subtitle={giver.username} garlicCount={giver.garlic} rating={giver.rating} badgeText={giver.badge} onClick={() => {}} />
        ))}
      </SimpleGrid>
      <Text mb={1} fontWeight="bold">인기 기부자</Text>
      <SimpleGrid columns={2} gap={4} mb={2}>
        {popular.map(giver => (
          <CommonCard key={giver.id} thumbnail={giver.thumbnail} title={giver.name} subtitle={giver.username} garlicCount={giver.garlic} rating={giver.rating} badgeText={giver.badge} onClick={() => {}} />
        ))}
      </SimpleGrid>
      <Text mb={1} fontWeight="bold">신규 기부자</Text>
      <SimpleGrid columns={2} gap={4} mb={2}>
        {isNew.map(giver => (
          <CommonCard key={giver.id} thumbnail={giver.thumbnail} title={giver.name} subtitle={giver.username} garlicCount={giver.garlic} rating={giver.rating} badgeText={giver.badge} onClick={() => {}} />
        ))}
      </SimpleGrid>
      <Text mt={4} mb={1} fontWeight="bold">전체 기부자</Text>
      <SimpleGrid columns={2} gap={4}>
        {rest.map(giver => (
          <CommonCard key={giver.id} thumbnail={giver.thumbnail} title={giver.name} subtitle={giver.username} garlicCount={giver.garlic} rating={giver.rating} badgeText={giver.badge} onClick={() => {}} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ClassExploreGiverListPage; 