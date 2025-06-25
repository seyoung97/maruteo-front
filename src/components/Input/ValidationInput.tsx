import {
    Box,
    Button,
    HStack,
    Input,
    Text
} from '@chakra-ui/react';
import { useState } from 'react';

interface ValidationInputProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'date';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  showPasswordToggle?: boolean;
  validation?: (value: string) => string | undefined;
  id?: string;
}

export function ValidationInput({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  errorMessage,
  showPasswordToggle = false,
  validation,
  id
}: ValidationInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);

  // 실시간 validation 체크
  const validationError = touched && validation ? validation(value) : undefined;
  const displayError = errorMessage || validationError;

  // 비밀번호 필드인 경우 실제 input type 결정
  const inputType = type === 'password' && showPassword ? 'text' : type;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    if (!touched) setTouched(true);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  return (
    <Box w="full">
      <label 
        htmlFor={id} 
        style={{ 
          display: 'block', 
          marginBottom: '8px', 
          fontSize: '14px',
          fontWeight: '500',
          color: '#374151'
        }}
      >
        {label}
        {required && <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>}
      </label>
      
      {showPasswordToggle ? (
        <HStack w="full">
          <Input
            id={id}
            type={inputType}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            required={required}
            flex="1"
            h="48px"
            fontSize="16px"
            borderRadius="lg"
            border="1px solid"
            borderColor={displayError ? "red.300" : "gray.200"}
            bg="white"
            _focus={{
              borderColor: displayError ? "red.500" : "blue.500",
              boxShadow: displayError 
                ? "0 0 0 1px #ef4444" 
                : "0 0 0 1px #3182ce"
            }}
          />
          <Button
            type="button"
            variant="ghost"
            onClick={() => setShowPassword(!showPassword)}
            h="48px"
            w="48px"
            p="0"
            borderRadius="lg"
            color="gray.500"
            _hover={{ bg: "gray.100" }}
          >
            {showPassword ? '숨기기' : '보기'}
          </Button>
        </HStack>
      ) : (
        <Input
          id={id}
          type={inputType}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          w="full"
          h="48px"
          fontSize="16px"
          borderRadius="lg"
          border="1px solid"
          borderColor={displayError ? "red.300" : "gray.200"}
          bg="white"
          _focus={{
            borderColor: displayError ? "red.500" : "blue.500",
            boxShadow: displayError 
              ? "0 0 0 1px #ef4444" 
              : "0 0 0 1px #3182ce"
          }}
        />
      )}
      
      {displayError && (
        <Text color="red.500" fontSize="sm" mt="1">
          {displayError}
        </Text>
      )}
    </Box>
  );
} 