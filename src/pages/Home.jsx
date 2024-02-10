import { Box, Container, Flex } from "@chakra-ui/react";
import Posts from "../components/Feeds/Posts";
import SuggestedUsers from "../components/Suggested/SuggestedUsers";

const Home = () => {
  return (
    <Container maxW={"container.lg"}>
      <Flex gap={20}>
        <Box flex={2} py={10}>
          <Posts />
        </Box>

        <Box
          flex={3}
          mr={20}
          maxW={"300px"}
          display={{ base: "none", lg: "block" }}
        >
          <SuggestedUsers />
        </Box>
      </Flex>
    </Container>
  );
};

export default Home;
