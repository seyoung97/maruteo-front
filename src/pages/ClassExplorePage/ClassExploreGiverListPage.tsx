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
type Giver = {
  id: number;
  name: string;
  username: string;
  thumbnail: string;
  garlic: number;
  rating: number;
  badge: string;
  type: 'youth' | 'senior';
  category: string;
  liked: number;
  classCount?: number;
  activeYear?: number;
  readiness?: string;
  attendanceRate?: number;
  todayJoined?: boolean; // 오늘 가입 여부
};

const dummyGivers: Giver[] = [
  { id: 1, name: '김민희', username: '@chunja', thumbnail: '/img1.jpg', garlic: 430, rating: 4.8, badge: '청년', type: 'youth', category: '한식', liked: 12, classCount: 11, activeYear: 1.2, readiness: '상', attendanceRate: 92, todayJoined: false },
  { id: 2, name: '정세영', username: '@duckduck', thumbnail: '/img2.jpg', garlic: 320, rating: 4.5, badge: '청년', type: 'youth', category: '한식', liked: 8, classCount: 5, activeYear: 0.8, readiness: '중', attendanceRate: 85, todayJoined: true },
  { id: 3, name: '신혜림', username: '@minji123', thumbnail: '/img3.jpg', garlic: 150, rating: 4.2, badge: '청년', type: 'youth', category: '한식', liked: 15, classCount: 12, activeYear: 2, readiness: '상', attendanceRate: 95, todayJoined: false },
  { id: 4, name: '이준학', username: '@ji-chef', thumbnail: '/img4.jpg', garlic: 89, rating: 4.0, badge: '청년', type: 'youth', category: '한식', liked: 5, classCount: 8, activeYear: 0.5, readiness: '하', attendanceRate: 80, todayJoined: true },
  { id: 5, name: '이은지', username: '@dokja', thumbnail: '/img5.jpg', garlic: 70, rating: 3.9, badge: '어르신', type: 'senior', category: '중식', liked: 20, classCount: 15, activeYear: 1.5, readiness: '상', attendanceRate: 98, todayJoined: false },
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

const ClassExploreGiverListPage = () => {
  const { category } = useParams();
  const [filter, setFilter] = useState<string>('latest');
  const [search, setSearch] = useState('');

  // 카테고리, 유저타입별 필터링
  const filtered = dummyGivers.filter((g: Giver) => g.category === category && (userType === 'senior' ? g.type === 'youth' : g.type === 'senior'));
  // 검색
  const searched = filtered.filter((g: Giver) => g.name.includes(search) || g.username.includes(search));
  // 정렬
  const sortData = (data: Giver[], sortKey: string): Giver[] => {
    switch (sortKey) {
      case 'garlic': return [...data].sort((a, b) => b.garlic - a.garlic);
      case 'rating': return [...data].sort((a, b) => b.rating - a.rating);
      case 'popular': return [...data].sort((a, b) => b.liked - a.liked);
      default: return data;
    }
  };
  const sorted = sortData(searched, filter);

  // 상단 2+2+2
  const liked = sorted.filter(g => g.liked > 0).slice(0, 4);
  // 인기 기부자: 찜 수 10개 이상
  const popular = sorted.filter(g => g.liked >= 10).slice(0, 4);
  // 신규 기부자: 오늘 가입
  const isNew = sorted.filter(g => g.todayJoined).slice(0, 4);
  // 전체 기부자(중복 포함)
  // const rest = filtered.filter(g => !liked.includes(g) && !popular.includes(g) && !isNew.includes(g));
  // -> 아래처럼 filtered 전체를 사용

  return (
    <Box p={4}>
      <Heading size="md" mb={2}>{category} 재능기부자 전체</Heading>
      <Input placeholder="기부자 검색" mb={2} value={search} onChange={e => setSearch(e.target.value)} />
      <Text mt={4} mb={1} fontWeight="bold">내가 찜한 기부자</Text>
      <HorizontalScrollSection>
        {liked.map((giver: Giver) => {
          const isExcellentBadge =
            giver.liked > 0 &&
            (giver.classCount ?? 0) >= 10 &&
            (giver.activeYear ?? 0) >= 1 &&
            ['상', '중', '하'].includes(giver.readiness ?? '') &&
            (giver.attendanceRate ?? 0) >= 90;
          return (
            <Box bg="green.50" borderRadius="lg" p={1} minW="180px" maxW="220px">
              <CommonCard key={giver.id} thumbnail={giver.thumbnail} title={giver.name} subtitle={giver.username} garlicCount={giver.garlic} rating={giver.rating} badgeText={giver.badge} isExcellentBadge={isExcellentBadge} onClick={() => {}}>
              </CommonCard>
            </Box>
          );
        })}
      </HorizontalScrollSection>
      <Text mb={1} fontWeight="bold">인기 기부자</Text>
      <HorizontalScrollSection>
        {popular.map((giver: Giver) => {
          const isExcellentBadge =
            giver.liked >= 10 &&
            (giver.classCount ?? 0) >= 10 &&
            (giver.activeYear ?? 0) >= 1 &&
            ['상', '중', '하'].includes(giver.readiness ?? '') &&
            (giver.attendanceRate ?? 0) >= 90;
          return (
            <Box bg="green.50" borderRadius="lg" p={1} minW="180px" maxW="220px">
              <CommonCard key={giver.id} thumbnail={giver.thumbnail} title={giver.name} subtitle={giver.username} garlicCount={giver.garlic} rating={giver.rating} badgeText={giver.badge} isExcellentBadge={isExcellentBadge} onClick={() => {}}>
              </CommonCard>
            </Box>
          );
        })}
      </HorizontalScrollSection>
      <Text mb={1} fontWeight="bold">신규 기부자</Text>
      <HorizontalScrollSection>
        {isNew.map((giver: Giver) => {
          const isExcellentBadge =
            giver.todayJoined &&
            (giver.classCount ?? 0) >= 10 &&
            (giver.activeYear ?? 0) >= 1 &&
            ['상', '중', '하'].includes(giver.readiness ?? '') &&
            (giver.attendanceRate ?? 0) >= 90;
          return (
            <Box bg="green.50" borderRadius="lg" p={1} minW="180px" maxW="220px">
              <CommonCard key={giver.id} thumbnail={giver.thumbnail} title={giver.name} subtitle={giver.username} garlicCount={giver.garlic} rating={giver.rating} badgeText={giver.badge} isExcellentBadge={isExcellentBadge} onClick={() => {}}>
              </CommonCard>
            </Box>
          );
        })}
      </HorizontalScrollSection>
      <Text mt={4} mb={1} fontWeight="bold">전체 기부자</Text>
      <Box mb={2}>
        <CommonSelect options={filterOptions} value={filter} onChange={v => setFilter(String(v))} placeholder="정렬 기준 선택" />
      </Box>
      <SimpleGrid columns={2} gap={4}>
        {sorted.map((giver: Giver) => {
          const isExcellentBadge =
            giver.liked > 0 &&
            (giver.classCount ?? 0) >= 10 &&
            (giver.activeYear ?? 0) >= 1 &&
            ['상', '중', '하'].includes(giver.readiness ?? '') &&
            (giver.attendanceRate ?? 0) >= 90;
          return (
            <CommonCard key={giver.id} thumbnail={giver.thumbnail} title={giver.name} subtitle={giver.username} garlicCount={giver.garlic} rating={giver.rating} badgeText={giver.badge} isExcellentBadge={isExcellentBadge} onClick={() => {}}>
            </CommonCard>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default ClassExploreGiverListPage; 