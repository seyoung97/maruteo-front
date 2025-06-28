import { useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Box, Button, Flex, Text, Image as CImage } from '@chakra-ui/react';
import StarRating from '@/components/Icon/StarRating';
import GarlicIcon from '@/components/Icon/GarlicIcon';
import { FaPlay } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getLatLngFromAddress } from '@/services/googleMapService';
import { useNavigate } from 'react-router-dom';

const mockClass: {
  id: number;
  title: string;
  thumbnail: string;
  images: string[];
  videoUrl: string;
  garlic: number;
  rating: number;
  location: string;
  lat: number;
  lng: number;
  unavailableDays: number[];
  unavailableTimes: string[];
  reservedDates: string[];
  reservedTimes: Record<string, string[]>;
  teacher: {
    name: string;
    userId: string;
    profileImage?: string;
    rating: number;
  };
} = {
  id: 1,
  title: '의성 소고기국밥 배우기',
  thumbnail: '/class1.jpg',
  images: ['/class1.jpg', '/class1-2.jpg'],
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  garlic: 4,
  rating: 4.8,
  location: '경북 의성군 홍준로 88 의성문화체육회관',
  lat: 37.5665, // 서울시청 임의 좌표
  lng: 126.9780,
  unavailableDays: [0, 6], // 일, 토요일 불가
  unavailableTimes: ['10:00', '14:00'],
  reservedDates: ['2025-06-27'],
  reservedTimes: { '2025-06-27': ['10:00'] },
  teacher: {
    name: '김춘자',
    userId: '@Chunja',
    profileImage: 'https://randomuser.me/api/portraits/women/65.jpg',
    rating: 4.8,
  },
};

const weekKor = ['일', '월', '화', '수', '목', '금', '토'];

