import {
  Box,
  Button,
  Flex,
  Text,
  VStack
} from "@chakra-ui/react"
import { IoArrowBack } from "react-icons/io5"
import { useNavigate } from "react-router-dom"

export const ChatPage = () => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleCreateRequest = () => {
    // 채팅 대화 페이지로 이동
    navigate("/chat/conversation")
  }

  return (
    <Box 
      maxW="480px" 
      h="100vh" 
      display="flex" 
      flexDirection="column" 
      px={6}
      py={4}
    >
      {/* 헤더 */}
      <Flex alignItems="center" mb={8}>
        <Box 
          as={IoArrowBack}
          boxSize={5} 
          cursor="pointer" 
          onClick={handleGoBack}
          color="gray.600"
        />
      </Flex>

      {/* 메인 콘텐츠 */}
      <VStack gap={6} flex="1" justifyContent="center" textAlign="center">
        {/* 제목 */}
        <Text 
          fontSize="2xl" 
          fontWeight="bold" 
          color="gray.800"
          mb={2}
        >
          AI 간편 요청서
        </Text>

        {/* 설명 */}
        <Text 
          fontSize="md" 
          color="gray.600" 
          lineHeight="tall"
          maxW="320px"
          mb={8}
        >
          음성 기반 입력을 통해 어르신이 손쉽
          <br />
          게 프로그램을 요청할 수 있도록 지원
          <br />
          합니다.
        </Text>

        {/* 일러스트레이션 영역 */}
        <Box 
          w="280px" 
          h="280px" 
          bg="green.50" 
          borderRadius="20px" 
          display="flex" 
          alignItems="center" 
          justifyContent="center"
          mb={12}
          position="relative"
        >
          {/* 휴대폰 일러스트 */}
          <Box
            w="120px"
            h="200px"
            bg="white"
            borderRadius="20px"
            border="3px solid"
            borderColor="primary"
            position="relative"
            display="flex"
            flexDirection="column"
            p={3}
          >
            {/* 상단 바 */}
            <Box
              w="100%"
              h="20px"
              bg="green.100"
              borderRadius="10px"
              mb={2}
            />
            
            {/* 챗봇 아이콘 */}
            <Box
              w="40px"
              h="40px"
              bg="primary"
              borderRadius="full"
              position="absolute"
              left="50%"
              top="40%"
              transform="translateX(-50%)"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box w="20px" h="20px" bg="white" borderRadius="full" />
            </Box>

            {/* 메시지 버블들 */}
            <VStack gap={2} mt={12}>
              <Box w="60%" h="8px" bg="green.200" borderRadius="4px" alignSelf="flex-start" />
              <Box w="80%" h="8px" bg="green.100" borderRadius="4px" alignSelf="flex-end" />
              <Box w="50%" h="8px" bg="green.200" borderRadius="4px" alignSelf="flex-start" />
            </VStack>
          </Box>

          {/* 사람 일러스트 */}
          <Box
            position="absolute"
            right="20px"
            bottom="20px"
            w="80px"
            h="100px"
          >
            {/* 간단한 사람 형태 */}
            <VStack gap={1}>
              {/* 머리 */}
              <Box w="25px" h="25px" bg="primary" borderRadius="full" />
              {/* 몸통 */}
              <Box w="40px" h="50px" bg="primary" borderRadius="10px" />
              {/* 팔 */}
              <Box w="15px" h="30px" bg="primary" borderRadius="8px" transform="rotate(30deg)" position="absolute" right="5px" top="35px" />
            </VStack>
          </Box>

          {/* 데코레이션 요소들 */}
          <Box position="absolute" top="15px" right="25px" w="20px" h="20px" border="2px solid" borderColor="primary" borderRadius="full" />
          <Box position="absolute" top="25px" left="15px" w="15px" h="15px" bg="primary" borderRadius="full" />
          <Box position="absolute" bottom="25px" left="25px" w="8px" h="8px" bg="green.300" borderRadius="full" />
        </Box>
      </VStack>

      {/* 하단 버튼 */}
      <Button
        bg="gray.700"
        color="white"
        size="lg"
        w="100%"
        h="56px"
        borderRadius="28px"
        fontSize="lg"
        fontWeight="medium"
        _hover={{ bg: "gray.600" }}
        _active={{ bg: "gray.800" }}
        onClick={handleCreateRequest}
      >
        <Flex alignItems="center" gap={2}>
          <Text>요청서 만들기</Text>
          <Text fontSize="xl">→</Text>
        </Flex>
      </Button>
    </Box>
  )
}

export default ChatPage


