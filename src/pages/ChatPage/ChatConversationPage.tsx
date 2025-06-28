import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  VStack
} from "@chakra-ui/react"
import { IoArrowBack, IoVolumeHigh, IoMic, IoSend, IoStop } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { useState, useRef } from "react"

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
  const [sessionId, setSessionId] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  
  // 음성 녹음 관련 상태
  const [isRecording, setIsRecording] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  // TTS 관련 상태
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)

  // 초기 제안 메시지들
  const suggestionMessages = [
    "요즘 스마트폰 쓰는 게 어려워요",
    "건강을 위해 운동을 배우고 싶어요", 
    "요즘 그림 그리는게 좋아"
  ]

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue.trim()
    if (textToSend && !isLoading) {
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
      setIsLoading(true)
      
      try {
        // 첫 메시지면 세션 생성
        let currentSessionId = sessionId
        if (!currentSessionId) {
          console.log('새 세션 생성 중...')
          const sessionResponse = await fetch('http://localhost:5000/api/chat/sessions', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json; charset=utf-8',
            }
          })
          
          if (!sessionResponse.ok) {
            throw new Error(`세션 생성 실패: ${sessionResponse.status}`)
          }
          
          const sessionData = await sessionResponse.json()
          currentSessionId = sessionData.sessionId
          setSessionId(currentSessionId)
          console.log('세션 생성됨:', currentSessionId)
        }

        // 메시지 전송
        console.log('메시지 전송 중...', textToSend)
        const response = await fetch(`http://localhost:5000/api/chat/sessions/${currentSessionId}/messages`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify({ 
            content: textToSend, 
            type: 'text' 
          })
        })
        
        if (!response.ok) {
          throw new Error(`메시지 전송 실패: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('AI 응답 받음:', data)
        
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: data.message.content,
          sender: 'ai',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiResponse])
        
        // 🔊 AI 응답을 자동으로 음성 재생
        setTimeout(() => {
          speakText(data.message.content)
        }, 500) // 0.5초 후 자동 재생
        
      } catch (error) {
        console.error('API 호출 에러:', error)
        const errorResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: "죄송합니다. 일시적인 오류가 발생했습니다. 다시 시도해주세요.",
          sender: 'ai',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, errorResponse])
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  // 🎤 음성인식 기능 구현
  const handleVoiceInput = async () => {
    if (isRecording) {
      // 녹음 중단
      stopRecording()
    } else {
      // 녹음 시작
      startRecording()
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true
        } 
      })
      
      const recorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      })
      
      audioChunksRef.current = []
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }
      
      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        await sendAudioToAPI(audioBlob)
        
        // 스트림 정리
        stream.getTracks().forEach(track => track.stop())
      }
      
      recorder.start()
      setMediaRecorder(recorder)
      setIsRecording(true)
      
      console.log("🎤 음성 녹음이 시작되었습니다. 말씀해 주세요...")
      
    } catch (error) {
      console.error('마이크 접근 오류:', error)
      alert("❌ 마이크 접근 실패: 마이크 권한을 허용해 주세요.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop()
      setIsRecording(false)
      setMediaRecorder(null)
      
      console.log("🔄 음성을 텍스트로 변환하는 중...")
    }
  }

  const sendAudioToAPI = async (audioBlob: Blob) => {
    try {
      const formData = new FormData()
      formData.append('audio', audioBlob, 'recording.webm')
      
      const response = await fetch('http://localhost:5000/api/speech-to-text', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) {
        throw new Error(`음성 변환 실패: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.transcript) {
        setInputValue(data.transcript)
        console.log(`✅ 음성 인식 완료: "${data.transcript}"`)
      } else {
        throw new Error('음성을 인식할 수 없습니다')
      }
      
    } catch (error) {
      console.error('음성 변환 오류:', error)
      alert("❌ 음성 인식 실패: 다시 시도해 주세요.")
    }
  }

  // 🔊 Google TTS를 사용한 음성 합성
  const speakText = async (text: string) => {
    try {
      // 이미 재생 중이면 중단
      if (isSpeaking && currentAudio) {
        currentAudio.pause()
        currentAudio.currentTime = 0
        setIsSpeaking(false)
        setCurrentAudio(null)
        console.log("🔇 음성 재생 중단")
        return
      }

      setIsSpeaking(true)
      console.log("🔊 음성 합성 중...")

      // 백엔드 TTS API 호출
      const response = await fetch('http://localhost:5000/api/text-to-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })

      if (!response.ok) {
        throw new Error('TTS API 호출 실패')
      }

      const data = await response.json()
      
      if (data.success && data.audioContent) {
        // Base64 오디오를 Blob으로 변환
        const audioBlob = base64ToBlob(data.audioContent, 'audio/mp3')
        const audioUrl = URL.createObjectURL(audioBlob)
        
        // 오디오 재생
        const audio = new Audio(audioUrl)
        setCurrentAudio(audio)
        
        audio.onended = () => {
          setIsSpeaking(false)
          setCurrentAudio(null)
          URL.revokeObjectURL(audioUrl)
          console.log("🔇 음성 재생 완료")
        }
        
        audio.onerror = () => {
          setIsSpeaking(false)
          setCurrentAudio(null)
          URL.revokeObjectURL(audioUrl)
          console.error("음성 재생 오류")
        }
        
        await audio.play()
        console.log("🔊 음성 재생 시작")
      } else {
        throw new Error('음성 합성 데이터가 없습니다')
      }
      
    } catch (error) {
      console.error('TTS 오류:', error)
      setIsSpeaking(false)
      setCurrentAudio(null)
      alert('음성 합성에 실패했습니다.')
    }
  }

  // Base64를 Blob으로 변환하는 헬퍼 함수
  const base64ToBlob = (base64: string, mimeType: string) => {
    const byteCharacters = atob(base64)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    return new Blob([byteArray], { type: mimeType })
  }

  // 음성 재생 버튼 클릭 핸들러
  const handlePlayAudio = () => {
    // 가장 최근 AI 메시지 찾기
    const lastAiMessage = messages
      .filter(msg => msg.sender === 'ai')
      .pop()

    if (lastAiMessage) {
      speakText(lastAiMessage.content)
    } else {
      alert("재생할 AI 메시지가 없습니다.")
    }
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
              aria-label="뒤로가기"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleGoBack()
                }
              }}
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
              aria-label="Gemini AI 프로필"
            >
              G
            </Box>
            <VStack gap={0} alignItems="flex-start">
              <Text fontWeight="bold" fontSize="md">Gemini</Text>
              <Text fontSize="xs" color="green.500">
                {isLoading ? "● 입력 중..." : isSpeaking ? "🔊 음성 재생 중..." : "● Online"}
              </Text>
            </VStack>
          </Flex>
          <Box 
            as={isSpeaking ? IoStop : IoVolumeHigh}
            boxSize={5} 
            cursor="pointer" 
            onClick={handlePlayAudio}
            color={isSpeaking ? "red.500" : "blue.500"}
            aria-label={isSpeaking ? "음성 중단" : "음성 재생"}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handlePlayAudio()
              }
            }}
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
        role="main"
        aria-label="채팅 메시지 영역"
      >
        {!hasStartedConversation ? (
          // 대화 시작 전 - 안내 및 제안 메시지들
          <VStack gap={4} textAlign="center">
            <Text fontSize="lg" color="gray.800" mb={4}>
              배우고 싶은 수업을 말씀해 보세요
            </Text>
            <VStack gap={3} w="100%" role="group" aria-label="제안 메시지 목록">
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
                  opacity={isLoading ? 0.5 : 1}
                  pointerEvents={isLoading ? "none" : "auto"}
                  role="button"
                  tabIndex={0}
                  aria-label={`제안 메시지: ${suggestion}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleSuggestionClick(suggestion)
                    }
                  }}
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
          <>
            {messages.map((message) => (
              <Flex
                key={message.id}
                justifyContent={message.sender === 'user' ? 'flex-end' : 'flex-start'}
                role="group"
                aria-label={`${message.sender === 'user' ? '사용자' : 'AI'} 메시지`}
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
            ))}
            
            {/* 로딩 인디케이터 */}
            {isLoading && (
              <Flex justifyContent="flex-start" role="status" aria-label="AI 응답 대기 중">
                <Box
                  maxW="80%"
                  bg="white"
                  color="gray.800"
                  px={4}
                  py={3}
                  borderRadius="18px"
                  borderBottomLeftRadius="4px"
                  boxShadow="sm"
                >
                  <Text fontSize="md" color="gray.500">
                    AI가 응답을 생성하고 있습니다...
                  </Text>
                </Box>
              </Flex>
            )}
          </>
        )}
      </VStack>

      {/* 입력 영역 */}
      <Box bg="white" p={4} borderTop="1px solid" borderColor="gray.200">
        <Flex gap={2} alignItems="center" as="form" onSubmit={(e) => {
          e.preventDefault()
          if (!isLoading) handleSendMessage()
        }}>
          <Box flex="1" position="relative">
            <Input
              id="message-input"
              name="message"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isLoading ? "AI가 응답 중입니다..." : "메시지를 입력하세요..."}
              borderRadius="full"
              bg="gray.50"
              border="1px solid"
              borderColor="gray.200"
              pr={12}
              disabled={isLoading}
              aria-label="메시지 입력"
              _focus={{
                borderColor: "blue.500",
                boxShadow: "0 0 0 1px blue.500"
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !isLoading) {
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
              color={isRecording ? "red.500" : "gray.500"}
              bg={isRecording ? "red.50" : "transparent"}
              _hover={{ 
                color: isRecording ? "red.600" : "blue.500",
                bg: isRecording ? "red.100" : "gray.50"
              }}
              minW="auto"
              p={1}
              disabled={isLoading}
              aria-label={isRecording ? "녹음 중단" : "음성 입력"}
              title={isRecording ? "녹음 중단" : "음성 입력"}
            >
              {isRecording ? <IoStop /> : <IoMic />}
            </Button>
          </Box>
          
          <Button
            type="submit"
            bg="blue.500"
            color="white"
            borderRadius="full"
            p={2}
            minW="40px"
            h="40px"
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isLoading}
            _hover={{ bg: "blue.600" }}
            _active={{ bg: "blue.700" }}
            opacity={isLoading ? 0.5 : 1}
            aria-label="메시지 전송"
            title="메시지 전송"
          >
            <IoSend size={16} />
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}

export default ChatConversationPage