import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Input,
  Text,
  VStack
} from '@chakra-ui/react';
import { IoArrowBack, IoSearch } from 'react-icons/io5';
import { useTalentSelection } from '../../hooks/useTalentSelection';
import type { SelectedTalent } from '../../services/talentTypes';

interface TalentSelectorProps {
  onConfirm: (talents: SelectedTalent[]) => void;
  onCancel: () => void;
}

export const TalentSelector = ({ 
  onConfirm, 
  onCancel
}: TalentSelectorProps) => {
  const {
    selectedCategory,
    searchTerm,
    filteredSubCategories,
    categories,
    selectCategory,
    setSearchTerm,
    toggleTalent,
    isTalentSelected,
    getSelectedTalents,
  } = useTalentSelection();

  // 초기 선택된 재능들 설정 (실제로는 useEffect로 처리)
  // useEffect(() => {
  //   if (initialSelectedTalents.length > 0) {
  //     // 초기값 설정 로직
  //   }
  // }, [initialSelectedTalents]);

  const handleConfirm = () => {
    const selectedTalents = getSelectedTalents();
    onConfirm(selectedTalents);
  };

  return (
    <Container 
      bg="white" 
      minH="100vh" 
      maxW="480px" 
      px="4"
      style={{ backgroundColor: 'white' }}
    >
      <VStack gap="0" minH="100vh">
        {/* 헤더 */}
        <Box w="full" py="4" borderBottom="1px solid" borderColor="gray.100">
          <HStack justify="space-between" align="center">
            <IconButton
              aria-label="뒤로가기"
              variant="ghost"
              size="lg"
              onClick={onCancel}
              color="gray.600"
            >
              <IoArrowBack />
            </IconButton>
            <Text fontSize="lg" fontWeight="bold" color="gray.800">
              재능 선택
            </Text>
            <Box w="40px" />
          </HStack>
        </Box>

        {/* 검색 입력 */}
        <Box w="full" p="4" bg="gray.50">
          <Box position="relative">
            <Input
              placeholder="빠르게 찾기"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              bg="white"
              borderRadius="full"
              border="1px solid"
              borderColor="gray.200"
              pl="12"
              _focus={{
                borderColor: "green.400",
                boxShadow: "0 0 0 1px #38A169"
              }}
            />
            <Box
              position="absolute"
              left="4"
              top="50%"
              transform="translateY(-50%)"
              color="gray.400"
            >
              <IoSearch />
            </Box>
          </Box>
        </Box>

        {/* 메인 콘텐츠 */}
        <Grid templateColumns="1fr 1fr" flex="1" w="full" minH="0">
          {/* 왼쪽: 카테고리 목록 */}
          <GridItem bg="gray.50" overflowY="auto">
            <VStack gap="0" align="stretch">
              {categories.map((category) => (
                <Box
                  key={category.id}
                  p="4"
                  cursor="pointer"
                  bg={selectedCategory === category.id ? "white" : "transparent"}
                  borderRight={selectedCategory === category.id ? "3px solid" : "none"}
                  borderRightColor="green.400"
                  onClick={() => selectCategory(category.id)}
                  _hover={{ bg: "gray.100" }}
                  transition="all 0.2s"
                >
                  <Text 
                    fontSize="sm" 
                    color={selectedCategory === category.id ? "green.600" : "gray.700"}
                    fontWeight={selectedCategory === category.id ? "bold" : "normal"}
                  >
                    {category.name}
                  </Text>
                </Box>
              ))}
            </VStack>
          </GridItem>

          {/* 오른쪽: 하위 카테고리 목록 */}
          <GridItem bg="white" overflowY="auto">
            <VStack gap="0" align="stretch" p="2">
              {filteredSubCategories.map((subCategory) => (
                <HStack
                  key={subCategory.id}
                  p="3"
                  cursor="pointer"
                  onClick={() => toggleTalent(subCategory)}
                  _hover={{ bg: "gray.50" }}
                  justify="space-between"
                  borderRadius="md"
                >
                  <Text fontSize="sm" color="gray.700" flex="1">
                    {subCategory.name}
                  </Text>
                  <Box
                    w="20px"
                    h="20px"
                    border="2px solid"
                    borderColor={isTalentSelected(subCategory.id) ? "green.400" : "gray.300"}
                    borderRadius="md"
                    bg={isTalentSelected(subCategory.id) ? "green.400" : "white"}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    _hover={{
                      borderColor: isTalentSelected(subCategory.id) ? "green.500" : "gray.400"
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTalent(subCategory);
                    }}
                  >
                    {isTalentSelected(subCategory.id) && (
                      <Text color="white" fontSize="xs" fontWeight="bold">✓</Text>
                    )}
                  </Box>
                </HStack>
              ))}
              
              {!searchTerm && selectedCategory && filteredSubCategories.length === 0 && (
                <Box p="8" textAlign="center">
                  <Text fontSize="sm" color="gray.400">
                    항목이 없습니다
                  </Text>
                </Box>
              )}
              
              {searchTerm && filteredSubCategories.length === 0 && (
                <Box p="8" textAlign="center">
                  <Text fontSize="sm" color="gray.400">
                    검색 결과가 없습니다
                  </Text>
                </Box>
              )}
              
              {!selectedCategory && !searchTerm && (
                <Box p="8" textAlign="center">
                  <Text fontSize="sm" color="gray.400">
                    카테고리를 선택해주세요
                  </Text>
                </Box>
              )}
            </VStack>
          </GridItem>
        </Grid>

        {/* 하단 버튼 */}
        <Box w="full" p="4" borderTop="1px solid" borderColor="gray.100">
          <Button
            onClick={handleConfirm}
            bg="green.400"
            color="white"
            w="full"
            h="48px"
            fontSize="md"
            fontWeight="semibold"
            borderRadius="full"
            _hover={{ 
              bg: "green.500",
              transform: "translateY(-1px)", 
              boxShadow: "lg" 
            }}
            transition="all 0.2s"
            disabled={getSelectedTalents().length === 0}
          >
            등록하기 ({getSelectedTalents().length})
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default TalentSelector;