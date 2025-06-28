import { birthAtom, confirmPasswordAtom, emailAtom, nameAtom, passwordAtom, phoneAtom, roleAtom } from '@/atoms/registerAtoms';
import { ValidationInput, ValidationRadio } from '@/components/Input';
import { useRegisterFlow } from '@/hooks/auth/useRegisterFlow';
import { Box, Button, Container, Heading, VStack } from '@chakra-ui/react';
import { useAtom } from 'jotai';

export function RegisterPage() {
  const { proceedToProfile } = useRegisterFlow();
  
  // 조타이 atom 직접 사용
  const [userType, setUserType] = useAtom(roleAtom);
  const [name, setName] = useAtom(nameAtom);
  const [email, setEmail] = useAtom(emailAtom);
  const [phone, setPhone] = useAtom(phoneAtom);
  const [birthDate, setBirthDate] = useAtom(birthAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [confirmPassword, setConfirmPassword] = useAtom(confirmPasswordAtom);

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

    // 조타이 atom에 이미 저장되어 있으므로 바로 다음 페이지로
    proceedToProfile();
  };

  return (
    <Container bg="white" minH="100vh" maxW="480px" px="4">
      <VStack gap="8" justify="center" minH="100vh" py="8">
        <VStack gap="3" textAlign="center">
          <Heading size="xl" color="gray.800" fontWeight="bold">
            회원가입
          </Heading>
        </VStack>
        
        <Box w="full" p="6">
          <form onSubmit={handleSubmit}>
            <VStack gap="6">
              <ValidationRadio
                label="사용자 유형"
                name="userType"
                options={[
                  { value: '청년', label: '청년' },
                  { value: '어르신', label: '어르신' }
                ]}
                value={userType}
                onChange={(value) => setUserType(value as '청년' | '어르신')}
                required
              />

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

              <Button
                type="submit"
                bg="green.500"
                color="white"
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
                mt="4"
              >
                계속
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  );
} 