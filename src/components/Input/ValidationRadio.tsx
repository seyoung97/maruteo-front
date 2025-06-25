import {
    Box,
    HStack,
    Text
} from '@chakra-ui/react';

interface RadioOption {
  value: string;
  label: string;
}

interface ValidationRadioProps {
  label: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  name: string;
}

export function ValidationRadio({
  label,
  options,
  value,
  onChange,
  required = false,
  name
}: ValidationRadioProps) {
  return (
    <Box w="full">
      <Text 
        fontSize="14px"
        fontWeight="500"
        color="gray.700"
        mb="12px"
      >
        {label}
        {required && <Text as="span" color="red.500" ml="2px">*</Text>}
      </Text>
      
      <HStack gap="6">
        {options.map((option) => (
          <HStack key={option.value} gap="2">
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              style={{ 
                width: '18px', 
                height: '18px',
                cursor: 'pointer'
              }}
            />
            <label 
              htmlFor={`${name}-${option.value}`}
              style={{ 
                fontSize: '16px', 
                color: '#374151',
                cursor: 'pointer'
              }}
            >
              {option.label}
            </label>
          </HStack>
        ))}
      </HStack>
    </Box>
  );
} 