import { haveTalentsAtom } from '@/atoms/registerAtoms';
import { useRegisterFlow } from '@/hooks/auth/useRegisterFlow';
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  IconButton,
  Text,
  VStack
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { IoAdd, IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import TalentSelector from '../../../components/TalentSelector/TalentSelector';
import type { SelectedTalent } from '../../../services/talentTypes';

export const RegisterTalentPage = () => {
  const navigate = useNavigate();
  const { proceedToLearningTalentRegistration } = useRegisterFlow();
  
  // jotai atom에서 현재 선택된 재능들 가져오기
  const [selectedTalentNames, setSelectedTalentNames] = useAtom(haveTalentsAtom);
  
  // UI용 상태
  const [showTalentSelector, setShowTalentSelector] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddTalent = () => {
    setShowTalentSelector(true);
  };

  const handleTalentConfirm = (selectedTalents: SelectedTalent[]) => {
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

  const removeTalent = (talentName: string) => {
    // jotai atom에서 제거
    setSelectedTalentNames(prev => prev.filter(name => name !== talentName));
  };

  const handleContinue = () => {
    proceedToLearningTalentRegistration(selectedTalentNames);
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
              재능 등록
            </Heading>
            <Text fontSize="md" color="gray.600" alignSelf="flex-start">
              기부할 재능을 등록해 주세요
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
                <Text fontSize="sm">등록된 재능이 없습니다</Text>
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
                      onClick={() => removeTalent(talentName)}
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
            disabled={selectedTalentNames.length === 0}
            bg={selectedTalentNames.length > 0 ? "green.400" : "gray.300"}
            color="white"
            w="full"
            h="48px"
            fontSize="md"
            fontWeight="semibold"
            borderRadius="full"
            _hover={selectedTalentNames.length > 0 ? { 
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
            계속
          </Button>
        </VStack>
      </VStack>
    </Container>
  );
};

export default RegisterTalentPage;