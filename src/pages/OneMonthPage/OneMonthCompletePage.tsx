import { Box, Button, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const OneMonthCompletePage = () => {
  const navigate = useNavigate();
  return (
    <Box w="100vw" h="100vh" position="fixed" left={0} top={0} bg="rgba(180,200,180,0.18)" zIndex={10} display="flex" alignItems="center" justifyContent="center">
      <Box bg="white" borderRadius="2xl" p={8} boxShadow="0 4px 24px #0002" textAlign="center" maxW="340px" w="90%" minH="320px" display="flex" flexDirection="column" justifyContent="center">
        <Text fontSize="2xl" fontWeight="extrabold" mb={4} mt={2} style={{lineHeight:1.25, letterSpacing:'-0.5px'}}>
          🎉 재능 등록이<br/>완료되었습니다!
        </Text>
        <Text fontSize="md" mb={8} color="#222" style={{lineHeight:1.8, letterSpacing:'-0.2px'}}>
          의성 한 달 살이 프로그램에<br/>참여해 주셔서 감사합니다.<br/>
          공통된 관심사를 가진<br/>청년과 어르신이<br/>자동으로 매칭됩니다.<br/>
          매칭 결과를 확인해 주세요.
        </Text>
        <Button
          bg="#DFF5DF"
          color="#226B3A"
          borderRadius="xl"
          w="100%"
          fontWeight="bold"
          fontSize="lg"
          py={4}
          boxShadow="sm"
          _hover={{ bg: '#c8eac8' }}
          onClick={() => navigate('/')}
          style={{marginTop: 8, marginBottom: 4}}
        >
          확인
        </Button>
      </Box>
    </Box>
  );
};

export default OneMonthCompletePage; 