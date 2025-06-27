import { Badge, Box, Flex, HStack, Image, Text } from '@chakra-ui/react';
import { GarlicIcon, StarRating } from '../Icon';
import { CustomBadge } from '../ui/Badge';

interface CommonCardProps {
  thumbnail: string;
  title: string;
  subtitle?: string;
  garlicCount?: number;
  rating?: number;
  badgeText?: string;
  onClick?: () => void;
  isExcellentBadge?: boolean;
  type?: string;
}

const CommonCard = ({
  thumbnail,
  title,
  subtitle,
  garlicCount,
  rating,
  badgeText,
  onClick,
  isExcellentBadge,
  type,
}: CommonCardProps) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow="sm"
      cursor={onClick ? 'pointer' : 'default'}
      _hover={onClick ? { boxShadow: 'md' } : undefined}
      onClick={onClick}
      p={3}
      w="full"
      position="relative"
    >
      <Box position="relative" mb={3}>
        <Image src={thumbnail} alt={title} borderRadius="md" w="100%" h="160px" objectFit="cover" />
        {isExcellentBadge && (
          <Box position="absolute" top={2} left={2} zIndex={1}>
            <CustomBadge type="excellent" />
          </Box>
        )}
      </Box>
      <Flex align="center" mb={1} gap={2}>
        <Text fontWeight="bold" fontSize="lg" isTruncated>{title}</Text>
        {((badgeText === '청년기부자' || type === 'youth') && <CustomBadge type="youth" />)}
        {((badgeText === '어르신기부자' || type === 'senior') && <CustomBadge type="senior" />)}
      </Flex>
      {subtitle && (
        <Text color="gray.500" fontSize="sm" lineClamp={2} mb={2}>{subtitle}</Text>
      )}
      <Flex align="center" gap={3} mt={2}>
        {typeof rating === 'number' && (
          <Box color="#FACC15">
            <StarRating value={rating} size="1.1em" />
          </Box>
        )}
        {typeof garlicCount === 'number' && (
          <Text fontSize="md" color="gray.700">
            🧄 {garlicCount}
          </Text>
        )}
      </Flex>
    </Box>
  );
};

export default CommonCard; 