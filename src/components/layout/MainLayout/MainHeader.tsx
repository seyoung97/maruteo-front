import { Flex, IconButton, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import { LuMenu, LuSearch } from "react-icons/lu";
import HamburgerMenu from './HamburgerMenu';

export const MainHeader = () => {
  const {open, onOpen, onClose } = useDisclosure()

  return (
    <Flex as="header" py={4} px={4} align="center">
      <Text fontSize="l" fontWeight="bold" color="green.500">의성 마루터</Text>
      <Spacer />
      <Flex align="center" gap={2}>
      <IconButton aria-label='Search database' size={'xs'} variant={'ghost'} ><LuSearch/></IconButton>
      <IconButton aria-label='Menu' size={'xs'} variant={'ghost'} onClick={onOpen}><LuMenu/></IconButton>
      </Flex>
      <HamburgerMenu isOpen={open} onClose={onClose}/>
    </Flex>
  )
}

export default MainHeader
