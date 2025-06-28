import { userAtom } from '@/atoms/authAtoms';
import { CommonCard } from '@/components/Card';
import { useClassExploreQuery } from '@/hooks/classGiverExplore';
import { Box, Button, SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useNavigate, useParams } from 'react-router-dom';


// 예시 더미 데이터 (category 필드 추가)
const dummyGivers = [
  { id: 1, name: '김민희', username: '@minii', thumbnail: '/img1.jpg', garlic: 430, rating: 4.8, badge: '청년', type: 'youth', category: '한식', liked: 12, classCount: 11, activeYear: 1.2, readiness: '상', attendanceRate: 92 },
  { id: 2, name: '정세영', username: '@duckduck', thumbnail: '/img2.jpg', garlic: 320, rating: 4.5, badge: '청년', type: 'youth', category: '한식', liked: 8, classCount: 5, activeYear: 0.8, readiness: '중', attendanceRate: 85 },
  { id: 3, name: '신혜림', username: '@minji123', thumbnail: '/img3.jpg', garlic: 150, rating: 4.2, badge: '청년', type: 'youth', category: '한식', liked: 15, classCount: 12, activeYear: 2, readiness: '상', attendanceRate: 95 },
  { id: 4, name: '이준학', username: '@ji-chef', thumbnail: '/img4.jpg', garlic: 160, rating: 5.0, badge: '청년', type: 'youth', category: '한식', liked: 5, classCount: 10, activeYear: 0.5, readiness: '하', attendanceRate: 80 },
  { id: 5, name: '이은지', username: '@dokja', thumbnail: '/img5.jpg', garlic: 70, rating: 3.9, badge: '어르신', type: 'senior', category: '중식', liked: 20, classCount: 15, activeYear: 1.5, readiness: '상', attendanceRate: 98 },
];

// 카테고리별 기부자/수업 미리보기 페이지 - 4+4 카드, 더보기 버튼
const ClassExploreCategoryPage = () => {
  const { category } = useParams();
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();
  
  // 사용자 타입에 따라 instructor_role 결정
  const instructorRole = user?.userType === 'young' ? 'young' : 'elder';
  
  // 카테고리별 수업 데이터 가져오기
  //const { data: categoryClassData, isLoading, error } = useCategoryClassListQuery(category || '');
  const { data, isLoading, error } = useClassExploreQuery({
    category: category || "",
    instructor_role: instructorRole, // Jotai에서 가져온 사용자 타입 사용
    sort: "latest",
    page: 1,
    limit: 4
  });

  // 카테고리별 기부자 데이터 필터링 (기존 더미 데이터 사용)
  const filteredGivers = dummyGivers.filter(g => g.category === category).slice(0, 4);
  
  // API에서 가져온 수업 데이터 사용 (최대 4개)
 // const filteredClasses = data?.data?.lessons?.slice(0, 4) || [];

  if (isLoading) {
    return (
      <Box p={4} display="flex" justifyContent="center" alignItems="center" minH="200px">
        <Spinner size="lg" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4} textAlign="center" color="red.500">
        수업 데이터를 불러올 수 없습니다.
      </Box>
    );
  }

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
        {data?.data?.length && data?.data?.length > 0 ? (
          data?.data.map((cls) => (
            <CommonCard
              key={cls.id}
              thumbnail={cls.thumbnail}
              title={cls.title}
              subtitle={cls.description}
              garlicCount={cls.garlic_count}
              rating={cls.rating}
              onClick={() => navigate(`/class/${cls.id}`)}
            />
          ))
        ) : (
          <Text color="gray.500" textAlign="center" gridColumn="span 2" py={8}>
            해당 카테고리의 수업이 없습니다.
          </Text>
        )}
      </SimpleGrid>
      <Button w="full" colorPalette="green" onClick={() => navigate(`/class-explore/${category}/classes`)}>수업 더보기</Button>
    </Box>
  );
};

export default ClassExploreCategoryPage; 