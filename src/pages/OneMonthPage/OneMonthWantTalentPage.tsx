import { Box, Button, Input, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// ValidationInput, ValidationRadio가 필요하다면 아래와 같이 import
// import { ValidationInput, ValidationRadio } from '@/components/Input/ValidationInput';

const mainCategories = [
  { key: '요리', subs: ['한식', '중식', '일식', '양식', '기타'] },
  { key: 'IT', subs: ['스마트폰 사용', '배달앱 사용', '인터넷 뱅킹', '키오스크 사용법', '보이스 피싱', '기타'] },
  { key: '악기', subs: ['피아노', '기타', '드럼', '플루트', '기타'] },
  { key: '운동', subs: ['걷기', '요가', '스트레칭', '탁구', '기타'] },
  { key: '글쓰기', subs: ['일기', '편지', '시', '수필', '기타'] },
  { key: '미술', subs: ['수채화', '색연필화', '캘리그라피', '종이접기', '기타'] },
  { key: '농업', subs: ['텃밭 가꾸기', '화분 관리', '작물 재배', '기타'] },
];

const OneMonthWantTalentPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [checked, setChecked] = useState<string[]>([]);
  const [selectedMain, setSelectedMain] = useState(mainCategories[0].key);

  const handleCheck = (item: string) => {
    setChecked(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/one-month/complete');
  };

  // 검색어로 큰 범주와 세부 재능 모두 필터링
  const filteredMain = mainCategories.filter(cat =>
    cat.key.includes(search) || cat.subs.some(sub => sub.includes(search))
  );
  const selected = filteredMain.find(cat => cat.key === selectedMain) || filteredMain[0];
  const filteredSubs = selected
    ? selected.subs.filter(sub => sub.includes(search))
    : [];

  return (
    <Box minH="100vh" bg="#fff" py={4} px={2} as="form" onSubmit={handleSubmit} w="100%" maxW="480px" mx="auto">
      <Text fontWeight="bold" fontSize="xl" mb={2} textAlign="center">
        배우고 싶은 재능 등록
      </Text>
      <Text fontSize="md" color="gray.600" mb={4} textAlign="center">
        한달 동안 배우고 싶은 재능을 등록해주세요
      </Text>
      <Input placeholder="빠르게 찾기" value={search} onChange={e => setSearch(e.target.value)} bg="white" mb={4} maxW="90%" mx="auto" display="block" />
      <Box display="flex" justifyContent="center" alignItems="flex-start" gap={8} w="100%" maxW="400px" mx="auto" mt={8}>
        {/* 왼쪽: 카테고리 버튼 */}
        <Box display="flex" flexDirection="column" gap={0} w="120px">
          {filteredMain.map(cat => (
            <Button
              key={cat.key}
              variant="ghost"
              justifyContent="flex-start"
              bg={selectedMain === cat.key ? 'gray.100' : 'transparent'}
              fontWeight={selectedMain === cat.key ? 'bold' : 'normal'}
              color="black"
              borderRadius="md"
              h="40px"
              px={4}
              onClick={() => setSelectedMain(cat.key)}
              _hover={{ bg: 'gray.200' }}
            >
              {cat.key}
            </Button>
          ))}
        </Box>
        {/* 오른쪽: 서브카테고리 + 체크박스 */}
        <Box display="flex" flexDirection="column" gap={0} w="140px">
          {filteredSubs.length ? (
            filteredSubs.map(sub => (
              <Box key={sub} display="flex" alignItems="center" h="40px" px={2}>
                <span style={{ flex: 1 }}>{sub}</span>
                <input
                  type="checkbox"
                  checked={checked.includes(sub)}
                  onChange={() => handleCheck(sub)}
                  style={{ accentColor: '#7AC47F', width: 18, height: 18 }}
                />
              </Box>
            ))
          ) : (
            <Box color="gray.400" h="40px" px={4} display="flex" alignItems="center">
              세부 재능 없음
            </Box>
          )}
        </Box>
      </Box>
      <Button
        type="submit"
        bg="#DFF5DF"
        color="#226B3A"
        size="lg"
        mt={8}
        borderRadius="2xl"
        w="90%"
        mx="auto"
        display="block"
        fontWeight="bold"
        fontSize="lg"
        _hover={{ bg: '#c8eac8' }}
      >
        등록하기
      </Button>
    </Box>
  );
};

export default OneMonthWantTalentPage; 