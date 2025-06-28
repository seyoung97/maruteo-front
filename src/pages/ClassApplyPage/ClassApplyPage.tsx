import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Button, Flex, Text, Image as CImage } from '@chakra-ui/react';
import StarRating from '@/components/Icon/StarRating';
import GarlicIcon from '@/components/Icon/GarlicIcon';
import { FaPlay } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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
};

const ClassApplyPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState('');
  const [count, setCount] = useState(1);
  const [showVideo, setShowVideo] = useState(false);

  // 날짜 YYYY-MM-DD 문자열로 변환
  const dateStr = date.toISOString().slice(0, 10);
  // 선택한 날짜의 예약된 시간대
  const reservedTimesForDate = mockClass.reservedTimes[dateStr] || [];

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
      <Box bg="#16A34A" color="white" borderRadius="lg" py={3} px={4} mb={4} display="flex" alignItems="center" justifyContent="space-between">
        <Text fontWeight="bold" fontSize="lg" style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          display: 'block',
          maxWidth: '200px',
        }}>{mockClass.title}</Text>
        <Flex align="center" gap={3}>
          <Box color="white">
            <StarRating value={mockClass.rating} size="1.2em" />
          </Box>
          <Text fontSize="md" color="white"><GarlicIcon style={{ fontSize: 20, marginRight: 2 }} /> {mockClass.garlic}</Text>
        </Flex>
      </Box>
      {/* 달력/시간/장소/지도/인원수/신청 버튼 등 기존 내용 그대로 */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 'bold', color: '#16A34A', marginBottom: 8 }}>수업 날짜</div>
        <Calendar
          value={date}
          onChange={(value) => setDate(value as Date)}
          calendarType="gregory"
          tileDisabled={({ date }) =>
            mockClass.unavailableDays.includes(date.getDay()) ||
            mockClass.reservedDates.includes(date.toISOString().slice(0, 10))
          }
        />
        <div style={{ color: '#333', fontWeight: 500, marginTop: 8 }}>
          {date && `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${['일','월','화','수','목','금','토'][date.getDay()]})`}
        </div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 'bold', color: '#16A34A', marginBottom: 8 }}>수업 시간</div>
        <select value={time} onChange={e => setTime(e.target.value)}>
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
      </div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 'bold', color: '#16A34A', marginBottom: 8 }}>수업 장소</div>
        <div style={{ fontSize: 14, marginBottom: 8 }}>{mockClass.location}</div>
        <MapContainer
          center={[mockClass.lat, mockClass.lng]}
          zoom={16}
          style={{ height: 180, width: '100%', borderRadius: 8 }}
        >
          <TileLayer
            // @ts-ignore
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[mockClass.lat, mockClass.lng]}>
            <Popup>{mockClass.location}</Popup>
          </Marker>
        </MapContainer>
      </div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 'bold', color: '#16A34A', marginBottom: 8 }}>인원수</div>
        <input type="number" min={1} value={count} onChange={e => setCount(Number(e.target.value))} style={{ width: 60 }} />
      </div>
      <button style={{ width: '100%', background: '#16A34A', color: '#fff', padding: 12, borderRadius: 8, fontWeight: 'bold', fontSize: 16 }}>
        신청 완료
      </button>
    </div>
  );
};

export default ClassApplyPage; 