import { Link as RouterLink } from "react-router-dom";
import { Avatar, Text, Flex, Link } from "@chakra-ui/react";

const MainUser = () => {
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Avatar src="/profile.jpg" size={"md"} alt="Steven Daye" />
        <Text fontSize={12} fontWeight={"bold"}>
          Steven Daye
        </Text>
      </Flex>

      <Link
        as={RouterLink}
        to={"/auth"}
        fontSize={14}
        fontWeight={"medium"}
        color={"blue.400"}
        cursor={"pointer"}
        textDecoration={"none"}
      >
        Log Out
      </Link>
    </Flex>
  );
};

export default MainUser;
