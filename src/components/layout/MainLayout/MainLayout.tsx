import Footer from "@/components/layout/shared/Footer/Footer"
import { Box, Container } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import MainHeader from "./MainHeader"

export const MainLayout = () => {

  return (
   <Container w={"100%"}  maxW="480px" h="100vh" display={"flex"} flexDirection={"column"}>
    <MainHeader/>
    <Box flex="1" overflowY="auto">
      <Outlet/>
    </Box>
    <Footer/>
   </Container>
  )
}

export default MainLayout
