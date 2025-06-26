import { CommonCard } from '@/components/Card';
import { GarlicIcon, StarRating } from '@/components/Icon';
import { Avatar, Badge, Box, Button, Flex, Heading, HStack, SimpleGrid, Text, VStack, Container } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { FiHeart, FiCheckCircle, FiShare, FiMoreVertical, FiPlus } from 'react-icons/fi';
import { IoArrowBack } from 'react-icons/io5';
import { CustomBadge } from '@/components/ui/Badge';

// 기부자 상세 페이지 - 기부자 정보, 수업 목록, 뱃지 등 표시

const GREEN = '#B9EEC6';
const ACCENT = '#22D060';
const DARK_GREEN = '#166534';

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
    talents: ['한식', '김치', '된장국'],
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
    talents: ['한식', '찌개'],
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

  // 뱃지 기준
  const isBadge =
    giver &&
    giver.likeCount >= 10 &&
    giver.classCount >= 10 &&
    giver.activeYear >= 1 &&
    giver.readiness === '상' &&
    giver.attendanceRate >= 90;

  // 해당 기부자가 만든 수업만 필터링
  const giverClasses = giver ? dummyClasses.filter(cls => cls.giverId === giver.id) : [];

  return (
    <Container bg="white" minH="100vh" maxW="480px" px={0} py={0}>
      {/* 상단 커스텀 헤더 제거 */}
      {!giver ? (
        <Box p={4} textAlign="center" color="gray.500">존재하지 않는 기부자입니다.</Box>
      ) : (
        <VStack gap={4} align="stretch" px={6} mt={6}>
          <Flex align="center" gap={4}>
            <Box w="72px" h="72px" borderRadius="full" overflow="hidden" bg={GREEN}>
              <img src={giver.thumbnail} alt="프로필" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
            <Box flex={1}>
              <Heading size="md" color={DARK_GREEN}>{giver.name}</Heading>
              <Text color={ACCENT} fontSize="sm">{giver.username}</Text>
              <Text color={DARK_GREEN} fontSize="sm">{giver.intro}</Text>
              {/* 뱃지 영역 */}
              <Flex gap={2} mt={2}>
                <CustomBadge type="youth" />
                {/* 어르신 기부자라면 <CustomBadge type="senior" /> 추가 */}
                {isBadge && <CustomBadge type="excellent" />}
              </Flex>
              {/* 별점/찜(마늘) 표시 */}
              <Flex align="center" gap={3} mt={2}>
                {typeof giver.rating === 'number' && (
                  <Box color="#FACC15">
                    <StarRating value={giver.rating} size="1.2em" />
                  </Box>
                )}
                {typeof giver.garlic === 'number' && (
                  <Text fontSize="md" color="gray.700">
                    🧄 {giver.garlic}
                  </Text>
                )}
              </Flex>
              {/* 등록 재능 키워드 */}
              {giver.talents && (
                <Flex gap={2} mt={2} flexWrap="wrap">
                  {giver.talents.map((talent: string) => (
                    <Box key={talent} bg="#E0F2FE" color="#0369A1" px={3} py={1} borderRadius="full" fontSize="xs" fontWeight="bold">{talent}</Box>
                  ))}
                </Flex>
              )}
            </Box>
          </Flex>
          {/* 재능/포인트 요약 (마이페이지와 유사하게) */}
          <Flex align="center" justify="space-between" textAlign="center" bg="white" borderRadius="2xl" px={4} py={3} border="1.5px solid #166534">
            <Box flex={1}>
              <Text fontWeight="bold" fontSize="xl" color={DARK_GREEN}>{giver.classCount}</Text>
              <Text fontSize="sm" color={DARK_GREEN}>수업</Text>
            </Box>
            <Box flex={1}>
              <Text fontWeight="bold" fontSize="xl" color={DARK_GREEN}>{giver.activeYear}</Text>
              <Text fontSize="sm" color={DARK_GREEN}>활동(년)</Text>
            </Box>
            <Box flex={1}>
              <Text fontWeight="bold" fontSize="xl" color={DARK_GREEN}>{giver.rating}</Text>
              <Text fontSize="sm" color={DARK_GREEN}>평점</Text>
            </Box>
          </Flex>
          {/* 찜하기 버튼 */}
          <Button
            bg={mainLiked ? ACCENT : GREEN}
            color={mainLiked ? 'white' : DARK_GREEN}
            _hover={{ bg: mainLiked ? '#1DB954' : GREEN }}
            borderRadius="2xl"
            fontWeight="bold"
            fontSize="md"
            w="100%"
            py={3}
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
            <Flex align="center" justify="center" gap={2}>
              <GarlicIcon style={{ color: mainLiked ? 'white' : DARK_GREEN, fontSize: '1.2em' }} />
              <Text fontWeight="bold">{mainLiked ? '찜 취소' : '찜하기'}</Text>
            </Flex>
          </Button>
          {/* 등록한 수업 */}
          <Box mt={4}>
            <Heading size="sm" mb={2} color={DARK_GREEN}>등록한 수업</Heading>
            {giverClasses.length === 0 ? (
              <Text color="gray.400">등록한 수업이 없습니다.</Text>
            ) : (
              <SimpleGrid columns={1} gap={4} w="100%">
                {giverClasses.map(cls => (
                  <Box key={cls.id}>
                    <CommonCard
                      thumbnail={cls.thumbnail}
                      title={cls.title}
                      garlicCount={cls.garlic}
                      rating={cls.rating}
                      badgeText={cls.badge === '청년' ? '청년기부자' : cls.badge}
                    />
                    {/* 수업 카드 하단 버튼 */}
                    <Flex gap={3} mt={2}>
                      <Button
                        flex={1}
                        bg="#B9EEC6"
                        color="green.900"
                        fontWeight="bold"
                        borderRadius="lg"
                        fontSize="md"
                        py={6}
                        leftIcon={<FiHeart size={20} />}
                        _hover={{ bg: '#86EFAC' }}
                      >
                        찜하기
                      </Button>
                      <Button
                        flex={1}
                        variant="outline"
                        borderColor="#B9EEC6"
                        color="green.900"
                        fontWeight="bold"
                        borderRadius="lg"
                        fontSize="md"
                        py={6}
                        leftIcon={<FiCheckCircle size={20} />}
                        bg="white"
                        _hover={{ bg: '#E0F2F1' }}
                      >
                        신청하기
                      </Button>
                    </Flex>
                  </Box>
                ))}
              </SimpleGrid>
            )}
          </Box>
        </VStack>
      )}
    </Container>
  );
};

export default GiverDetailPage; 