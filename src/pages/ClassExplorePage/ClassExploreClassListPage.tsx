import { CommonCard } from '@/components/Card';
import { CommonSelect } from '@/components/Select';
import { Box, Heading, Input, SimpleGrid, Text, HStack, IconButton } from '@chakra-ui/react';
import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

const filterOptions = [
  { label: '최신순', value: 'latest' },
  { label: '인기순', value: 'popular' },
  { label: '찜 많은순', value: 'garlic' },
  { label: '별점 높은 순', value: 'rating' },
];

// 예시 더미 데이터
type ClassType = {
  id: number;
  title: string;
  thumbnail: string;
  garlic: number;
  rating: number;
  badge: string;
  type: 'youth' | 'senior';
  category: string;
  liked?: boolean;
  todayJoined?: boolean;
};

const dummyClasses: ClassType[] = [
  { id: 1, title: '할머니표 마늘닭볶음', thumbnail: '/class1.jpg', garlic: 120, rating: 4.7, badge: '청년', type: 'youth', category: '한식', liked: true, todayJoined: false },
  { id: 2, title: '의성마늘불고기 배우기', thumbnail: '/class2.jpg', garlic: 98, rating: 4.5, badge: '청년', type: 'youth', category: '한식', liked: true, todayJoined: true },
  { id: 3, title: '된장국 클래스', thumbnail: '/class3.jpg', garlic: 80, rating: 4.3, badge: '청년', type: 'youth', category: '한식', liked: false, todayJoined: false },
  { id: 4, title: '김치찌개 클래스', thumbnail: '/class4.jpg', garlic: 60, rating: 4.1, badge: '청년', type: 'youth', category: '한식', liked: false, todayJoined: true },
  { id: 5, title: '중식 볶음밥 클래스', thumbnail: '/class5.jpg', garlic: 50, rating: 3.8, badge: '어르신', type: 'senior', category: '중식', liked: false, todayJoined: false },
];

const userType: 'senior' | 'youth' = 'senior'; // 예시: 로그인 유저 타입

// 가로 스크롤 섹션 공통 컴포넌트
function HorizontalScrollSection({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === 'left' ? -220 : 220,
        behavior: 'smooth',
      });
    }
  };
  return (
    <Box position="relative" mb={2}>
      <IconButton
        aria-label="왼쪽"
        children={<LuChevronLeft color="white" />}
        size="sm"
        position="absolute"
        left={-2}
        top="50%"
        transform="translateY(-50%)"
        zIndex={1}
        onClick={() => scrollBy('left')}
        bg="green.500"
        boxShadow="md"
        _hover={{ bg: 'green.600' }}
      />
      <Box overflowX="auto" ref={scrollRef} px={8}>
        <HStack gap={4} minW={0}>{children}</HStack>
      </Box>
      <IconButton
        aria-label="오른쪽"
        children={<LuChevronRight color="white" />}
        size="sm"
        position="absolute"
        right={-2}
        top="50%"
        transform="translateY(-50%)"
        zIndex={1}
        onClick={() => scrollBy('right')}
        bg="green.500"
        boxShadow="md"
        _hover={{ bg: 'green.600' }}
      />
    </Box>
  );
}

const ClassExploreClassListPage = () => {
  const { category } = useParams();
  const [filter, setFilter] = useState('latest');
  const [search, setSearch] = useState('');

  // 카테고리, 유저타입별 필터링
  const filtered = dummyClasses.filter(c => c.category === category && (userType === 'senior' ? c.type === 'youth' : c.type === 'senior'));
  // 검색
  const searched = filtered.filter(c => c.title.includes(search));
  // 정렬
  const sortData = (data: ClassType[], sortKey: string): ClassType[] => {
    switch (sortKey) {
      case 'latest':
        return [...data].sort((a, b) => b.id - a.id); // id 내림차순(최신)
      case 'popular':
        return [...data].sort((a, b) => b.garlic - a.garlic); // 마늘 많은 순(인기)
      case 'garlic':
        return [...data].sort((a, b) => (b.liked ? 1 : 0) - (a.liked ? 1 : 0)); // 찜 많은 순(찜 true 우선)
      case 'rating':
        return [...data].sort((a, b) => b.rating - a.rating); // 별점 높은 순
      default:
        return data;
    }
  };
  const sorted = sortData(searched, filter);

  // 내가 찜한 수업, 인기 수업(찜 많은순), 신규 수업(오늘 등록)
  const liked = filtered.filter(c => c.liked).slice(0, 4);
  const popular = filtered.filter(c => c.garlic >= 90).slice(0, 4); // 예시: 마늘 90개 이상 인기
  const isNew = filtered.filter(c => c.todayJoined).slice(0, 4);

  return (
    <Box p={4}>
      <Heading size="md" mb={2}>{category} 수업 전체</Heading>
      <Input placeholder="수업 검색" mb={2} value={search} onChange={e => setSearch(e.target.value)} />
      <Text mt={4} mb={1} fontWeight="bold">내가 찜한 수업</Text>
      <HorizontalScrollSection>
        {liked.map((cls: ClassType) => (
          <Box bg="green.50" borderRadius="lg" p={1} minW="180px" maxW="220px">
            <CommonCard key={cls.id} thumbnail={cls.thumbnail} title={cls.title} garlicCount={cls.garlic} rating={cls.rating} badgeText={cls.badge === '청년' ? '청년기부자' : cls.badge} onClick={() => {}} />
          </Box>
        ))}
      </HorizontalScrollSection>
      <Text mb={1} fontWeight="bold">인기 수업</Text>
      <HorizontalScrollSection>
        {popular.map((cls: ClassType) => (
          <Box bg="green.50" borderRadius="lg" p={1} minW="180px" maxW="220px">
            <CommonCard key={cls.id} thumbnail={cls.thumbnail} title={cls.title} garlicCount={cls.garlic} rating={cls.rating} badgeText={cls.badge === '청년' ? '청년기부자' : cls.badge} onClick={() => {}} />
          </Box>
        ))}
      </HorizontalScrollSection>
      <Text mb={1} fontWeight="bold">신규 수업</Text>
      <HorizontalScrollSection>
        {isNew.map((cls: ClassType) => (
          <Box bg="green.50" borderRadius="lg" p={1} minW="180px" maxW="220px">
            <CommonCard key={cls.id} thumbnail={cls.thumbnail} title={cls.title} garlicCount={cls.garlic} rating={cls.rating} badgeText={cls.badge === '청년' ? '청년기부자' : cls.badge} onClick={() => {}} />
          </Box>
        ))}
      </HorizontalScrollSection>
      <Text mt={4} mb={1} fontWeight="bold">전체 수업</Text>
      <Box mb={2}>
        <CommonSelect options={filterOptions} value={filter} onChange={v => setFilter(String(v))} placeholder="정렬 기준 선택" />
      </Box>
      <SimpleGrid columns={2} gap={4} mt={2}>
        {sorted.map((cls: ClassType) => (
          <CommonCard key={cls.id} thumbnail={cls.thumbnail} title={cls.title} garlicCount={cls.garlic} rating={cls.rating} badgeText={cls.badge === '청년' ? '청년기부자' : cls.badge} onClick={() => {}} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ClassExploreClassListPage; 