const ClassApplyPage = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState('');
  const [count, setCount] = useState(1);
  const [showVideo, setShowVideo] = useState(false);
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [isConfirm, setIsConfirm] = useState(false);
  const navigate = useNavigate();

  // 주소 → 좌표 변환
  useEffect(() => {
    getLatLngFromAddress(mockClass.location).then((coords) => {
      if (coords) setCenter(coords);
    });
  }, []);

  // 날짜 YYYY-MM-DD 문자열로 변환
  const dateStr = date ? date.toISOString().slice(0, 10) : '';
  // 선택한 날짜의 예약된 시간대
  const reservedTimesForDate = dateStr ? mockClass.reservedTimes[dateStr] || [] : [];

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  // 버튼에 표시할 텍스트
  let buttonText = '신청하기';
  if (date && time) {
    buttonText = `신청하기 (${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${weekKor[date.getDay()]}) ${time})`;
  } else if (date) {
    buttonText = `신청하기 (${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${weekKor[date.getDay()]}) )`;
  }

  // 신청 정보 확인 화면
  if (isConfirm) {
    return (
      <div style={{ maxWidth: 400, margin: '0 auto', background: '#fff', borderRadius: 16, padding: 16 }}>
        <Text fontWeight="bold" color="green.600" fontSize="lg" mb={4}>수업 신청 확인</Text>
        <Box mb={3}>
          <Text fontWeight="bold" color="green.600" mb={1}>수업 날짜</Text>
          <Text border="1px solid #B6E2B6" borderRadius={12} p={2} mb={2}>
            {date && time
              ? `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${weekKor[date.getDay()]}요일 ${time}`
              : ''}
          </Text>
        </Box>
        <Box mb={3}>
          <Text fontWeight="bold" color="green.600" mb={1}>수업 장소</Text>
          <Text border="1px solid #B6E2B6" borderRadius={12} p={2} mb={2}>{mockClass.location}</Text>
        </Box>
        <Box mb={3}>
          <Text fontWeight="bold" color="green.600" mb={1}>수업 이름</Text>
          <Text border="1px solid #B6E2B6" borderRadius={12} p={2} mb={2}>{mockClass.title}</Text>
        </Box>
        <Box mb={3}>
          <Text fontWeight="bold" color="green.600" mb={1}>재능 기부자(강사) 프로필</Text>
          <Box display="flex" alignItems="center" gap={3} border="1px solid #B6E2B6" borderRadius={12} p={2} mb={2}>
            {mockClass.teacher.profileImage && (
              <img src={mockClass.teacher.profileImage} alt={mockClass.teacher.name} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #B6E2B6' }} />
            )}
            <Box>
              <Text fontWeight="bold">
                {mockClass.teacher.name} <Text as="span" color="gray.600">{mockClass.teacher.userId}</Text>
                <Text as="span" ml={2} fontWeight="bold" color="#FACC15" fontSize="md">⭐️ {mockClass.teacher.rating}</Text>
              </Text>
            </Box>
          </Box>
        </Box>
        <Box mb={3}>
          <Text fontWeight="bold" color="green.600" mb={1}>인원수</Text>
          <Text border="1px solid #B6E2B6" borderRadius={12} p={2} mb={2}>{count}명</Text>
        </Box>
        <Button
          w="100%"
          bg="#166534"
          color="#fff"
          py={3}
          borderRadius={8}
          fontWeight="bold"
          fontSize={16}
          _hover={{ bg: '#14532d' }}
          onClick={() => navigate('/')}
        >
          확인
        </Button>
      </div>
    );
  }

  // 기존 신청 폼 화면
  return (
    <div style={{ maxWidth: 400, margin: '0 auto', background: '#fff', borderRadius: 16, padding: 16 }}>
      {/* 상세페이지와 동일한 상단 미디어+제목+별점+마늘 */}
      <Box position="relative" mb={3}>
        {/* 이미지/영상 */}
        <CImage src={mockClass.images?.[0] || mockClass.thumbnail} w="100%" h="200px" objectFit="cover" borderRadius="lg" />
        {mockClass.videoUrl && !showVideo && (
          <Button
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            size="lg"
            bg="#16A34A"
            color="white"
            borderRadius="full"
            onClick={() => setShowVideo(true)}
            zIndex={2}
            opacity={0.9}
            _hover={{ bg: '#059669' }}
          >
            <Box width={6} height={6} color="white">
              <FaPlay size="100%" />
            </Box>
          </Button>
        )}
        {showVideo && mockClass.videoUrl && (
          <iframe
            src={mockClass.videoUrl}
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
      <Text fontWeight="bold" fontSize="lg" style={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        display: 'block',
        maxWidth: '200px',
      }}>{mockClass.title}</Text>
      <Flex align="center" gap={3} mb={4}>
        <Box color="white">
          <StarRating value={mockClass.rating} size="1.2em" />
        </Box>
        <Text fontSize="md" color="black"><GarlicIcon style={{ fontSize: 20, marginRight: 2 }} /> {mockClass.garlic}</Text>
      </Flex>
      {/* 달력/시간/장소/지도/인원수/신청 버튼 등 기존 내용 그대로 */}
      <Box mb={4}>
        <Text fontWeight="bold" color="#16A34A" fontSize="md" mb={1}>수업 날짜</Text>
        <Calendar
          value={date}
          onChange={(value) => setDate(value as Date)}
          calendarType="gregory"
          tileDisabled={({ date }) =>
            mockClass.unavailableDays.includes(date.getDay()) ||
            mockClass.reservedDates.includes(date.toISOString().slice(0, 10))
          }
        />
        <Text color="#333" fontWeight={500} mt={2} fontSize="sm">
          {date && `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${weekKor[date.getDay()]})`}
        </Text>
      </Box>
      <Box mb={4}>
        <Text fontWeight="bold" color="#16A34A" fontSize="md" mb={1}>수업 시간</Text>
        <select value={time} onChange={e => setTime(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ddd' }}>
          <option value="">시간 선택</option>
          {['10:00', '14:00', '16:00'].map(t => (
            <option
              key={t}
              value={t}
              disabled={
                mockClass.unavailableTimes.includes(t) ||
                reservedTimesForDate.includes(t)
              }
            >
              {t}
            </option>
          ))}
        </select>
      </Box>
      <Box mb={4}>
        <Text fontWeight="bold" color="#16A34A" fontSize="md" mb={1}>수업 장소</Text>
        <Text fontSize="sm" mb={2}>{mockClass.location}</Text>
        {/* 구글 지도 연동 */}
        {isLoaded && center && (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '200px', borderRadius: 12 }}
            center={center}
            zoom={16}
          >
            <Marker position={center} />
          </GoogleMap>
        )}
        {isLoaded && !center && (
          <Text color="red" my={4}>
            지도 좌표를 불러올 수 없습니다. (console.log와 네트워크 탭을 확인하세요)
          </Text>
        )}
      </Box>
      <Box mb={4}>
        <Text fontWeight="bold" color="#16A34A" fontSize="md" mb={1}>인원수</Text>
        <input type="number" min={1} value={count} onChange={e => setCount(Number(e.target.value))} style={{ width: 60 }} />
      </Box>
      <Button
        w="100%"
        bg="#16A34A"
        color="#fff"
        py={3}
        borderRadius={8}
        fontWeight="bold"
        fontSize={16}
        _hover={{ bg: '#059669' }}
        disabled={!date || !time}
        onClick={() => setIsConfirm(true)}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default ClassApplyPage; 