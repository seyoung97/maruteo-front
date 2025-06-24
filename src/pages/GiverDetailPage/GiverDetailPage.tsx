import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Badge, Flex, HStack, SimpleGrid, Button } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/react';
import GarlicIcon from '@/components/common/GarlicIcon';
import StarRating from '@/components/common/StarRating';
import CommonCard from '@/components/common/CommonCard';

// 기부자 상세 페이지 - 기부자 정보, 수업 목록, 뱃지 등 표시

// 더미 데이터 (뱃지 기준 필드 추가)
const dummyGivers = [
  {
    id: 1,
    name: '김춘자',
    username: '@chunja',
    thumbnail: '/img1.jpg',
    garlic: 12,
    rating: 4.8,
    likeCount: 12,
    classCount: 11,
    activeYear: 1.2,
    readiness: '상',
    attendanceRate: 92,
    intro: '정성껏 한식 재능을 나눕니다!',
    type: 'youth',
  },
  {
    id: 2,
    name: '이덕배',
    username: '@duckduck',
    thumbnail: '/img2.jpg',
    garlic: 8,
    rating: 4.5,
    likeCount: 8,
    classCount: 5,
    activeYear: 0.8,
    readiness: '중',
    attendanceRate: 85,
    intro: '맛있는 집밥을 함께!',
    type: 'youth',
  },
];

const dummyClasses = [
  { id: 1, title: '된장국 클래스', thumbnail: '/class1.jpg', garlic: 120, rating: 4.7, badge: '청년', type: 'youth', giverId: 1 },
  { id: 2, title: '김치찌개 클래스', thumbnail: '/class2.jpg', garlic: 98, rating: 4.5, badge: '청년', type: 'youth', giverId: 1 },
  { id: 3, title: '잡채 클래스', thumbnail: '/class3.jpg', garlic: 80, rating: 4.3, badge: '청년', type: 'youth', giverId: 2 },
];

const GiverDetailPage = () => {
  const { id } = useParams();
  const giver = dummyGivers.find(g => String(g.id) === id);
  if (!giver) return <Box p={4}>존재하지 않는 기부자입니다.</Box>;

  // 뱃지 기준
  const isBadge =
    giver.likeCount >= 10 &&
    giver.classCount >= 10 &&
    giver.activeYear >= 1 &&
    giver.readiness === '상' &&
    giver.attendanceRate >= 90;

  // 해당 기부자가 만든 수업만 필터링
  const giverClasses = dummyClasses.filter(cls => cls.giverId === giver.id);

  return (
    <Box p={4}>
      <Flex align="center" gap={4} mb={4}>
        <Avatar.Root size="xl">
          <Avatar.Fallback name={giver.name} />
          <Avatar.Image src={giver.thumbnail} />
        </Avatar.Root>
        <Box>
          <Heading size="md">{giver.name}</Heading>
          <Text color="gray.500">{giver.username}</Text>
          {isBadge && <Badge colorPalette="green" mt={1}>우수 기부자</Badge>}
        </Box>
      </Flex>
      <Text mb={2}>{giver.intro}</Text>
      <HStack gap={4} mb={2}>
        <HStack>
          <GarlicIcon style={{ fontSize: '1.5em' }} />
          <Text>{giver.garlic}</Text>
        </HStack>
        <StarRating value={giver.rating} size="1.2em" />
        <Text>수업 {giver.classCount}회</Text>
        <Text>활동 {giver.activeYear}년</Text>
      </HStack>
      <HStack gap={4} mb={4}>
        <Text>준비도: {giver.readiness}</Text>
        <Text>이행률: {giver.attendanceRate}%</Text>
      </HStack>
      {/* 찜하기 버튼(더미) */}
      <Button colorPalette="yellow" variant="outline" size="sm" mb={6}>
        <HStack gap={1}>
          <GarlicIcon />
          <Text>찜하기</Text>
        </HStack>
      </Button>
      <Heading size="sm" mb={2}>등록한 수업</Heading>
      {giverClasses.length === 0 ? (
        <Text color="gray.400">등록한 수업이 없습니다.</Text>
      ) : (
        <SimpleGrid columns={1} gap={4}>
          {giverClasses.map(cls => (
            <CommonCard
              key={cls.id}
              thumbnail={cls.thumbnail}
              title={cls.title}
              garlicCount={cls.garlic}
              rating={cls.rating}
              badgeText={cls.badge}
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default GiverDetailPage; 