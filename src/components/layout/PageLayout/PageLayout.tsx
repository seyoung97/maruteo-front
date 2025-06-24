import Footer from "@/components/shared/Footer/Footer"
import { Box } from "@chakra-ui/react"
import { Outlet, useOutletContext } from "react-router-dom"
import PageHeader from "./PageHeader"

export type PageLayoutContext = {
  title: string;
};

export const PageLayout = () => {
  // Outlet context에서 title을 받아옴
  const context = useOutletContext<PageLayoutContext>();
  return (
   <Box w={"100%"}  maxW="480px" h="100vh" display={"flex"} flexDirection={"column"}>
    <PageHeader title={context?.title || "페이지 제목"}/>
      <Box flex="1" overflowY="auto">
         <Outlet context={context}/>
       </Box>
      <Footer/>
    </Box>
  )
}

export default PageLayout