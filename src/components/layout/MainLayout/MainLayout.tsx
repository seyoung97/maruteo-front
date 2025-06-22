import { Box, useDisclosure } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import MainHeader from "./MainHeader"

export const MainLayout = () => {
  const { onOpen} = useDisclosure()

  return (
   <Box h="100vh" display={"flex"} flexDirection={"column"}>
    <MainHeader onMenuOpen={onOpen}/>
    <Box flex="1" overflowY="auto">
      <Outlet/>
    </Box>
   </Box>
  )
}

export default MainLayout
