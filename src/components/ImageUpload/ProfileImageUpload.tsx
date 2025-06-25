import {
  Box,
  Button,
  Image,
  VStack
} from '@chakra-ui/react';
import { useRef } from 'react';

interface ProfileImageUploadProps {
  value: string | null;
  onChange: (imageUrl: string | null) => void;
  size?: string | number;
  accept?: string;
  disabled?: boolean;
}

export function ProfileImageUpload({
  value,
  onChange,
  size = "96px",
  accept = "image/*",
  disabled = false
}: ProfileImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <VStack gap="4">
      <Box position="relative">
        <Box
          w={size}
          h={size}
          borderRadius="full"
          bg="green.300"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor={disabled ? "default" : "pointer"}
          onClick={handleImageClick}
          overflow="hidden"
          _hover={disabled ? {} : { opacity: 0.8 }}
          transition="opacity 0.2s"
          border="2px solid"
          borderColor="gray.200"
        >
          {value ? (
            <Image
              src={value}
              alt="프로필"
              w="100%"
              h="100%"
              objectFit="cover"
              borderRadius="full"
            />
          ) : (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          )}
        </Box>
        
        {/* 카메라 아이콘 */}
        {!disabled && (
          <Button
            size="sm"
            position="absolute"
            bottom="0"
            right="0"
            bg="gray.600"
            color="white"
            borderRadius="full"
            w="32px"
            h="32px"
            minW="32px"
            p="0"
            _hover={{ bg: "gray.700" }}
            onClick={handleImageClick}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 2l-1.83 2H3v16h18V4h-4.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
            </svg>
          </Button>
        )}

        {/* 삭제 버튼 (이미지가 있을 때만) */}
        {value && !disabled && (
          <Button
            size="sm"
            position="absolute"
            top="-8px"
            right="-8px"
            bg="red.500"
            color="white"
            borderRadius="full"
            w="24px"
            h="24px"
            minW="24px"
            p="0"
            _hover={{ bg: "red.600" }}
            onClick={handleRemoveImage}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </Button>
        )}
      </Box>
      
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleImageUpload}
        style={{ display: 'none' }}
        disabled={disabled}
      />
    </VStack>
  );
} 