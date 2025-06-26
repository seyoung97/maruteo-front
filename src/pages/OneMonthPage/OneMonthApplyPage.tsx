import { ValidationInput } from '@/components/Input/ValidationInput';
import { ValidationRadio } from '@/components/Input/ValidationRadio';
import { ProfileImageUpload } from '@/components/ImageUpload/ProfileImageUpload';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OneMonthApplyPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    gender: '',
    phone: '',
    birth: '',
    startDate: '',
  });

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/one-month/talent');
    }, 500);
  };

  return (
    <Container bg="white" maxW="480px" px="4">
      <VStack gap="4" justify="flex-start" align="stretch">
        {/* 헤더 */}
        <VStack gap="2" textAlign="center" mt={4}>
          <Heading size="lg" color="green.500" fontWeight="bold">
            신청하기
          </Heading>
        </VStack>
        {/* 안내 텍스트 */}
        <VStack gap="1" textAlign="center" px="4">
          <Text fontSize="lg" fontWeight="semibold" color="gray.800">
            한 달 살이 신청 정보를 입력해주세요
          </Text>
        </VStack>
        {/* 신청 폼 */}
        <Box w="full" p="2">
          <form onSubmit={handleSubmit}>
            <VStack gap="3">
              <ProfileImageUpload
                value={profileImage}
                onChange={setProfileImage}
                size="72px"
              />
              <ValidationInput
                id="name"
                label="이름"
                type="text"
                value={form.name}
                onChange={v => handleChange('name', v)}
                placeholder="이름을 입력해주세요"
                required
              />
              <ValidationRadio
                label="성별"
                name="gender"
                options={[
                  { value: '남', label: '남' },
                  { value: '여', label: '여' }
                ]}
                value={form.gender}
                onChange={v => handleChange('gender', v)}
                required
              />
              <ValidationInput
                id="phone"
                label="연락처"
                type="text"
                value={form.phone}
                onChange={v => handleChange('phone', v)}
                placeholder="연락처를 입력해주세요"
                required
              />
              <ValidationInput
                id="birth"
                label="생년월일"
                type="text"
                value={form.birth}
                onChange={v => handleChange('birth', v)}
                placeholder="YYYY-MM-DD"
                required
              />
              <ValidationInput
                id="startDate"
                label="참여 시작일"
                type="text"
                value={form.startDate}
                onChange={v => handleChange('startDate', v)}
                placeholder="YYYY-MM-DD"
                required
              />
              <Button
                type="submit"
                bg="#DFF5DF"
                color="#226B3A"
                loading={isLoading}
                w="full"
                h="44px"
                fontSize="md"
                fontWeight="bold"
                borderRadius="2xl"
                _hover={{ bg: '#c8eac8' }}
                transition="all 0.2s"
                mt="2"
              >
                계속
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  );
};

export default OneMonthApplyPage; 