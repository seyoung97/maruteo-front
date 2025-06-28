import { CommonCard } from '@/components/Card';
import { Box, Button, SimpleGrid } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

// 예시 더미 데이터 (category 필드 추가)
const dummyGivers = [
  { id: 1, name: '김민희', username: '@minii', thumbnail: '/img1.jpg', garlic: 430, rating: 4.8, badge: '청년', type: 'youth', category: '한식', liked: 12, classCount: 11, activeYear: 1.2, readiness: '상', attendanceRate: 92 },
  { id: 2, name: '정세영', username: '@duckduck', thumbnail: '/img2.jpg', garlic: 320, rating: 4.5, badge: '청년', type: 'youth', category: '한식', liked: 8, classCount: 5, activeYear: 0.8, readiness: '중', attendanceRate: 85 },
  { id: 3, name: '신혜림', username: '@minji123', thumbnail: '/img3.jpg', garlic: 150, rating: 4.2, badge: '청년', type: 'youth', category: '한식', liked: 15, classCount: 12, activeYear: 2, readiness: '상', attendanceRate: 95 },
  { id: 4, name: '이준학', username: '@ji-chef', thumbnail: '/img4.jpg', garlic: 160, rating: 5.0, badge: '청년', type: 'youth', category: '한식', liked: 5, classCount: 10, activeYear: 0.5, readiness: '하', attendanceRate: 80 },
  { id: 5, name: '이은지', username: '@dokja', thumbnail: '/img5.jpg', garlic: 70, rating: 3.9, badge: '어르신', type: 'senior', category: '중식', liked: 20, classCount: 15, activeYear: 1.5, readiness: '상', attendanceRate: 98 },
];
const dummyClasses = [
  { id: 1, title: '마늘닭볶음', thumbnail: '/class1.jpg', garlic: 120, rating: 4.7, badge: '청년', type: 'youth', category: '한식' },
  { id: 2, title: '의성마늘불고기 배우기', thumbnail: '/class2.jpg', garlic: 98, rating: 4.5, badge: '청년', type: 'youth', category: '한식' },
  { id: 3, title: '갈릭파스타 클래스', thumbnail: '/class3.jpg', garlic: 80, rating: 4.3, badge: '청년', type: 'youth', category: '한식' },
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
      {/* <Heading size="md" mb={2}>{category} 재능탐색</Heading> */}
      <Box fontWeight="bold" fontSize="lg" mb={2}>{category} 재능기부자</Box>
      <SimpleGrid columns={2} gap={4} mb={4}>
        {filteredGivers.map(giver => {
          const isExcellentBadge =
            giver.liked >= 10 &&
            giver.classCount >= 10 &&
            giver.activeYear >= 1 &&
            ['상', '중', '하'].includes(giver.readiness) &&
            giver.attendanceRate >= 90;
          return (
            <CommonCard
              key={giver.id}
              thumbnail={giver.thumbnail}
              title={giver.name}
              subtitle={giver.username}
              garlicCount={giver.garlic}
              rating={giver.rating}
              badgeText={giver.badge}
              type={giver.type}
              isExcellentBadge={isExcellentBadge}
              onClick={() => navigate(`/giver/${giver.id}`)}
            />
          );
        })}
      </SimpleGrid>
      <Button w="full" mb={6} colorPalette="green" onClick={() => navigate(`/class-explore/${category}/givers`)}>재능기부자 더보기</Button>

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
            type={cls.type}
            onClick={() => navigate(`/class/${cls.id}`)}
          />
        ))}
      </SimpleGrid>
      <Button w="full" colorPalette="green" onClick={() => navigate(`/class-explore/${category}/classes`)}>수업 더보기</Button>
    </Box>
  );
};

export default ClassExploreCategoryPage; 