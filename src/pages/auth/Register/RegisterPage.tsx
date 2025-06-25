import { ValidationInput, ValidationRadio } from '@/components/Input';
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Text,
  VStack
} from '@chakra-ui/react';
import { useState } from 'react';

export function RegisterPage() {
  const [userType, setUserType] = useState('청년'); // '어르신' 또는 '청년'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Validation 함수들
  const validateEmail = (value: string) => {
    if (!value) return undefined;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return '올바른 이메일 형식을 입력하세요';
    return undefined;
  };

  const validatePhone = (value: string) => {
    if (!value) return undefined;
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (!phoneRegex.test(value)) return '010-0000-0000 형식으로 입력하세요';
    return undefined;
  };

  const validatePassword = (value: string) => {
    if (!value) return undefined;
    if (value.length < 8) return '비밀번호는 8자 이상이어야 합니다';
    return undefined;
  };

  const validateConfirmPassword = (value: string) => {
    if (!value) return undefined;
    if (value !== password) return '비밀번호가 일치하지 않습니다';
    return undefined;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !phone || !birthDate || !password || !confirmPassword) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (password.length < 8) {
      alert('비밀번호는 8자 이상이어야 합니다.');
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: 실제 회원가입 API 호출
      await new Promise(resolve => setTimeout(resolve, 1500)); // 임시 딜레이
      
      alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
      
      // TODO: 회원가입 성공 후 로그인 페이지로 리다이렉트
      console.log('회원가입 성공:', { 
        userType, name, email, phone, birthDate, password 
      });
      
    } catch {
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
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
      <VStack gap="8" justify="center" minH="100vh" py="8">
        {/* 헤더 */}
        <VStack gap="3" textAlign="center">
          <Heading size="xl" color="gray.800" fontWeight="bold">
            회원가입
          </Heading>
        </VStack>
        
        {/* 회원가입 폼 */}
        <Box w="full" p="6">
          <form onSubmit={handleSubmit}>
            <VStack gap="6">
              {/* 사용자 유형 선택 */}
              <ValidationRadio
                label="사용자 유형"
                name="userType"
                options={[
                  { value: '청년', label: '청년' },
                  { value: '어르신', label: '어르신' }
                ]}
                value={userType}
                onChange={setUserType}
                required
              />

              {/* ValidationInput 컴포넌트들 */}
              <ValidationInput
                id="name"
                label="이름"
                type="text"
                value={name}
                onChange={setName}
                placeholder="이름을 입력하세요"
                required
              />

              <ValidationInput
                id="email"
                label="이메일"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="your@email.com"
                required
                validation={validateEmail}
              />

              <ValidationInput
                id="phone"
                label="연락처"
                type="tel"
                value={phone}
                onChange={setPhone}
                placeholder="010-1234-5678"
                required
                validation={validatePhone}
              />

              <ValidationInput
                id="birthDate"
                label="생년월일"
                type="date"
                value={birthDate}
                onChange={setBirthDate}
                required
              />

              <ValidationInput
                id="password"
                label="비밀번호"
                type="password"
                value={password}
                onChange={setPassword}
                placeholder="8자 이상 입력하세요"
                required
                showPasswordToggle
                validation={validatePassword}
              />

              <ValidationInput
                id="confirmPassword"
                label="비밀번호 확인"
                type="password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                placeholder="비밀번호를 다시 입력하세요"
                required
                showPasswordToggle
                validation={validateConfirmPassword}
              />

              {/* 회원가입 버튼 */}
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
                mt="2"
              >
                {isLoading ? '회원가입 중...' : '회원가입'}
              </Button>
            </VStack>
          </form>
          
          {/* 로그인 링크 */}
          <HStack pt="6" justify="center" w="full">
            <Text fontSize="sm" color="gray.600">
              이미 계정이 있으신가요?
            </Text>
            <a 
              href="/login" 
              style={{ 
                color: '#3182ce', 
                fontSize: '14px', 
                fontWeight: '500', 
                textDecoration: 'underline' 
              }}
            >
              로그인
            </a>
          </HStack>
        </Box>
      </VStack>
    </Container>
  );
} 