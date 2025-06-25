import { 
  Box, 
  Text, 
  Input,
  Button,
  VStack,
  Container,
  Flex
} from "@chakra-ui/react"
import { IoArrowBack, IoVolumeHigh, IoMic, IoSend } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
}

export const ChatConversationPage = () => {
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [hasStartedConversation, setHasStartedConversation] = useState(false)

  // 초기 제안 메시지들
  const suggestionMessages = [
    "요즘 스마트폰 쓰는 게 어려워요",
    "건강을 위해 운동을 배우고 싶어요", 
    "요즘 그림 그리는게 좋아"
  ]

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleSendMessage = (messageText?: string) => {
    const textToSend = messageText || inputValue.trim()
    if (textToSend) {
      // 첫 메시지인 경우 제안들을 숨김
      if (!hasStartedConversation) {
        setHasStartedConversation(true)
      }

      const newMessage: Message = {
        id: Date.now().toString(),
        content: textToSend,
        sender: 'user',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, newMessage])
      setInputValue("")
      
      // 임시 AI 응답 (실제로는 백엔드 API 호출)
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: "네, 말씀해주신 내용을 바탕으로 적합한 프로그램을 찾아드리겠습니다.",
          sender: 'ai',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiResponse])
      }, 1000)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const handleVoiceInput = () => {
    // 음성 입력 기능 (추후 구현)
    console.log("음성 입력 시작")
  }

  const handlePlayAudio = () => {
    // 음성 재생 기능 (추후 구현) 
    console.log("음성 재생")
  }

  return (
    <Box 
      maxW="480px" 
      h="100vh" 
      display="flex" 
      flexDirection="column" 
      p={0}
      bg="gray.50"
    >
      {/* 헤더 */}
      <Box bg="white" px={4} py={3} borderBottom="1px solid" borderColor="gray.200">
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center" gap={3}>
            <Box 
              as={IoArrowBack}
              boxSize={5} 
              cursor="pointer" 
              onClick={handleGoBack}
              color="gray.600"
            />
            <Box
              w={8}
              h={8}
              bg="green.500"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="white"
              fontSize="sm"
              fontWeight="bold"
            >
              G
            </Box>
            <VStack gap={0} alignItems="flex-start">
              <Text fontWeight="bold" fontSize="md">Gemini</Text>
              <Text fontSize="xs" color="green.500">● Online</Text>
            </VStack>
          </Flex>
          <Box 
            as={IoVolumeHigh}
            boxSize={5} 
            cursor="pointer" 
            onClick={handlePlayAudio}
            color="blue.500"
          />
        </Flex>
      </Box>

      {/* 메시지 영역 */}
      <VStack 
        flex="1" 
        gap={4} 
        p={4} 
        overflowY="auto"
        alignItems="stretch"
        justifyContent={hasStartedConversation ? "flex-start" : "center"}
      >
        {!hasStartedConversation ? (
          // 대화 시작 전 - 안내 및 제안 메시지들
          <VStack gap={4} textAlign="center">
            <Text fontSize="lg" color="gray.800" mb={4}>
              배우고 싶은 수업을 말씀해 보세요
            </Text>
            <VStack gap={3} w="100%">
              {suggestionMessages.map((suggestion, index) => (
                <Box
                  key={index}
                  bg="gray.100"
                  px={4}
                  py={3}
                  borderRadius="20px"
                  cursor="pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                  _hover={{ bg: "gray.200" }}
                  w="100%"
                  textAlign="center"
                >
                  <Text color="gray.700" fontSize="md">
                    "{suggestion}"
                  </Text>
                </Box>
              ))}
            </VStack>
          </VStack>
        ) : (
          // 대화 시작 후 - 실제 메시지들
          messages.map((message) => (
            <Flex
              key={message.id}
              justifyContent={message.sender === 'user' ? 'flex-end' : 'flex-start'}
            >
              <Box
                maxW="80%"
                bg={message.sender === 'user' ? 'blue.500' : 'white'}
                color={message.sender === 'user' ? 'white' : 'gray.800'}
                px={4}
                py={3}
                borderRadius="18px"
                borderBottomRightRadius={message.sender === 'user' ? '4px' : '18px'}
                borderBottomLeftRadius={message.sender === 'ai' ? '4px' : '18px'}
                boxShadow="sm"
              >
                <Text fontSize="md">{message.content}</Text>
              </Box>
            </Flex>
          ))
        )}
      </VStack>

      {/* 입력 영역 */}
      <Box bg="white" p={4} borderTop="1px solid" borderColor="gray.200">
        <Flex gap={2} alignItems="center">
          <Box flex="1" position="relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="메시지를 입력하세요..."
              borderRadius="full"
              bg="gray.50"
              border="1px solid"
              borderColor="gray.200"
              pr={12}
              _focus={{
                borderColor: "blue.500",
                boxShadow: "0 0 0 1px blue.500"
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage()
                }
              }}
            />
            <Button
              size="sm"
              variant="ghost"
              borderRadius="full"
              position="absolute"
              right={2}
              top="50%"
              transform="translateY(-50%)"
              onClick={handleVoiceInput}
              color="gray.500"
              _hover={{ color: "blue.500" }}
              minW="auto"
              p={1}
            >
              <IoMic />
            </Button>
          </Box>
          
          <Button
            bg="blue.500"
            color="white"
            borderRadius="full"
            p={2}
            minW="40px"
            h="40px"
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim()}
            _hover={{ bg: "blue.600" }}
            _active={{ bg: "blue.700" }}
          >
            <IoSend size={16} />
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}

export default ChatConversationPage 