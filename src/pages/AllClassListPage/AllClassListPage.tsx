import { useState } from 'react';
import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import CommonCard from '@/components/common/CommonCard';
import CommonSelect from '@/components/common/CommonSelect';
import { useNavigate, useParams } from 'react-router-dom';

// 더미 데이터 예시
const dummyGivers = [
  { id: 1, name: '김춘자', username: '@chunja', thumbnail: '/img1.jpg', garlic: 430, rating: 4.8, badge: '청년', type: 'youth' },
  { id: 2, name: '이덕배', username: '@duckduck', thumbnail: '/img2.jpg', garlic: 320, rating: 4.5, badge: '청년', type: 'youth' },
  { id: 3, name: '최민준', username: '@minji123', thumbnail: '/img3.jpg', garlic: 150, rating: 4.2, badge: '청년', type: 'youth' },
  { id: 4, name: '정지영', username: '@ji-chef', thumbnail: '/img4.jpg', garlic: 89, rating: 4.0, badge: '청년', type: 'youth' },
  { id: 5, name: '이옥자', username: '@dokja', thumbnail: '/img5.jpg', garlic: 70, rating: 3.9, badge: '어르신', type: 'senior' },
];
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

const AllClassListPage = () => {
  const [giverSort, setGiverSort] = useState('latest');
  const [classSort, setClassSort] = useState('latest');
  const navigate = useNavigate();
  const { category } = useParams();

  // 유저 타입에 따라 보여줄 데이터 필터링
  const filteredGivers = dummyGivers.filter(g => userType === 'senior' ? g.type === 'youth' : g.type === 'senior');
  const filteredClasses = dummyClasses.filter(c => userType === 'senior' ? c.type === 'youth' : c.type === 'senior');

  // 예시: 내가 찜한 기부자 id
  const myLikedGiverIds = [1, 2];
  const likedGivers = filteredGivers.filter(g => myLikedGiverIds.includes(g.id));
  const otherGivers = filteredGivers.filter(g => !myLikedGiverIds.includes(g.id));

  // 정렬 함수(간단 예시)
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
      <Heading size="md" mb={2}>{category} 재능탐색</Heading>
      {/* 내가 찜한 기부자 */}
      {likedGivers.length > 0 && (
        <>
          <Heading size="md" mb={2}>내가 찜한 기부자</Heading>
          <SimpleGrid columns={2} gap={4} mb={4}>
            {likedGivers.map(giver => (
              <CommonCard
                key={giver.id}
                thumbnail={giver.thumbnail}
                title={giver.name}
                subtitle={giver.username}
                garlicCount={giver.garlic}
                rating={giver.rating}
                badgeText={giver.badge}
                onClick={() => navigate(`/giver/${giver.id}`)}
              />
            ))}
          </SimpleGrid>
        </>
      )}

      {/* 전체 기부자 */}
      <Heading size="md" mb={2}>전체 기부자</Heading>
      <CommonSelect
        options={filterOptions}
        value={giverSort}
        onChange={v => setGiverSort(String(v))}
        placeholder="정렬 기준 선택"
      />
      <SimpleGrid columns={2} gap={4} mt={4} mb={8}>
        {sortData(otherGivers, giverSort).map(giver => (
          <CommonCard
            key={giver.id}
            thumbnail={giver.thumbnail}
            title={giver.name}
            subtitle={giver.username}
            garlicCount={giver.garlic}
            rating={giver.rating}
            badgeText={giver.badge}
            onClick={() => navigate(`/giver/${giver.id}`)}
          />
        ))}
      </SimpleGrid>

      {/* 수업 전체 목록 */}
      <Heading size="md" mb={4}>수업 전체 목록</Heading>
      <CommonSelect
        options={filterOptions}
        value={classSort}
        onChange={v => setClassSort(String(v))}
        placeholder="정렬 기준 선택"
      />
      <SimpleGrid columns={2} gap={4} mt={4}>
        {sortData(filteredClasses, classSort).map(cls => (
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

export default AllClassListPage;