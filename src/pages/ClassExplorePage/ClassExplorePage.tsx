import { Box, VStack, Button, HStack, Input, InputGroup } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mainCategories = [
  { key: '요리', subs: ['한식', '중식', '일식', '양식', '기타'] },
  { key: 'IT', subs: ['스마트폰 사용', '배달앱 사용', '인터넷 뱅킹', '키오스크 사용법', '보이스 피싱', '기타'] },
  { key: '악기', subs: ['피아노', '기타', '드럼', '플루트', '기타'] },
  { key: '운동', subs: ['걷기', '요가', '스트레칭', '탁구', '기타'] },
  { key: '글쓰기', subs: ['일기', '편지', '시', '수필', '기타'] },
  { key: '미술', subs: ['수채화', '색연필화', '캘리그라피', '종이접기', '기타'] },
  { key: '농업', subs: ['텃밭 가꾸기', '화분 관리', '작물 재배', '기타'] },
];

const ClassExplorePage = () => {
  const [selectedMain, setSelectedMain] = useState(mainCategories[0].key);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // 검색어로 큰 범주와 세부 재능 모두 필터링
  const filteredMain = mainCategories.filter(cat =>
    cat.key.includes(search) || cat.subs.some(sub => sub.includes(search))
  );
  const selected = filteredMain.find(cat => cat.key === selectedMain) || filteredMain[0];
  const filteredSubs = selected
    ? selected.subs.filter(sub => sub.includes(search))
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
              key={cat.key}
              variant="ghost"
              justifyContent="flex-start"
              bg={selectedMain === cat.key ? 'gray.100' : 'transparent'}
              fontWeight={selectedMain === cat.key ? 'bold' : 'normal'}
              color="black"
              borderRadius="md"
              h="32px"
              px={3}
              onClick={() => setSelectedMain(cat.key)}
              _hover={{ bg: 'gray.200' }}
            >
              {cat.key}
            </Button>
          ))}
        </VStack>
        {/* 오른쪽: 세부 재능 */}
        <VStack align="stretch" gap={0} w="120px">
          {filteredSubs.length ? (
            filteredSubs.map(sub => (
              <Button
                key={sub}
                variant="ghost"
                justifyContent="flex-start"
                color="black"
                borderRadius="md"
                h="32px"
                px={3}
                onClick={() => navigate(`/class-explore/${sub}`)}
                _hover={{ bg: 'gray.100' }}
              >
                {sub}
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