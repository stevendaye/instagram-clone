import { Flex, Text } from "@chakra-ui/react";

const PostsNotFound = () => {
  return (
    <Flex flexDirection={"column"} textAlign={"center"} mx={"auto"} mt={10}>
      <Text fontSize={"2xl"}>No Post Found</Text>
    </Flex>
  );
};

export default PostsNotFound;
