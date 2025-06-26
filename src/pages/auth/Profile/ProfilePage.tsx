import { addressAtom, bioAtom, genderAtom, profileImageAtom, usernameAtom } from '@/atoms/registerAtoms';
import { ProfileImageUpload } from '@/components/ImageUpload';
import { ValidationInput, ValidationRadio } from '@/components/Input';
import { useRegisterFlow } from '@/hooks/auth/useRegisterFlow';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useState } from 'react';

export function ProfilePage() {
  const { proceedToTalentRegistration } = useRegisterFlow();
  
  // 조타이 atom 직접 사용
  const [gender, setGender] = useAtom(genderAtom);
  const [address, setAddress] = useAtom(addressAtom);
  const [bio, setBio] = useAtom(bioAtom);
  const [username, setUsername] = useAtom(usernameAtom);
  const [profileImage, setProfileImage] = useAtom(profileImageAtom);

  // 로딩 상태 (이미지 업로드용)
  const [isUploading, setIsUploading] = useState(false);

  const validateUserId = (value: string) => {
    if (!value) return undefined;
    if (value.length < 3) return '아이디는 3자 이상이어야 합니다';
    if (!/^[a-zA-Z0-9_]+$/.test(value)) return '영문, 숫자, 언더스코어만 사용 가능합니다';
    return undefined;
  };

  // 이미지 업로드 핸들러 (Cloudinary 업로드 완료 후 호출)
  const handleImageUpload = async (imageUrl: string | null) => {
    if (imageUrl) {
      setIsUploading(true);
      try {
        // Cloudinary 업로드는 ProfileImageUpload 컴포넌트에서 처리됨
        // 여기서는 결과 URL만 atom에 저장
        setProfileImage(imageUrl);
        console.log('프로필 이미지 URL 저장:', imageUrl);
      } catch (error) {
        console.error('이미지 저장 실패:', error);
        alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
      } finally {
        setIsUploading(false);
      }
    } else {
      // 이미지 삭제
      setProfileImage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!gender || !address || !bio || !username) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    if (isUploading) {
      alert('이미지 업로드 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    console.log('현재 프로필 데이터:', {
      gender,
      address,
      bio,
      username,
      profileImage
    });

    // 조타이 atom에 이미 저장되어 있으므로 바로 다음 페이지로
    proceedToTalentRegistration();
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
        <VStack gap="3" textAlign="center">
          <Heading size="xl" color="gray.800" fontWeight="bold">
            프로필
          </Heading>
        </VStack>
        
        <VStack gap="2" textAlign="center" px="4">
          <Text fontSize="lg" fontWeight="semibold" color="gray.800">
            프로필을 완성해주세요!
          </Text>
          <Text fontSize="sm" color="gray.600" lineHeight="1.5">
            학습을 효과적으로 입력받을 수 있도록 자세히 작성하고
            <br />
            서비스 내 노출 빈도도 증가합니다.
          </Text>
        </VStack>
        
        <Box w="full" p="6">
          <form onSubmit={handleSubmit}>
            <VStack gap="6">
              {/* 프로필 이미지 업로드 - Cloudinary 자동 업로드 */}
              <VStack gap="2" w="full">
                <ProfileImageUpload
                  value={profileImage || null}
                  onChange={handleImageUpload}
                  size="96px"
                  disabled={isUploading}
                />
                {isUploading && (
                  <Text fontSize="xs" color="gray.500">
                    이미지 업로드 중...
                  </Text>
                )}
                {profileImage && (
                  <Text fontSize="xs" color="green.600">
                    이미지가 업로드되었습니다
                  </Text>
                )}
              </VStack>

              <ValidationRadio
                label="성별"
                name="gender"
                options={[
                  { value: '남성', label: '남성' },
                  { value: '여성', label: '여성' }
                ]}
                value={gender}
                onChange={(value) => setGender(value as '남성' | '여성')}
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
                id="bio"
                label="한줄 소개"
                type="text"
                value={bio}
                onChange={setBio}
                placeholder="자신을 소개해주세요"
                required
              />

              <ValidationInput
                id="username"
                label="아이디"
                type="text"
                value={username}
                onChange={setUsername}
                placeholder="아이디를 입력해주세요"
                required
                validation={validateUserId}
              />

              <Button
                type="submit"
                bg="green.500"
                color="white"
                disabled={isUploading}
                w="full"
                h="48px"
                fontSize="md"
                fontWeight="semibold"
                borderRadius="lg"
                _hover={!isUploading ? { 
                  bg: "green.600",
                  transform: "translateY(-1px)", 
                  boxShadow: "lg" 
                } : {}}
                _disabled={{
                  bg: "gray.300",
                  color: "gray.500",
                  cursor: "not-allowed"
                }}
                transition="all 0.2s"
                mt="4"
              >
                {isUploading ? '업로드 중...' : '계속'}
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  );
} 