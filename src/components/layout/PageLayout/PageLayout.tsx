import Footer from "@/components/layout/shared/Footer/Footer";
import { Box, Container } from "@chakra-ui/react";
import { Outlet, useMatches, useParams } from "react-router-dom";
import PageHeader from "./PageHeader";

export const PageLayout = () => {
  // useMatches를 사용하여 현재 라우트의 handle 데이터를 가져옴
  const matches = useMatches();
  const params = useParams();
  const currentMatch = matches[matches.length - 1] as any;
  let title = currentMatch?.handle?.title || "페이지 제목";
  if (currentMatch?.handle?.getTitle) {
    title = currentMatch.handle.getTitle(params);
  }

  // :category 등 파라미터 치환
  Object.entries(params).forEach(([key, value]) => {
    title = title.replace(`:${key}`, value || "");
  });

  return (
   <Container w={"100%"}  maxW="480px" h="100vh" display={"flex"} flexDirection={"column"} bg="#fff">
    <PageHeader title={title}/>
      <Box flex="1" overflowY="auto">
         <Outlet/>
       </Box>
      <Footer/>
    </Container>
  )
}

export default PageLayout