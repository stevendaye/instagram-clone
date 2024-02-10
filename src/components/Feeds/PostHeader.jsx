import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

const PostHeader = ({ username, avatar }) => {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"full"}
      my={2}
    >
      <Flex alignItems={"center"} gap={2}>
        <Avatar src={avatar} size={"sm"} alt="User Profile" />
        <Text fontSize={12} fontWeight={"bold"} gap={2}>
          {username}
        </Text>
        <Box color={"gray.500"}>- 1w </Box>
      </Flex>

      <Box cursor={"pointer"}>
        <Text
          fontSize={12}
          color={"blue.500"}
          fontWeight={"bold"}
          _hover={{ color: "white" }}
          transition={"0.2s all ease-in-out"}
        >
          Unfollow
        </Text>
      </Box>
    </Flex>
  );
};

export default PostHeader;
