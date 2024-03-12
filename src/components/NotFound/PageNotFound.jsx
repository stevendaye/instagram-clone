import { Text, Flex, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      w={"full"}
      height={"100vh"}
      gap={2}
      _hover={{ textDecoration: "none" }}
    >
      <Text fontSize={"2xl"}>This page does not exist</Text>
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

export default PageNotFound;
