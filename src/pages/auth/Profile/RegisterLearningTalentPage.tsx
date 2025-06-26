import { wantTalentsAtom } from '@/atoms/registerAtoms';
import { useRegisterFlow } from '@/hooks/auth/useRegisterFlow';
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
import { useAtom } from 'jotai';
import { useState } from 'react';
import { IoAdd, IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { CommonModal } from '../../../components/Modal/CommonModal';
import TalentSelector from '../../../components/TalentSelector/TalentSelector';
import type { SelectedTalent } from '../../../services/talentTypes';

export const RegisterLearningTalentPage = () => {
  const navigate = useNavigate();
  const { completeRegistration, isLoading } = useRegisterFlow();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // jotai atom에서 현재 선택된 재능들 가져오기
  const [selectedTalentNames, setSelectedTalentNames] = useAtom(wantTalentsAtom);
  
  // UI용 상태 (TalentSelector에서 사용)
  const [talents, setTalents] = useState<SelectedTalent[]>([]);
  const [showTalentSelector, setShowTalentSelector] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddTalent = () => {
    setShowTalentSelector(true);
  };

  const handleTalentConfirm = (selectedTalents: SelectedTalent[]) => {
    // 중복 제거하면서 새로운 재능들 추가
    setTalents(prev => {
      const existingIds = prev.map(t => t.id);
      const newTalents = selectedTalents.filter(t => !existingIds.includes(t.id));
      return [...prev, ...newTalents];
    });
    
    // jotai atom 업데이트 (재능 이름들만 저장)
    const updatedTalentNames = [...selectedTalentNames];
    selectedTalents.forEach(talent => {
      if (!updatedTalentNames.includes(talent.name)) {
        updatedTalentNames.push(talent.name);
      }
    });
    setSelectedTalentNames(updatedTalentNames);
    
    setShowTalentSelector(false);
  };

  const handleTalentCancel = () => {
    setShowTalentSelector(false);
  };

  const removeTalent = (talentId: string, talentName: string) => {
    // UI 상태에서 제거
    setTalents(prev => prev.filter(t => t.id !== talentId));
    
    // jotai atom에서 제거
    setSelectedTalentNames(prev => prev.filter(name => name !== talentName));
  };

  const handleContinue = () => {
    console.log('최종 회원가입 데이터 전송:', selectedTalentNames);
    completeRegistration(selectedTalentNames);
  };

  const handleModalComplete = () => {
    onClose();
    navigate('/');
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
              <Box w="40px" />
            </HStack>
          </Box>
          
          {/* 메인 컨텐츠 */}
          <VStack gap="6" flex="1" justify="flex-start" w="full" px="2">
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
              {selectedTalentNames.length === 0 ? (
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
                  {selectedTalentNames.map((talentName, index) => (
                    <HStack
                      key={`${talentName}-${index}`}
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
                          {talentName}
                        </Text>
                      </VStack>
                      <IconButton
                        aria-label="재능 삭제"
                        size="sm"
                        variant="ghost"
                        color="gray.400"
                        onClick={() => removeTalent(`talent-${index}`, talentName)}
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
            
            <Button
              onClick={handleContinue}
              disabled={selectedTalentNames.length === 0 || isLoading}
              loading={isLoading}
              bg={selectedTalentNames.length > 0 && !isLoading ? "green.400" : "gray.300"}
              color="white"
              w="full"
              h="48px"
              fontSize="md"
              fontWeight="semibold"
              borderRadius="full"
              _hover={selectedTalentNames.length > 0 && !isLoading ? { 
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
              {isLoading ? '가입 중...' : '완료'}
            </Button>
          </VStack>
        </VStack>
      </Container>

      {/* 성공 모달 */}
      <CommonModal isOpen={isOpen} onClose={onClose}>
        <VStack gap="4" textAlign="center">
          <Heading size="md" color="gray.800">
            회원가입 완료!
          </Heading>
          <Text fontSize="sm" color="gray.600">
            성공적으로 가입되었습니다.
          </Text>
          <Button onClick={handleModalComplete} bg="green.500" color="white" w="full">
            확인
          </Button>
        </VStack>
      </CommonModal>
    </>
  );
};

export default RegisterLearningTalentPage;