// 한달살기 메인페이지 - 시안 스타일 적용
import { Box, Button, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const OneMonthMainPage = () => {
  const navigate = useNavigate();
  return (
    <Box
      maxW="480px"
      mx="auto"
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="md"
      position="relative"
      px={0}
      bg="white"
      style={{
        backgroundImage: 'url(/one-month-main.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* 텍스트 박스 */}
      <Box
        position="relative"
        zIndex={2}
        px={6}
        pt={4}
        pb={2}
        mt={4}
        mx={4}
        borderRadius="2xl"
      >
        <Text fontSize="md" fontWeight="bold" color="#3B2E19" mb={2}>
          의성 한 달 살이: 세대 재능 교류 프로그램
        </Text>
        <Text color="#3B2E19" fontSize="sm" lineHeight={1.7} mb={0}>
          의성에서 한 달간 머물며 청년과 어르신이 서로의 재능을 나누는 특별한 교류 프로그램입니다.<br/>
          한 달 동안 나의 재능과 배우고 싶은 재능을 등록하시고, 공통된 관심사를 가진 청년과 어르신이 자동으로 매칭됩니다.<br/>
          메이드인피플이 운영하는 게스트하우스 숙박이 제공됩니다.
        </Text>
      </Box>
      {/* 하단 버튼 */}
      <Box position="relative" zIndex={2} display="flex" justifyContent="center" mt={2} mb={4}>
        <Button
          bg="#DFF5DF"
          color="#226B3A"
          fontWeight="bold"
          fontSize="lg"
          borderRadius="2xl"
          px={12}
          py={4}
          _hover={{ bg: '#c8eac8' }}
          boxShadow="md"
          onClick={() => navigate('/one-month/apply')}
        >
          신청하기
        </Button>
      </Box>
    </Box>
  );
};

export default OneMonthMainPage; 