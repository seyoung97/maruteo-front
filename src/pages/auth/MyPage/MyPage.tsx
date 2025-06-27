import { Box, Button, Container, Text, VStack, Flex, HStack, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FiShare2, FiArrowLeft } from 'react-icons/fi';
import { CustomBadge } from '@/components/ui/Badge';
import { StarRating } from '@/components/Icon';
import { getMyLessons } from '@/services/classGiverExploreServices';

// mock 데이터
const mockProfile = {
  profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
  name: '정세영',
  userId: 'dianne_r',
  introduction: '안녕하세요',
  talents: ['요리', '기타'],
  wantTalents: ['영어', '프로그래밍'],
  point: 250,
  badge: '청년기부자',
  type: 'youth',
  isExcellentBadge: true,
};

export function MyPage() {
  const navigate = useNavigate();
  const [profile] = useState<any>(mockProfile);
  const [tabIdx, setTabIdx] = useState(0);
  const [myLessons, setMyLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyLessons().then((data) => {
      setMyLessons(data);
      setLoading(false);
    });
  }, []);

  return (
    <Container bg="#FAFAF9" minH="100vh" maxW="480px" px="0" py="0">
      <Box bg="white" borderRadius="2xl" mx="auto" mt={4} p={0} maxW="100%">
        <VStack gap={4} align="stretch" px={6} py={6}>
          {/* 상단 헤더: 뒤로가기 */}
          <Flex align="center" mb={2}>
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)} p={1} minW="32px">
              <FiArrowLeft size={20} />
            </Button>
            <Box flex={1} textAlign="center" fontWeight="bold" fontSize="lg">마이 페이지</Box>
            <Box minW="32px" />
          </Flex>
          {/* 상단 프로필 */}
          <Flex align="center" gap={6} mb={2}>
            {/* 프로필 이미지 */}
            <Box w="80px" h="80px" borderRadius="full" overflow="hidden" boxShadow="md" border="3px solid #B9EEC6">
              <img src={profile.profileImage} alt="프로필" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
            {/* 프로필 정보 */}
            <Box flex={1} minW={0}>
              {/* 이름 + 뱃지 */}
              <HStack align="center" gap={2} mb={1}>
                <Text fontWeight="bold" fontSize="xl" color="green.900">{profile.name}</Text>
                {profile.type === 'youth' && <CustomBadge type="youth" />}
                {profile.type === 'senior' && <CustomBadge type="senior" />}
                {profile.isExcellentBadge && <CustomBadge type="excellent" />}
              </HStack>
              {/* 아이디 */}
              <Text color="green.700" fontSize="sm" fontWeight="semibold" mb={1}>@{profile.userId}</Text>
              {/* 한 줄 소개 */}
              <Text color="gray.700" fontSize="sm" mb={2}>{profile.introduction}</Text>
              {/* 별점/찜(마늘) 표시 */}
              <Flex align="center" gap={3} mt={3} mb={3}>
                {typeof profile.rating === 'number' && profile.rating > 0 ? (
                  <Box color="#FACC15">
                    <StarRating value={profile.rating} size="1em" />
                  </Box>
                ) : (
                  <Text fontSize="sm" color="gray.400">별점 없음</Text>
                )}
                {typeof profile.garlic === 'number' && profile.garlic > 0 ? (
                  <Text fontSize="sm" color="gray.700">🧄 {profile.garlic}</Text>
                ) : (
                  <Text fontSize="sm" color="gray.400">찜 없음</Text>
                )}
              </Flex>
              {/* 키워드 */}
              <Flex gap={2} flexWrap="wrap">
                {profile.talents.map((talent: string) => (
                  <Box key={talent} bg="#E0F2FE" color="#0369A1" px={3} py={1} borderRadius="full" fontSize="xs" fontWeight="bold">{talent}</Box>
                ))}
              </Flex>
            </Box>
          </Flex>
          {/* 프로필 수정/공유 버튼 */}
          <Flex gap={2}>
            <Button
              flex={1}
              bg="#B9EEC6"
              color="green.900"
              borderRadius="md"
              fontWeight="bold"
              size="sm"
              _hover={{ bg: "#86EFAC" }}
              onClick={() => navigate('/profile')}
            >
              프로필 수정
            </Button>
            <Button
              flex={1}
              bg="#B9EEC6"
              color="green.900"
              borderRadius="md"
              fontWeight="bold"
              size="sm"
              _hover={{ bg: "#86EFAC" }}
            >
              <FiShare2 style={{marginRight: 4}}/>프로필 공유
            </Button>
          </Flex>
          {/* 재능/포인트 요약 */}
          <Flex border="1.5px solid #166534" borderRadius="lg" py={3} px={2} justify="space-between" align="center" bg="white">
            <VStack flex={1}>
              <Text fontWeight="bold" color="green.800" fontSize="lg">{profile.talents.length}</Text>
              <Text color="gray.600" fontSize="xs">등록 재능</Text>
            </VStack>
            <VStack flex={1}>
              <Text fontWeight="bold" color="green.800" fontSize="lg">{profile.wantTalents.length}</Text>
              <Text color="gray.600" fontSize="xs">배우고 싶은 재능</Text>
            </VStack>
            <VStack flex={1}>
              <Text fontWeight="bold" color="green.800" fontSize="lg">{profile.point}</Text>
              <Text color="gray.600" fontSize="xs">포인트</Text>
            </VStack>
          </Flex>
          {/* 탭: 내 수업/수강 내역 (간단한 버튼 토글로 대체) */}
          <Flex gap={2} mt={2}>
            <Button
              flex={1}
              bg={tabIdx === 0 ? "#B9EEC6" : "#F0FDF4"}
              color="green.900"
              borderRadius="md"
              fontWeight="bold"
              onClick={() => setTabIdx(0)}
              size="md"
              _hover={{ bg: "#86EFAC" }}
            >
              내 수업
            </Button>
            <Button
              flex={1}
              bg={tabIdx === 1 ? "#B9EEC6" : "#F0FDF4"}
              color="green.900"
              borderRadius="md"
              fontWeight="bold"
              onClick={() => setTabIdx(1)}
              size="md"
              _hover={{ bg: "#86EFAC" }}
            >
              수강 내역
            </Button>
          </Flex>
          <Box>
            {tabIdx === 0 ? (
              loading ? (
                <Text color="gray.400" textAlign="center" py={8}>로딩 중...</Text>
              ) : myLessons.length === 0 ? (
                <Text color="gray.400" textAlign="center" py={8}>등록된 수업이 없습니다.</Text>
              ) : (
                <VStack gap={4}>
                  {myLessons.map((lesson) => (
                    <Box key={lesson.id} borderRadius="lg" boxShadow="md" p={4} w="100%" bg="#F0FDF4">
                      <Flex align="center" gap={4}>
                        {lesson.media_url && (
                          <Image src={lesson.media_url} alt={lesson.title} boxSize="80px" borderRadius="md" objectFit="cover" />
                        )}
                        <Box flex={1}>
                          <Text fontWeight="bold" fontSize="lg" color="green.900">{lesson.title}</Text>
                          <Box color="gray.700" fontSize="sm" style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}>{lesson.description}</Box>
                          <Text color="gray.500" fontSize="xs">{lesson.location}</Text>
                        </Box>
                      </Flex>
                    </Box>
                  ))}
                </VStack>
              )
            ) : (
              <Text color="gray.400" textAlign="center" py={8}>수강 내역이 없습니다.</Text>
            )}
          </Box>
          {/* 수업 추가 버튼 */}
          <Button w="100%" h="44px" bg="#22D060" color="white" borderRadius="2xl" fontWeight="bold" fontSize="md" mt={2} _hover={{ bg: '#16A34A' }} onClick={() => navigate('/class-register')}>
            + 수업 추가
          </Button>
        </VStack>
      </Box>
    </Container>
  );
}
