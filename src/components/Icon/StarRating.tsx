import { Box, HStack } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

interface StarRatingProps {
  value: number; // 별점 값 (예: 3.5)
  max?: number; // 최대 별 개수 (기본 5)
  size?: string | number; // 아이콘 크기
}

const StarRating = ({ value, max = 5, size = '1.25em' }: StarRatingProps) => {
  return (
    <Box position="relative" width="fit-content">
      {/* 연한 별들 (기본 배경) */}
      <HStack gap={0.5} position="absolute" top={0} left={0}>
        {Array.from({ length: max }).map((_, i) => (
          <Box
            key={`bg-${i}`}
            color="gray.200"
            width={size}
            height={size}
          >
            <FaStar size="100%" />
          </Box>
        ))}
      </HStack>
      
      {/* 진한 별들 (별점에 맞게) */}
      <HStack gap={0.5} position="relative" zIndex={1}>
        {Array.from({ length: max }).map((_, i) => {
          const filled = value >= i + 1;
          const half = !filled && value > i && value < i + 1;
          return (
            <Box
              key={`fg-${i}`}
              color={filled || half ? 'yellow.400' : 'transparent'}
              width={size}
              height={size}
              opacity={half ? 0.5 : 1}
            >
              <FaStar size="100%" />
            </Box>
          );
        })}
      </HStack>
    </Box>
  );
};

export default StarRating; 