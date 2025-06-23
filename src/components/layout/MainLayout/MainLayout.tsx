import Footer from "@/components/shared/Footer/Footer"
import { Box } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import MainHeader from "./MainHeader"

export const MainLayout = () => {

  return (
   <Box w={"100%"}  maxW="480px" h="100vh" display={"flex"} flexDirection={"column"}>
    <MainHeader/>
    <Box flex="1" overflowY="auto">
      <Outlet/>
    </Box>
    <Footer/>
   </Box>
  )
}

export default MainLayout
