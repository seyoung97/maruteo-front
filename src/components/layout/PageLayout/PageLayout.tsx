import Footer from "@/components/shared/Footer/Footer";
import { Box, Container } from "@chakra-ui/react";
import { Outlet, useMatches } from "react-router-dom";
import PageHeader from "./PageHeader";

export const PageLayout = () => {
  // useMatches를 사용하여 현재 라우트의 handle 데이터를 가져옴
  const matches = useMatches();
  const currentMatch = matches[matches.length - 1];
  const title = (currentMatch?.handle as { title?: string })?.title || "페이지 제목";
  
  return (
   <Container w={"100%"}  maxW="480px" h="100vh" display={"flex"} flexDirection={"column"}>
    <PageHeader title={title}/>
      <Box flex="1" overflowY="auto">
         <Outlet/>
       </Box>
      <Footer/>
    </Container>
  )
}

export default PageLayout