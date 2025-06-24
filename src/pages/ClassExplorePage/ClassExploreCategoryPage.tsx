import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { Box, Heading, SimpleGrid, Button } from '@chakra-ui/react';
import CommonCard from '@/components/common/CommonCard';

// 예시 더미 데이터 (category 필드 추가)
const dummyGivers = [
  { id: 1, name: '김춘자', username: '@chunja', thumbnail: '/img1.jpg', garlic: 430, rating: 4.8, badge: '청년', type: 'youth', category: '한식' },
  { id: 2, name: '이덕배', username: '@duckduck', thumbnail: '/img2.jpg', garlic: 320, rating: 4.5, badge: '청년', type: 'youth', category: '한식' },
  { id: 3, name: '최민준', username: '@minji123', thumbnail: '/img3.jpg', garlic: 150, rating: 4.2, badge: '청년', type: 'youth', category: '한식' },
  { id: 4, name: '정지영', username: '@ji-chef', thumbnail: '/img4.jpg', garlic: 89, rating: 4.0, badge: '청년', type: 'youth', category: '한식' },
  { id: 5, name: '이옥자', username: '@dokja', thumbnail: '/img5.jpg', garlic: 70, rating: 3.9, badge: '어르신', type: 'senior', category: '중식' },
];
const dummyClasses = [
  { id: 1, title: '할머니표 마늘닭볶음 버벌', thumbnail: '/class1.jpg', garlic: 120, rating: 4.7, badge: '청년', type: 'youth', category: '한식' },
  { id: 2, title: '의성마늘불고기 배우기', thumbnail: '/class2.jpg', garlic: 98, rating: 4.5, badge: '청년', type: 'youth', category: '한식' },
  { id: 3, title: '된장국 클래스', thumbnail: '/class3.jpg', garlic: 80, rating: 4.3, badge: '청년', type: 'youth', category: '한식' },
  { id: 4, title: '김치찌개 클래스', thumbnail: '/class4.jpg', garlic: 60, rating: 4.1, badge: '청년', type: 'youth', category: '한식' },
  { id: 5, title: '중식 볶음밥 클래스', thumbnail: '/class5.jpg', garlic: 50, rating: 3.8, badge: '어르신', type: 'senior', category: '중식' },
];

// 카테고리별 기부자/수업 미리보기 페이지 - 4+4 카드, 더보기 버튼
const ClassExploreCategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  // 카테고리별 데이터 필터링
  const filteredGivers = dummyGivers.filter(g => g.category === category).slice(0, 4);
  const filteredClasses = dummyClasses.filter(c => c.category === category).slice(0, 4);

  return (
    <Box p={4}>
      <Heading size="md" mb={2}>{category} 재능탐색</Heading>
      <Box fontWeight="bold" fontSize="lg" mb={2}>{category} 재능기부자</Box>
      <SimpleGrid columns={2} gap={4} mb={4}>
        {filteredGivers.map(giver => (
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
      <Button w="full" mb={6} colorScheme="black" onClick={() => navigate(`/class-explore/${category}/givers`)}>재능기부자 더보기</Button>

      <Box fontWeight="bold" fontSize="lg" mb={2}>{category} 수업</Box>
      <SimpleGrid columns={2} gap={4} mb={4}>
        {filteredClasses.map(cls => (
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
      <Button w="full" colorScheme="black" onClick={() => navigate(`/class-explore/${category}/classes`)}>수업 더보기</Button>
    </Box>
  );
};

export default ClassExploreCategoryPage; 