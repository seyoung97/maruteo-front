import { createListCollection, Portal, Select } from '@chakra-ui/react';

export interface SelectOption {
  label: string;
  value: string | number;
}

interface CommonSelectProps {
  options: SelectOption[];
  value?: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  label?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  width?: string | number;
  disabled?: boolean;
  required?: boolean;
}

const CommonSelect = ({ 
  options, 
  value, 
  onChange, 
  placeholder = "선택해주세요", 
  label,
  size = 'md', 
  width = '100%',
  disabled = false,
  required = false
}: CommonSelectProps) => {
  // Chakra v3 방식: collection 생성
  const collection = createListCollection({ items: options });

  return (
    <Select.Root
      collection={collection}
      value={value ? [String(value)] : []}
      onValueChange={({ value }) => onChange(value[0])}
      size={size}
      width={width}
      disabled={disabled}
      required={required}
    >
      <Select.HiddenSelect />
      {label && <Select.Label>{label}</Select.Label>}
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={placeholder} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {collection.items.map((item) => (
              <Select.Item item={item} key={item.value}>
                {item.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

export default CommonSelect; 