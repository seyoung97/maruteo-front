import { Select, createListCollection, Portal } from '@chakra-ui/react';

interface CommonSelectProps {
  options: { label: string; value: string | number }[];
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  width?: string | number;
}

const CommonSelect = ({ options, value, onChange, placeholder, size = 'md', width = '200px' }: CommonSelectProps) => {
  // Chakra v3 방식: collection 생성
  const collection = createListCollection({ items: options });

  return (
    <Select.Root
      collection={collection}
      value={value ? [String(value)] : []}
      onValueChange={({ value }) => onChange(value[0])}
      size={size}
      width={width}
    >
      <Select.HiddenSelect />
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