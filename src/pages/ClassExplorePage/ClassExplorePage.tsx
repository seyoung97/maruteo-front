import { TALENT_CATEGORIES } from '@/data/talentData';
import { Box, Button, HStack, Input, InputGroup, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClassExplorePage = () => {
  const [selectedMain, setSelectedMain] = useState(TALENT_CATEGORIES[0].name);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // 검색어로 큰 범주와 세부 재능 모두 필터링
  const filteredMain = TALENT_CATEGORIES.filter(cat =>
    cat.id.includes(search) || cat.subCategories.some(sub => sub.id.includes(search))
  );
  const selected = filteredMain.find(cat => cat.name === selectedMain) || filteredMain[0];
  const filteredSubs = selected
    ? selected.subCategories.filter(sub => sub.id.includes(search))
    : [];

  return (
    <Box bg="#fff" px={2}>
      {/* 검색창 */}
      <InputGroup mb={2} w="100%">
        <Input
          placeholder="빠르게 찾기"
          value={search}
          onChange={e => setSearch(e.target.value)}
          bg="#d6f5d6"
          borderRadius="full"
          fontWeight="bold"
          fontSize="md"
          h="40px"
          pl={4}
          _placeholder={{ color: 'green.700', fontWeight: 'bold' }}
        />
      </InputGroup>
      {/* 2단 컬럼: 좌측 큰 범주, 우측 세부 재능 */}
      <HStack align="start" gap={4} w="100%" maxW="400px" mx="auto" mt={2}>
        {/* 왼쪽: 큰 범주 */}
        <VStack align="stretch" gap={0} w="120px">
          {filteredMain.map(cat => (
            <Button
              key={cat.id}
              variant="ghost"
              justifyContent="flex-start"
              bg={selectedMain === cat.name ? 'gray.100' : 'transparent'}
              fontWeight={selectedMain === cat.name ? 'bold' : 'normal'}
              color="black"
              borderRadius="md"
              h="32px"
              px={3}
              onClick={() => setSelectedMain(cat.name)}
              _hover={{ bg: 'gray.200' }}
            >
              {cat.name}
            </Button>
          ))}
        </VStack>
        {/* 오른쪽: 세부 재능 */}
        <VStack align="stretch" gap={0} w="120px">
          {filteredSubs.length ? (
            filteredSubs.map(sub => (
              <Button
                key={sub.id}
                variant="ghost"
                justifyContent="flex-start"
                color="black"
                borderRadius="md"
                h="32px"
                px={3}
                onClick={() => navigate(`/class-explore/${sub.id}`)}
                _hover={{ bg: 'gray.100' }}
              >
                {sub.name}
              </Button>
            ))
          ) : (
            <Box color="gray.400" h="32px" px={3} display="flex" alignItems="center">
              세부 재능 없음
            </Box>
          )}
        </VStack>
      </HStack>
    </Box>
  );
};

export default ClassExplorePage; 