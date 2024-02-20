import { Avatar, Text, Flex, Button } from "@chakra-ui/react";
import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../store/useAuthStore";
import { Link } from "react-router-dom";

const MainUser = () => {
  const { logout, isLoggingOut } = useLogout();
  const authUser = useAuthStore((state) => state.user);

  if (!authUser) return null;

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Link to={authUser.username}>
        <Flex alignItems={"center"} gap={2}>
          <Avatar src={authUser.profilePicUrl} size={"md"} />
          <Text fontSize={12} fontWeight={"bold"}>
            {authUser.username}
          </Text>
        </Flex>
      </Link>

      <Button
        size={"sx"}
        background={"transparent"}
        fontSize={14}
        fontWeight={"medium"}
        color={"blue.400"}
        cursor={"pointer"}
        _hover={{ bg: "transparent" }}
        isLoading={isLoggingOut}
        onClick={logout}
      >
        Log Out
      </Button>
    </Flex>
  );
};

export default MainUser;
