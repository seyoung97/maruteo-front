import { Box } from '@chakra-ui/react';

interface CustomBadgeProps {
  type: 'youth' | 'senior' | 'excellent';
  children?: React.ReactNode;
  fontSize?: string;
}

export function CustomBadge({ type, children, fontSize }: CustomBadgeProps) {
  if (type === 'excellent') {
    return (
      <Box
        as="span"
        bg="#FFE066" // 금색/노랑
        color="#B8860B"
        borderRadius="md"
        px={3}
        py={1}
        fontWeight="bold"
        fontSize={fontSize || 'xs'}
        display="inline-block"
        border="2px solid #FFD700"
        mr={2}
        letterSpacing="-0.5px"
      >
        🏅 {children || '우수 기부자'}
      </Box>
    );
  }
  if (type === 'youth') {
    return (
      <Box
        as="span"
        bg="#4ADE80" // 밝은 초록
        color="#166534"
        borderRadius="full"
        px={2}
        py={1}
        fontWeight="bold"
        fontSize={fontSize || '2xs'}
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        boxShadow="sm"
        letterSpacing="-0.5px"
        lineHeight="normal"
        minHeight="2em"
      >
        🧑‍🎓 {children || '청년 기부자'}
      </Box>
    );
  }
  if (type === 'senior') {
    return (
      <Box
        as="span"
        bg="#F97316" // 진한 주황
        color="white"
        borderRadius="full"
        px={2}
        py={0.5}
        fontWeight="bold"
        fontSize={fontSize || '2xs'}
        display="inline-block"
        boxShadow="sm"
        mr={2}
        letterSpacing="-0.5px"
      >
        👴 {children || '어르신 기부자'}
      </Box>
    );
  }
  return null;
}

export default CustomBadge; 