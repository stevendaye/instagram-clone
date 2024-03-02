import { Flex, Text, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const UserNotFound = () => {
  return (
    <Flex
      flexDirection={"column"}
      textAlign={"center"}
      mx={"auto"}
      w={"full"}
      height={"full"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Text fontSize={"2xl"}>User Not Found</Text>
      <Link
        to={"/"}
        as={RouterLink}
        color={"blue.500"}
        mx={"auto"}
        w={"max-content"}
        fontSize={"xl"}
      >
        Go Back to Home Page
      </Link>
    </Flex>
  );
};

export default UserNotFound;
