import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { Box, Button, Container, Flex, Heading, Input, Text, VStack } from '@chakra-ui/react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { getLatLngFromAddress } from '@/services/googleMapService'; // 주소→좌표 변환 함수

interface Lesson {
  id: number;
  title: string;
  description: string;
  // ...필요한 필드 추가
}

// 강사 프로필 타입
type TeacherProfile = {
  name: string;
  userId: string;
  profileImage: string;
  rating: number;
  introduction: string;
};

const RegisterClassPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [count, setCount] = useState(1);
  const [address, setAddress] = useState('경상북도 의성군 의성읍 충효로 88');
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [teacher, setTeacher] = useState<TeacherProfile | null>(null);

  // mock 데이터: 비활성화 요일(일, 토), 예약된 날짜
  const unavailableDays = [0, 6];
  const reservedDates: string[] = ['2025-06-27'];

  useEffect(() => {
    if (!address) return;
    getLatLngFromAddress(address).then((coords) => {
      if (coords) setCenter(coords);
      else setCenter(null); // 변환 실패 시 처리
    });
  }, [address]);

  useEffect(() => {
    // 실제 API 주소와 파라미터는 Notion 문서 참고
    fetch('/api/teacher-profile?teacherId=123')
      .then(res => res.json())
      .then(data => setTeacher(data));
  }, []);

  // 구글 지도 로딩
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    language: 'ko',
    region: 'KR',
  });

  // 날짜 비활성화 함수
  function isDisabled({ date }: { date: Date }) {
    if (unavailableDays.includes(date.getDay())) return true;
    if (reservedDates.includes(date.toISOString().slice(0, 10))) return true;
    return false;
  }

  // 날짜 한글 포맷
  function formatDate(date: Date | null) {
    if (!date) return '';
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${week[date.getDay()]}요일`;
  }

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>재능 목록을 불러올 수 없습니다.</div>;

  if (!isLoaded) return <div>로딩 중...</div>;

  const sectionTitleProps = {
    fontSize: 'lg',
    fontWeight: 'bold',
    color: 'green.600',
    mb: 1,
  };

  return (
    <Box maxW="480px" mx="auto" p={4} bg="#FAFAF9" minH="100vh">
      <VStack gap={4} align="stretch">
        {/* 수업 이미지/제목 등 */}
        <Box>
          <img src="https://cdn.pixabay.com/photo/2016/03/05/19/02/soup-1238248_1280.jpg" alt="수업 이미지" style={{ width: '100%', borderRadius: 16 }} />
          <Text mt={2} fontWeight="bold">든든한 한 그릇, 의성 소고기국밥 배우기</Text>
        </Box>
        {/* 수업 날짜 */}
        <Box>
          <Text {...sectionTitleProps}>수업 날짜</Text>
          <Calendar
            onChange={(value) => setSelectedDate(value as Date)}
            value={selectedDate}
            tileDisabled={isDisabled}
          />
        </Box>
        {/* 선택한 날짜/시간 표시 */}
        <Button colorScheme="green" w="100%" mt={2}>
          {selectedDate
            ? `${formatDate(selectedDate)} 오전 10시~오후 12시`
            : '날짜를 선택하세요'}
        </Button>
        {/* 수업 장소 */}
        <Box>
          <Text {...sectionTitleProps}>수업 장소</Text>
          <input
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="주소를 입력하세요"
          />
          <Box borderRadius="lg" overflow="hidden" boxShadow="md" mb={4}>
            <GoogleMap
              mapContainerStyle={{
                width: '100%',
                height: '220px',
                borderRadius: 12,
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}
              center={center || { lat: 36.5, lng: 127.5 }} // 기본값(대한민국 중심 등)
              zoom={16}
            >
              {center && <Marker position={center} />}
            </GoogleMap>
          </Box>
        </Box>
        {/* 인원수 조절 */}
        <Box>
          <Text {...sectionTitleProps}>인원수</Text>
          <Flex>
            <Button onClick={() => setCount(count - 1)} disabled={count <= 1}>-</Button>
            <Input value={count} readOnly w="40px" textAlign="center" />
            <Button onClick={() => setCount(count + 1)}>+</Button>
          </Flex>
        </Box>
        {/* 재능 기부자(강사) 프로필 */}
        <Box mb={3}>
          <Text fontWeight="bold" color="green.600" mb={1}>재능 기부자(강사) 프로필</Text>
          {teacher && (
            <Flex align="center" gap={3} border="1px solid #B6E2B6" borderRadius={12} p={3} mb={2} bg="white" boxShadow="sm">
              {teacher.profileImage && (
                <img src={teacher.profileImage} alt={teacher.name} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: '2px solid #B6E2B6' }} />
              )}
              <Box>
                <Flex align="center" gap={2}>
                  <Text fontWeight="bold" fontSize="lg">{teacher.name}</Text>
                  <Text color="gray.500" fontSize="sm">{teacher.userId}</Text>
                  <Flex align="center" gap={1} ml={2}>
                    <Text fontSize="md" color="#FACC15">⭐️</Text>
                    <Text fontWeight="bold" fontSize="md">{teacher.rating}</Text>
                  </Flex>
                </Flex>
                <Text color="gray.700" fontSize="sm" mt={1}>{teacher.introduction}</Text>
              </Box>
            </Flex>
          )}
        </Box>
        {/* 신청 완료 버튼 */}
        <Button colorScheme="green" w="100%" mt={4}>신청 완료</Button>
      </VStack>
    </Box>
  );
};

export default RegisterClassPage; 