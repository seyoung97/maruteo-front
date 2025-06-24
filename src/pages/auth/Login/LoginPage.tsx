import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Input,
  Text,
  VStack
} from '@chakra-ui/react';
import { useState } from 'react';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: 실제 로그인 API 호출
      await new Promise(resolve => setTimeout(resolve, 1000)); // 임시 딜레이
      
      alert('로그인 성공! 환영합니다!');
      
      // TODO: 로그인 성공 후 리다이렉트
      console.log('로그인 성공:', { email, password, rememberMe });
      
    } catch {
      alert('로그인 실패. 이메일 또는 비밀번호를 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container 
      bg="white" 
      minH="100vh" 
      maxW="480px" 
      px="4"
      style={{ backgroundColor: 'white' }}
    >
      <VStack gap="8" justify="center" minH="100vh">
        {/* 헤더 */}
        <VStack gap="3" textAlign="center" pt="8">
          <Heading size="xl" color="gray.800" fontWeight="bold">
            로그인
          </Heading>
        </VStack>
        
        {/* 로그인 폼 */}
        <Box
          w="full"
          p="10"
        >
          <form onSubmit={handleSubmit}>
            <VStack gap="6">
              {/* 이메일 입력 */}
              <Box w="full">
                <label 
                  htmlFor="email" 
                  style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151'
                  }}
                >
                  이메일
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  w="full"
                  h="48px"
                  fontSize="16px" // iOS에서 줌 방지
                  borderRadius="lg"
                  border="1px solid"
                  borderColor="gray.200"
                  _focus={{
                    borderColor: "blue.500",
                    boxShadow: "0 0 0 1px #3182ce"
                  }}
                />
              </Box>
              
              {/* 비밀번호 입력 */}
              <Box w="full">
                <label 
                  htmlFor="password" 
                  style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151'
                  }}
                >
                  비밀번호
                </label>
                <HStack w="full">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호를 입력하세요"
                    required
                    flex="1"
                    h="48px"
                    fontSize="16px" // iOS에서 줌 방지
                    borderRadius="lg"
                    border="1px solid"
                    borderColor="gray.200"
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px #3182ce"
                    }}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                    h="48px"
                    w="48px"
                    p="0"
                    borderRadius="lg"
                    color="gray.500"
                    _hover={{ bg: "gray.100" }}
                  >
                    {showPassword ? '숨기기' : '보기'}
                  </Button>
                </HStack>
              </Box>
              
              {/* 로그인 상태 유지 & 비밀번호 찾기 */}
              <HStack justify="space-between" w="full">
                <HStack gap="2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <label 
                    htmlFor="rememberMe" 
                    style={{ 
                      fontSize: '14px', 
                      color: '#6b7280' 
                    }}
                  >
                    로그인 상태 유지
                  </label>
                </HStack>
                <a 
                  href="#" 
                  style={{ 
                    color: '#3182ce', 
                    fontSize: '14px', 
                    textDecoration: 'underline' 
                  }}
                >
                  비밀번호 찾기
                </a>
              </HStack>
              
              {/* 로그인 버튼 */}
              <Button
                type="submit"
                bg="green.500"
                color="white"
                loading={isLoading}
                w="full"
                h="48px"
                fontSize="md"
                fontWeight="semibold"
                borderRadius="lg"
                _hover={{ 
                  bg: "green.600",
                  transform: "translateY(-1px)", 
                  boxShadow: "lg" 
                }}
                transition="all 0.2s"
              >
                {isLoading ? '로그인 중...' : '로그인'}
              </Button>
            </VStack>
          </form>
          
          {/* 구분선 */}
          <HStack pt="6" w="full">
            <Box flex="1" h="1px" bg="gray.200" />
            <Text fontSize="sm" color="gray.500" px="4">
              또는
            </Text>
            <Box flex="1" h="1px" bg="gray.200" />
          </HStack>
          
          {/* 소셜 로그인 */}
          <VStack gap="3" pt="4" w="full">
            <Button 
              variant="outline" 
              w="full" 
              h="48px"
              fontSize="md"
              borderRadius="lg"
              borderColor="gray.300"
              color="gray.700"
              _hover={{ bg: "gray.50" }}
            >
              Google로 계속하기
            </Button>
            <Button 
              variant="outline" 
              w="full" 
              h="48px"
              fontSize="md"
              borderRadius="lg"
              borderColor="gray.300"
              color="gray.700"
              _hover={{ bg: "gray.50" }}
            >
              Kakao로 계속하기
            </Button>
          </VStack>
          
          {/* 회원가입 링크 */}
          <HStack pt="6" justify="center" w="full">
            <Text fontSize="sm" color="gray.600">
              계정이 없으신가요?
            </Text>
            <a 
              href="/auth/register" 
              style={{ 
                color: '#3182ce', 
                fontSize: '14px', 
                fontWeight: '500', 
                textDecoration: 'underline' 
              }}
            >
              회원가입
            </a>
          </HStack>
        </Box>
      </VStack>
    </Container>
  );
} 