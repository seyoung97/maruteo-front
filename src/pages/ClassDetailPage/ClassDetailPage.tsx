import { StarRating } from '@/components/Icon';
import { CustomBadge } from '@/components/ui/Badge';
import { Box, Button, Flex, Heading, HStack, Image, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

// 더미 데이터: 수업, 기부자(뱃지 조건 포함)
const dummyClasses = [
  {
    id: 1,
    title: '의성 소고기국밥 배우기',
    thumbnail: '/class1.jpg',
    images: ['/class1.jpg', '/class1-2.jpg'],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    garlic: 4,
    rating: 4.8,
    giverId: 1,
    intro: '경북 의성은 전국에서도 손꼽히는 소고기 산지이자 마늘의 고장으로 잘 알려져 있습니다. 이 수업에서는 의성의 대표 한 끼 음식인 의성소고기국밥을 직접 만들어 봅니다. 부드럽게 익힌 소고기와 깊은 맛의 국물, 정성껏 지은 쌀밥이 어우러져 남녀노소 모두에게 사랑받는 든든한 밥상입니다. 지역 어르신의 손맛을 그대로 담아낸 전통 레시피로 의성의 정겨운 밥상을 경험해보세요.',
    duration: '2시간',
    materials: [
      '다음은 밀가루 1컵',
      '삶은 소고기',
      '베이킹파우더 1작은술',
      '소금/간장/후추 약간',
      '의성 한우 다짐육 150g',
      '대파 1뿌리',
      '의성 마늘 다진 것 2알'
    ]
  }
];
const dummyGivers = [
  {
    id: 1,
    name: '김민희',
    username: '@minii',
    thumbnail: '/img1.jpg',
    badge: '우수 기부자',
    intro: '한식 재능 기부자',
    likeCount: 12,
    classCount: 11,
    activeYear: 1.2,
    readiness: '상',
    attendanceRate: 92,
    type: 'youth',
    isExcellentBadge: true,
  }
];

// 수업 상세 페이지 - 영상, 소개, 신청, 강사 정보 등 표시
const ClassDetailPage = () => {
  const { id } = useParams();
  const [liked, setLiked] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const cls = dummyClasses.find(c => String(c.id) === id);
  if (!cls) return <Box p={4}>존재하지 않는 수업입니다.</Box>;

  const giver = dummyGivers.find(g => g.id === cls.giverId);
  //const isBadge = giver && giver.likeCount >= 10 && giver.classCount >= 10 && giver.activeYear >= 1 && giver.readiness === '상' && giver.attendanceRate >= 90;

  return (
    <Box p={4}>
      {/* 이미지/영상 영역 */}
      <Box position="relative" mb={3}>
        {/* 여러 장 이미지 지원 */}
        <Image src={cls.images?.[0] || cls.thumbnail} w="100%" h="200px" objectFit="cover" borderRadius="lg" />
        {cls.videoUrl && !showVideo && (
          <Button
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            size="lg"
            colorPalette="green"
            borderRadius="full"
            onClick={() => setShowVideo(true)}
            zIndex={2}
            opacity={0.9}
          >
            <Box width={6} height={6} color="white">
              <FaPlay size="100%" />
            </Box>
          </Button>
        )}
        {showVideo && cls.videoUrl && (
          <iframe
            src={cls.videoUrl}
            style={{
              width: '100%',
              height: '220px',
              borderRadius: '8px',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 3,
              background: 'black'
            }}
            allowFullScreen
          />
        )}
      </Box>
      {/* 영상 밑 초록색 박스 */}
      <Box bg="#16A34A" color="white" borderRadius="lg" py={3} px={4} mb={4} display="flex" alignItems="center" justifyContent="space-between">
        <Text fontWeight="bold" fontSize="lg" truncate>{cls.title}</Text>
        <Flex align="center" gap={3}>
          <Box color="white">
            <StarRating value={cls.rating} size="1.2em" />
          </Box>
          <Text fontSize="md" color="white">🧄 {cls.garlic}</Text>
        </Flex>
      </Box>
      {giver && (
        <Box bg="white" borderRadius="xl" p={3} mb={4} boxShadow="sm" display="flex" alignItems="center" gap={3}>
          <Image src={giver.thumbnail} w="48px" h="48px" borderRadius="full" boxShadow="xs" />
          <Box flex={1} minW={0}>
            <HStack align="center" gap={2}>
              <Text fontWeight="bold" fontSize="md" color="green.900">{giver.name}</Text>
              {giver.type === 'youth' && <CustomBadge type="youth" />}
              {giver.type === 'senior' && <CustomBadge type="senior" />}
              {giver.isExcellentBadge && <CustomBadge type="excellent" />}
            </HStack>
            <Text fontSize="sm" color="green.700" fontWeight="bold">{giver.username}</Text>
            <Text fontSize="sm" color="gray.700">{giver.intro}</Text>
          </Box>
        </Box>
      )}
      <Flex w="full" gap={3} mb={4}>
        <Button flex={1} colorPalette="green" size="lg">수업 신청하기</Button>
        <Button
          flexShrink={0}
          size="lg"
          px={4}
          py={2}
          borderRadius="md"
          fontWeight="semibold"
          fontSize="md"
          bg={liked ? '#059669' : 'white'}
          color={liked ? 'white' : '#16A34A'}
          _hover={{ bg: liked ? '#047857' : '#F3F4F6' }}
          boxShadow="md"
          onClick={() => setLiked(l => !l)}
        >
          <Flex align="center" gap={1}>
            <span style={{fontSize:'1.1em'}}>🧄</span>
            <Text fontWeight="semibold">{liked ? '찜취소' : '찜하기'}</Text>
          </Flex>
        </Button>
      </Flex>
      <Box mb={2}>
        <Heading size="sm" mb={1}>수업 소개 <Text as="span" fontSize="sm" color="gray.500">{cls.duration}</Text></Heading>
        <Text fontSize="sm" mb={2}>{cls.intro}</Text>
      </Box>
      <Box>
        <Heading size="sm" mb={1}>재료</Heading>
        <ul style={{ paddingLeft: 20 }}>
          {cls.materials.map((item, i) => <li key={i}><Text fontSize="sm">{item}</Text></li>)}
        </ul>
      </Box>
    </Box>
  );
};

export default ClassDetailPage; 