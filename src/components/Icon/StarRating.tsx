import { HStack, Box } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

interface StarRatingProps {
  value: number; // 별점 값 (예: 3.5)
  max?: number; // 최대 별 개수 (기본 5)
  size?: string | number; // 아이콘 크기
}

const StarRating = ({ value, max = 5, size = '1.25em' }: StarRatingProps) => {
  return (
    <HStack gap={0.5}>
      {Array.from({ length: max }).map((_, i) => {
        const filled = value >= i + 1;
        const half = !filled && value > i && value < i + 1;
        return (
          <Box
            key={i}
            color={filled || half ? 'yellow.400' : 'gray.300'}
            width={size}
            height={size}
            opacity={half ? 0.5 : 1}
          >
            <FaStar size="100%" />
          </Box>
        );
      })}
    </HStack>
  );
};

export default StarRating; 