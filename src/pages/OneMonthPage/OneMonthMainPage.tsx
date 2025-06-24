// 한달살기 메인페이지 - 시안 스타일 적용
import { Box, Button, Text, Image } from '@chakra-ui/react';

const OneMonthMainPage = () => {
  return (
    <Box maxW="480px" mx="auto" bg="#FAFAF8" minH="100vh" borderRadius="2xl" overflow="hidden" boxShadow="md" position="relative">
      {/* 상단 설명 */}
      <Box px={6} pt={8} pb={4}>
        <Text fontSize="xl" fontWeight="bold" color="#3B2E19" mb={3}>
          의성 한 달 살이: 세대 재능 교류 프로그램
        </Text>
        <Text color="#3B2E19" fontSize="md" lineHeight={1.7}>
          의성에서 한 달간 머물며 청년과 어르신이 서로의 재능을 나누는 특별한 교류 프로그램입니다.<br/>
          한 달 동안 나의 재능과 배우고 싶은 재능을 등록하시고, 공통된 관심사를 가진 청년과 어르신이 자동으로 매칭됩니다.<br/>
          메이드인피플이 운영하는 게스트하우스 숙박이 제공됩니다.
        </Text>
      </Box>
      {/* 하단 이미지 */}
      <Box position="relative" w="100%" h="340px" mt={2}>
        <Image src="/one-month-main.jpg" alt="한달살기" w="100%" h="100%" objectFit="cover" />
        {/* 하단 버튼 - 이미지 위에 겹치게 */}
        <Box position="absolute" left={0} right={0} bottom={0} pb={6} display="flex" justifyContent="center">
          <Button
            bg="#C7EAB6"
            color="#2B5B2E"
            fontWeight="bold"
            fontSize="lg"
            borderRadius="2xl"
            px={12}
            py={6}
            _hover={{ bg: '#B2DCA0' }}
            boxShadow="md"
          >
            신청하기
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default OneMonthMainPage; 