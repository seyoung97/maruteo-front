import { Box, Heading, Text } from "@chakra-ui/react";

const HomePage = () => {
  return(
    <Box p={8}>
      <Heading mb={4}>Chakra UI v3 시작 🎉</Heading>
        <Text color="fg.muted">
          이제 createSystem으로 디자인 시스템을 구성해보세요.
        </Text>
    </Box>
  )
}

export default HomePage;