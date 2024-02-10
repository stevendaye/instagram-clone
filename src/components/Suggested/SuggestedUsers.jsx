import { Flex, VStack, Text, Box, Link } from "@chakra-ui/react";
import MainUser from "./MainUser";
import SuggestedUser from "./SuggestedUser";

const SuggestedUsers = () => {
  return (
    <VStack py={8} px={6} gap={4}>
      <MainUser />

      <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
        <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
          Suggested for you
        </Text>
        <Text
          fontSize={12}
          fontWeight={"bold"}
          color={"gray.500"}
          cursor={"pointer"}
          _hover={{ color: "gray.400" }}
        >
          See All
        </Text>
      </Flex>

      <SuggestedUser
        name="Kend C Dodds"
        followers="2532"
        avatar="https://bit.ly/kent-c-dodds"
      />
      <SuggestedUser
        name="Ryan Florence"
        followers="1575"
        avatar="https://bit.ly/ryan-florence"
      />
      <SuggestedUser
        name="Christian Nwamba"
        followers="3474"
        avatar="https://bit.ly/code-beast"
      />

      <Box fontSize={12} color={"gray.500"} mt={4} alignSelf={"start"}>
        &copy; Built by{" "}
        <Link
          href="https://www.github.com/stevendaye"
          target="_blank"
          color={"blue.500"}
          fontSize={14}
        >
          Steven Daye
        </Link>
      </Box>
    </VStack>
  );
};

export default SuggestedUsers;
