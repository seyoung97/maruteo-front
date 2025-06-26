import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  IconButton,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import { useState } from 'react';
import { IoAdd, IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { CommonModal } from '../../../components/Modal/CommonModal';
import TalentSelector from '../../../components/TalentSelector/TalentSelector';
import type { SelectedTalent } from '../../../services/talentTypes';

export const RegisterLearningTalentPage = () => {
  const navigate = useNavigate();
  const [talents, setTalents] = useState<SelectedTalent[]>([]);
  const [showTalentSelector, setShowTalentSelector] = useState(false);
  const {open,  onOpen, onClose } = useDisclosure();

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddTalent = () => {
    setShowTalentSelector(true);
  };

  const handleTalentConfirm = (selectedTalents: SelectedTalent[]) => {
    setTalents(prev => {
      // 중복 제거하면서 새로운 재능들 추가
      const existingIds = prev.map(t => t.id);
      const newTalents = selectedTalents.filter(t => !existingIds.includes(t.id));
      return [...prev, ...newTalents];
    });
    setShowTalentSelector(false);
  };

  const handleTalentCancel = () => {
    setShowTalentSelector(false);
  };

  const removeTalent = (talentId: string) => {
    setTalents(prev => prev.filter(t => t.id !== talentId));
  };

  const handleContinue = () => {
    console.log('배우고 싶은 재능:', talents);
    onOpen(); // 모달 열기
  };

  const handleModalComplete = () => {
    onClose();
    // 모달 닫은 후 다음 페이지로 이동하거나 원하는 동작 수행
    navigate('/'); // 홈으로 이동하거나 원하는 페이지로 변경
  };

  // 재능 선택기가 열려있으면 해당 컴포넌트 렌더링
  if (showTalentSelector) {
    return (
      <TalentSelector
        onConfirm={handleTalentConfirm}
        onCancel={handleTalentCancel}
      />
    );
  }

  return (
    <>
      <Container 
        bg="white" 
        minH="100vh" 
        maxW="480px" 
        px="4"
        style={{ backgroundColor: 'white' }}
      >
        <VStack gap="6" minH="100vh" py="4">
          {/* 헤더 */}
          <Box w="full" position="relative" py="3">
            <HStack justify="space-between" align="center">
              <IconButton
                aria-label="뒤로가기"
                variant="ghost"
                size="lg"
                onClick={handleBack}
                color="gray.600"
              >
                <IoArrowBack />
              </IconButton>
              <Heading size="lg" color="gray.800" fontWeight="bold">
                프로필
              </Heading>
              <Box w="40px" /> {/* 우측 공간 확보 */}
            </HStack>
          </Box>
          
          {/* 메인 컨텐츠 */}
          <VStack gap="6" flex="1" justify="flex-start" w="full" px="2">
            {/* 제목 */}
            <VStack gap="3" textAlign="left" w="full">
              <Heading size="lg" color="gray.800" fontWeight="bold" alignSelf="flex-start">
                배우고 싶은 재능 등록
              </Heading>
              <Text fontSize="md" color="gray.600" alignSelf="flex-start">
                배우고 싶은 재능을 등록해 주세요
              </Text>
            </VStack>
            
            {/* 재능 목록 */}
            <Box w="full" flex="1" minH="300px">
              {talents.length === 0 ? (
                <Box 
                  w="full" 
                  h="200px" 
                  display="flex" 
                  alignItems="center" 
                  justifyContent="center"
                  color="gray.400"
                >
                  <Text fontSize="sm">배우려는 재능이 없습니다</Text>
                </Box>
              ) : (
                <VStack gap="3" w="full">
                  {talents.map((talent) => (
                    <HStack
                      key={talent.id}
                      w="full"
                      p="4"
                      bg="gray.50"
                      borderRadius="lg"
                      border="1px solid"
                      borderColor="gray.200"
                      justify="space-between"
                    >
                      <VStack align="start" gap="1">
                        <Text fontSize="md" color="gray.800" fontWeight="medium">
                          {talent.name}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          {talent.categoryName}
                        </Text>
                      </VStack>
                      <IconButton
                        aria-label="재능 삭제"
                        size="sm"
                        variant="ghost"
                        color="gray.400"
                        onClick={() => removeTalent(talent.id)}
                      >
                        ×
                      </IconButton>
                    </HStack>
                  ))}
                </VStack>
              )}
            </Box>
          </VStack>
          
          {/* 버튼 영역 */}
          <VStack w="full" px="2" pb="4" gap="3">
            {/* 재능 추가 버튼 */}
            <Button
              onClick={handleAddTalent}
              bg="white"
              color="green.500"
              border="2px solid"
              borderColor="green.500"
              w="full"
              h="48px"
              fontSize="md"
              fontWeight="semibold"
              borderRadius="full"
              _hover={{ 
                bg: "green.50",
                transform: "translateY(-1px)", 
                boxShadow: "lg" 
              }}
              transition="all 0.2s"
            >
              <HStack gap="2">
                <IoAdd />
                <Text>재능 추가</Text>
              </HStack>
            </Button>
            
            {/* 완료 버튼 */}
            <Button
              onClick={handleContinue}
              disabled={talents.length === 0}
              bg={talents.length > 0 ? "green.400" : "gray.300"}
              color="white"
              w="full"
              h="48px"
              fontSize="md"
              fontWeight="semibold"
              borderRadius="full"
              _hover={talents.length > 0 ? { 
                bg: "green.500",
                transform: "translateY(-1px)", 
                boxShadow: "lg" 
              } : {}}
              _disabled={{
                bg: "gray.300",
                color: "gray.500",
                cursor: "not-allowed"
              }}
              transition="all 0.2s"
            >
              완료
            </Button>
          </VStack>
        </VStack>
      </Container>

      {/* 성공 모달 */}
      <CommonModal
        isOpen={open}
        onClose={handleModalComplete}
        confirmText="완료"
        showCancel={false}
        onConfirm={handleModalComplete}
      >
        <VStack align="center" gap="6" py="4">
          <Box 
            w="80px" 
            h="80px" 
            bg="green.500" 
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box fontSize="40px" color="white">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </Box>
          </Box>
          <VStack gap="2" textAlign="center">
            <Text fontSize="xl" fontWeight="bold" color="gray.800">
              회원가입이
            </Text>
            <Text fontSize="xl" fontWeight="bold" color="gray.800">
              완료되었습니다!
            </Text>
          </VStack>
        </VStack>
      </CommonModal>
    </>
  );
};

export default RegisterLearningTalentPage;