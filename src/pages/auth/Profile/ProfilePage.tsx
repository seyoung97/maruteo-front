import { ProfileImageUpload } from '@/components/ImageUpload';
import { ValidationInput, ValidationRadio } from '@/components/Input';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack
} from '@chakra-ui/react';
import { useState } from 'react';

export function ProfilePage() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Validation 함수들
  const validateUserId = (value: string) => {
    if (!value) return undefined;
    if (value.length < 3) return '아이디는 3자 이상이어야 합니다';
    if (!/^[a-zA-Z0-9_]+$/.test(value)) return '영문, 숫자, 언더스코어만 사용 가능합니다';
    return undefined;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !gender || !address || !introduction || !userId) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: 실제 프로필 등록 API 호출
      await new Promise(resolve => setTimeout(resolve, 1500)); // 임시 딜레이
      
      alert('프로필 등록이 완료되었습니다!');
      
      // TODO: 프로필 등록 성공 후 메인 페이지로 리다이렉트
      console.log('프로필 등록 성공:', { 
        profileImage, name, gender, address, introduction, userId 
      });
      
    } catch {
      alert('프로필 등록에 실패했습니다. 다시 시도해주세요.');
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
            프로필
          </Heading>
        </VStack>
        
        {/* 안내 텍스트 */}
        <VStack gap="2" textAlign="center" px="4">
          <Text fontSize="lg" fontWeight="semibold" color="gray.800">
            프로필을 완성해주세요!
          </Text>
          <Text fontSize="sm" color="gray.600" lineHeight="1.5">
            학습을 효과적으로 입력받을 수 있도록 자세히 작아지고
            <br />
            서비스 내 노출 빈도도 증가합니다.
          </Text>
        </VStack>
        
        {/* 프로필 등록 폼 */}
        <Box w="full" p="6">
          <form onSubmit={handleSubmit}>
            <VStack gap="6">
              {/* 프로필 사진 업로드 */}
              <ProfileImageUpload
                value={profileImage}
                onChange={setProfileImage}
                size="96px"
              />

              {/* ValidationInput 컴포넌트들 */}
              <ValidationInput
                id="name"
                label="성함"
                type="text"
                value={name}
                onChange={setName}
                placeholder="성함을 입력해주세요"
                required
              />

              <ValidationRadio
                label="성별"
                name="gender"
                options={[
                  { value: '남', label: '남' },
                  { value: '여', label: '여' }
                ]}
                value={gender}
                onChange={setGender}
                required
              />

              <ValidationInput
                id="address"
                label="주소"
                type="text"
                value={address}
                onChange={setAddress}
                placeholder="주소를 입력해주세요"
                required
              />

              <ValidationInput
                id="introduction"
                label="한줄 소개"
                type="text"
                value={introduction}
                onChange={setIntroduction}
                placeholder="-"
                required
              />

              <ValidationInput
                id="userId"
                label="아이디"
                type="text"
                value={userId}
                onChange={setUserId}
                placeholder="아이디를 입력해주세요"
                required
                validation={validateUserId}
              />

              {/* 계속 버튼 */}
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
                mt="4"
              >
                {isLoading ? '등록 중...' : '계속'}
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  );
} 