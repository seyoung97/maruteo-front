import Footer from "@/components/shared/Footer/Footer"
import { Box } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import PageHeader from "./PageHeader"


export const PageLayout = () => {
  return (
   <Box w={"100%"}  maxW="480px" h="100vh" display={"flex"} flexDirection={"column"}>
    <PageHeader title={"페이지 제목"}/>
      <Box flex="1" overflowY="auto">
         <Outlet/>
       </Box>
      <Footer/>
    </Box>
  )
}

export default PageLayout