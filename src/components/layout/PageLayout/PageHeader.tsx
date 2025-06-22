import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
}

const PageHeader = ({ title, onBack, rightElement }: PageHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1); // 기본 동작: 뒤로 가기
  };

  return (
    <Flex
      as="header"
      w={"100%"}
      align="center"
      justify="space-between"
      px={4}
      py={3}
      boxShadow="sm"
      bg="white"
      position="sticky"
      top={0}
      zIndex="sticky"
      h="56px"
    >
      <IconButton
        aria-label="뒤로가기"
        variant="ghost"
        onClick={handleBack}
      >
        <IoArrowBack/>
      </IconButton>

      <Text fontSize="lg" fontWeight="bold" flex="1" textAlign="center">
        {title}
      </Text>
      <Box w="40px" textAlign="right">
        {rightElement || <Box />}
      </Box>
    </Flex>
  );
};

export default PageHeader;