import { Flex, IconButton } from '@chakra-ui/react';
import { GoHome } from "react-icons/go";
import { IoChatbubbleEllipsesOutline, IoPerson, IoSearchOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';



export const Footer = () => {
  const navigate = useNavigate();
  return (
    <Flex
      as="footer"
      py={4}
      px={4}
      justify="space-around"
      borderTop="1px"
      borderColor="gray.200"
      position="sticky"
      bottom="0"
      bg="white"
      zIndex="docked"
    >
      <IconButton
      aria-label="Home"
      size="sm"
      variant="ghost" 
      onClick={() => navigate('/')}
      >
        <GoHome/>
      </IconButton>
      <IconButton
      aria-label="Home"
      size="sm"
      variant="ghost" 
      onClick={() => navigate('/chat')}
      >
        <IoChatbubbleEllipsesOutline/>
      </IconButton>
      <IconButton
      aria-label="Home"
      size="sm"
      variant="ghost" 
      onClick={() => navigate('/class-explore')}
      >
        <IoSearchOutline/>
      </IconButton>
      <IconButton
      aria-label="Home"
      size="sm"
      variant="ghost" 
      onClick={() => navigate('/profile')}
      >
        <IoPerson/>
      </IconButton>    
    </Flex>
  )
}

export default Footer
