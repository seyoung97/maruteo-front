import { CommonCard } from '@/components/Card';
import { GarlicIcon, StarRating } from '@/components/Icon';
import { Avatar, Badge, Box, Button, Flex, Heading, HStack, SimpleGrid, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

// 기부자 상세 페이지 - 기부자 정보, 수업 목록, 뱃지 등 표시

// 더미 데이터 (뱃지 기준 필드 추가)
const dummyGivers = [
  {
    id: 1,
    name: '김민희',
    username: '@minii',
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
  { id: 1, title: '된장국 클래스', thumbnail: '/class1.jpg', garlic: 120, rating: 4.7, badge: '청년', type: 'youth', giverId: 1, liked: false },
  { id: 2, title: '김치찌개 클래스', thumbnail: '/class2.jpg', garlic: 98, rating: 4.5, badge: '청년', type: 'youth', giverId: 1, liked: false },
  { id: 3, title: '잡채 클래스', thumbnail: '/class3.jpg', garlic: 80, rating: 4.3, badge: '청년', type: 'youth', giverId: 2, liked: false },
];

// 수업 카드 내 찜하기 버튼
function ClassCardWithLike({ cls, initialLiked, initialGarlic }: { cls: any, initialLiked: boolean, initialGarlic: number }) {
  const [liked, setLiked] = useState(initialLiked);
  const [garlic, setGarlic] = useState(initialGarlic);
  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setGarlic(g => g + 1);
    } else {
      setLiked(false);
      setGarlic(g => Math.max(0, g - 1));
    }
  };
  return (
    <Box w="100%" display="flex" flexDirection="column" alignItems="stretch">
      <Box w="100%">
        <CommonCard
          thumbnail={cls.thumbnail}
          title={cls.title}
          garlicCount={garlic}
          rating={cls.rating}
          badgeText={cls.badge === '청년' ? '청년기부자' : cls.badge}
        />
      </Box>
      <Button
        mt={2}
        w="100%"
        bg={liked ? 'green.500' : 'gray.200'}
        color={liked ? 'white' : 'green.800'}
        _hover={{ bg: liked ? 'green.600' : 'gray.300' }}
        borderRadius="lg"
        fontWeight="bold"
        onClick={handleLike}
      >
        <HStack gap={1} justify="center">
          <GarlicIcon style={{ color: liked ? 'white' : '#6B8E23' }} />
          <Text>{liked ? '찜 취소' : '찜하기'}</Text>
        </HStack>
      </Button>
    </Box>
  );
}

const GiverDetailPage = () => {
  const { id } = useParams();
  const giver = dummyGivers.find(g => String(g.id) === id);
  const [mainLiked, setMainLiked] = useState<boolean>(false);
  const [mainGarlic, setMainGarlic] = useState<number>(giver ? giver.garlic : 0);
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
      <Box bg="green.50" borderRadius="2xl" p={0} mb={4} boxShadow="sm">
        <Flex align="center" gap={0} p={0}>
          <Box p={4} pr={0} display="flex" alignItems="center">
            <Avatar.Root size="2xl" style={{ boxShadow: '0 2px 8px #b2f5ea33' }}>
              <Avatar.Fallback name={giver.name} />
              <Avatar.Image src={giver.thumbnail} />
            </Avatar.Root>
          </Box>
          <Box flex={1} py={4} pl={2} pr={6} display="flex" flexDirection="column" gap={1}>
            <Heading size="md" color="green.800" mb={1}>{giver.name}</Heading>
            <Text color="green.700" fontWeight="bold" fontSize="lg">{giver.username}</Text>
            {isBadge && <Badge colorPalette="green" mt={1} fontWeight="bold" fontSize="md" px={3} py={1} borderRadius="md">우수 기부자</Badge>}
            <Text mt={2} color="gray.800" fontSize="md">{giver.intro}</Text>
          </Box>
        </Flex>
      </Box>
      <Box bg="green.50" borderRadius="lg" px={4} py={3} mb={6} boxShadow="xs" w="100%" fontFamily="'Noto Sans KR', '돋움', 'Nanum Gothic', Arial, sans-serif">
        <HStack gap={3} align="center" mb={2} w="100%" justify="space-between" flexWrap="wrap">
          <HStack gap={1} minW="60px">
            <GarlicIcon style={{ fontSize: '1.3em' }} />
            <Text fontWeight="bold" fontSize="lg">{mainGarlic}</Text>
          </HStack>
          <Box minW="90px" maxW="120px" flexShrink={0}>
            <StarRating value={giver.rating} size="1.3em" />
          </Box>
          <Box textAlign="center" minW="60px" maxW="80px" flexShrink={0}>
            <Text fontSize="xs" color="green.700">수업</Text>
            <Text fontWeight="extrabold" fontSize="xl" color="green.900" lineHeight={1.1}>{giver.classCount}</Text>
            <Text fontSize="xs" color="green.700">회</Text>
          </Box>
          <Box textAlign="center" minW="60px" maxW="80px" flexShrink={0}>
            <Text fontSize="xs" color="green.700">활동</Text>
            <Text fontWeight="extrabold" fontSize="xl" color="green.900" lineHeight={1.1}>{giver.activeYear}</Text>
            <Text fontSize="xs" color="green.700">년</Text>
          </Box>
        </HStack>
        <HStack gap={4} align="center" justify="center" flexWrap="wrap">
          <Text fontWeight="semibold" color="green.700" fontSize="md">준비도: <b>{giver.readiness}</b></Text>
          <Box h="20px" w="1px" bg="green.100" borderRadius="full" display={{ base: 'none', sm: 'inline-block' }} />
          <Text fontWeight="semibold" color="green.700" fontSize="md">이행률: <b>{giver.attendanceRate}%</b></Text>
        </HStack>
      </Box>
      <Button
        bg={mainLiked ? 'green.500' : 'gray.200'}
        color={mainLiked ? 'white' : 'green.800'}
        _hover={{ bg: mainLiked ? 'green.600' : 'gray.300' }}
        size="lg"
        mb={6}
        borderRadius="xl"
        px={10}
        py={6}
        fontWeight="extrabold"
        fontSize="xl"
        boxShadow="md"
        w="100%"
        onClick={() => {
          if (!mainLiked) {
            setMainLiked(true);
            setMainGarlic(g => g + 1);
          } else {
            setMainLiked(false);
            setMainGarlic(g => Math.max(0, g - 1));
          }
        }}
      >
        <HStack gap={2} justify="center">
          <GarlicIcon style={{ color: mainLiked ? 'white' : '#6B8E23', fontSize: '1.5em' }} />
          <Text color={mainLiked ? 'white' : 'green.800'} fontWeight="extrabold" fontSize="xl">{mainLiked ? '찜 취소' : '찜하기'}</Text>
        </HStack>
      </Button>
      <Heading size="sm" mb={2} color="green.800">등록한 수업</Heading>
      {giverClasses.length === 0 ? (
        <Text color="gray.400">등록한 수업이 없습니다.</Text>
      ) : (
        <SimpleGrid columns={1} gap={4} w="100%">
          {giverClasses.map(cls => (
            <ClassCardWithLike
              key={cls.id}
              cls={cls}
              initialLiked={!!cls.liked}
              initialGarlic={cls.garlic}
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default GiverDetailPage; 