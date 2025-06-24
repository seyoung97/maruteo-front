import Footer from "@/components/shared/Footer/Footer"
import { Box, Container } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import PageHeader from "./PageHeader"


export const PageLayout = () => {
  return (
   <Container w={"100%"}  maxW="480px" h="100vh" display={"flex"} flexDirection={"column"}>
    <PageHeader title={"페이지 제목"}/>
      <Box flex="1" overflowY="auto">
         <Outlet/>
       </Box>
      <Footer/>
    </Container>
  )
}

export default PageLayout