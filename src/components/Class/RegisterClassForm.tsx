import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Text,
  Textarea,
  VStack
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { registerClass } from '../../services/classGiverExploreServices';
import { CommonSelect } from '../Select';

interface RegisterClassFormProps {
  talents: { id: string; name: string }[];
}

const RegisterClassForm: React.FC<RegisterClassFormProps> = ({ talents }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    place: '',
    unavailable: '',
    talentId: '',
    media: null as File | null,
  });
  const [submitting, setSubmitting] = useState(false);
  // const [showTalentSelect, setShowTalentSelect] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleTalentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setForm({ ...form, talentId: e.target.value });
  //   setShowTalentSelect(false);
  // };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, media: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const registerData = {
        title: form.title,
        description: form.description,
        location: form.place,
        time: form.unavailable,
        unavailable: [form.unavailable],
        talentId: form.talentId,
        media_url: form.media ? URL.createObjectURL(form.media) : '',
      };
      
      await registerClass(registerData);
      alert('수업이 성공적으로 등록되었습니다.');
    } catch (error) {
      console.log(error)
      alert('수업 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container 
      bg="white" 
      minH="100vh" 
      maxW="600px"
      px="4"
      style={{ backgroundColor: 'white' }}
    >
      <VStack gap="8" justify="center" minH="100vh">
        {/* 헤더 */}
        <VStack gap="3" textAlign="center" pt="8">
          <Heading size="xl" color="gray.800" fontWeight="bold">
            수업 등록
          </Heading>
          <Text color="gray.600" fontSize="md">
            새로운 수업을 등록해보세요
          </Text>
        </VStack>
        
        {/* 수업 등록 폼 */}
        <Box w="full" p="6">
          <form onSubmit={handleSubmit}>
            <VStack gap="6" w="full">
              {/* 홍보 미디어 */}
              <Box w="full">
                <Text fontWeight="semibold" color="gray.700" mb="2">
                  홍보 영상/사진
                </Text>
                <Input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleMediaChange}
                  border="1px solid"
                  borderColor="gray.300"
                  borderRadius="lg"
                  p="2"
                  w="full"
                  _hover={{ borderColor: "gray.400" }}
                  _focus={{ borderColor: "green.500", boxShadow: "0 0 0 1px #22c55e" }}
                />
                <Text color="gray.500" fontSize="sm" mt="1">
                  수업을 홍보할 영상이나 사진을 업로드해주세요
                </Text>
              </Box>

              {/* 수업명 */}
              <Box w="full">
                <Text fontWeight="semibold" color="gray.700" mb="2">
                  수업명
                </Text>
                <Input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="수업명을 입력하세요"
                  border="1px solid"
                  borderColor="gray.300"
                  borderRadius="lg"
                  h="48px"
                  w="full"
                  _hover={{ borderColor: "gray.400" }}
                  _focus={{ borderColor: "green.500", boxShadow: "0 0 0 1px #22c55e" }}
                />
              </Box>

              {/* 수업 설명 */}
              <Box w="full">
                <Text fontWeight="semibold" color="gray.700" mb="2">
                  수업 설명
                </Text>
                <Textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="수업에 대한 자세한 설명을 입력하세요"
                  border="1px solid"
                  borderColor="gray.300"
                  borderRadius="lg"
                  minH="120px"
                  resize="vertical"
                  w="full"
                  _hover={{ borderColor: "gray.400" }}
                  _focus={{ borderColor: "green.500", boxShadow: "0 0 0 1px #22c55e" }}
                />
              </Box>

              {/* 희망 장소 */}
              <Box w="full">
                <Text fontWeight="semibold" color="gray.700" mb="2">
                  희망 장소
                </Text>
                <Input
                  name="place"
                  value={form.place}
                  onChange={handleChange}
                  placeholder="수업을 진행할 희망 장소"
                  border="1px solid"
                  borderColor="gray.300"
                  borderRadius="lg"
                  h="48px"
                  w="full"
                  _hover={{ borderColor: "gray.400" }}
                  _focus={{ borderColor: "green.500", boxShadow: "0 0 0 1px #22c55e" }}
                />
              </Box>

              {/* 안되는 요일/시간 */}
              <Box w="full">
                <Text fontWeight="semibold" color="gray.700" mb="2">
                  안되는 요일/시간
                </Text>
                <Input
                  name="unavailable"
                  value={form.unavailable}
                  onChange={handleChange}
                  placeholder="예: 월요일 오전, 금요일 오후"
                  border="1px solid"
                  borderColor="gray.300"
                  borderRadius="lg"
                  h="48px"
                  w="full"
                  _hover={{ borderColor: "gray.400" }}
                  _focus={{ borderColor: "green.500", boxShadow: "0 0 0 1px #22c55e" }}
                />
                <Text color="gray.500" fontSize="sm" mt="1">
                  수업을 진행할 수 없는 요일이나 시간을 입력해주세요
                </Text>
              </Box>

              {/* 관련 재능 선택 */}
              <Box w="full">
                <CommonSelect
                  options={talents.map(talent => ({ label: talent.name, value: talent.id }))}
                  value={form.talentId}
                  onChange={(value) => setForm({ ...form, talentId: String(value) })}
                  placeholder="관련 재능을 선택해주세요"
                  label="관련 재능"
                  width="100%"
                />
              </Box>

              {/* 수업 등록 버튼 */}
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
                disabled={submitting}
                mt="4"
              >
                {submitting ? '등록 중...' : '수업 등록'}
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  );
};

export default RegisterClassForm; 