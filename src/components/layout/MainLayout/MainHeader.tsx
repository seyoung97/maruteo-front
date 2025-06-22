import { Flex, IconButton, Spacer, Text } from '@chakra-ui/react';
import { LuMenu, LuSearch } from "react-icons/lu";



interface MainHeaderProps {
  onMenuOpen: () => void;
}

export const MainHeader = ({onMenuOpen}: MainHeaderProps) => {
  return (
    <Flex as="header" py={4} px={4} align="center">
      <Text fontSize="l" fontWeight="bold" color="teal.500">의성 마루터</Text>
      <Spacer />
      <Flex align="center" gap={2}>
      <IconButton aria-label='Search database' size={'xs'} variant={'ghost'}><LuSearch/></IconButton>
      <IconButton aria-label='Search database' size={'xs'} variant={'ghost'} onClick={onMenuOpen}><LuMenu/></IconButton>
      </Flex>
    </Flex>
  )
}

export default MainHeader
