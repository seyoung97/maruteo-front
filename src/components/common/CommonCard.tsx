import { Box, Flex, Image, Text, Badge, HStack } from '@chakra-ui/react';
import GarlicIcon from './GarlicIcon';
import StarRating from './StarRating';

interface CommonCardProps {
  thumbnail: string;
  title: string;
  subtitle?: string;
  garlicCount?: number;
  rating?: number;
  badgeText?: string;
  onClick?: () => void;
}

const CommonCard = ({
  thumbnail,
  title,
  subtitle,
  garlicCount,
  rating,
  badgeText,
  onClick,
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
      maxW="320px"
    >
      <Image src={thumbnail} alt={title} borderRadius="md" w="100%" h="160px" objectFit="cover" mb={3} />
      <Flex align="center" mb={1} gap={2}>
        <Text fontWeight="bold" fontSize="lg" lineClamp={1}>{title}</Text>
        {badgeText && (
          <Badge colorPalette="green" fontSize="0.8em">{badgeText}</Badge>
        )}
      </Flex>
      {subtitle && (
        <Text color="gray.500" fontSize="sm" lineClamp={2} mb={2}>{subtitle}</Text>
      )}
      <Flex align="center" gap={3}>
        {typeof rating === 'number' && <StarRating value={rating} size="1em" />}
        {typeof garlicCount === 'number' && (
          <HStack gap={1}>
            <GarlicIcon style={{ fontSize: '1.2em' }} />
            <Text fontSize="sm" color="gray.700">{garlicCount}</Text>
          </HStack>
        )}
      </Flex>
    </Box>
  );
};

export default CommonCard; 