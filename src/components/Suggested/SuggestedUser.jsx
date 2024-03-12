import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react";
import useFollow from "../../hooks/useFollow";
import useAuthStore from "../../store/useAuthStore";

const SuggestedUser = ({ user, setUser }) => {
  const { isFollowing, isUpdating, handleFollowUser } = useFollow(user?.uuid);
  const authUser = useAuthStore((state) => state.user);

  const onFollowUser = async () => {
    await handleFollowUser();
    setUser({
      ...user,
      followers: isFollowing
        ? user.followers.filter((uuid) => uuid !== authUser.uuid)
        : [...user.followers, authUser.uuid],
    });
  };

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Avatar src={user?.profilePicUrl} size={"md"} />
        <VStack spacing={2} alignItems={"flex-start"}>
          <Box fontSize={12} fontWeight={"bold"}>
            {user?.fullName}
          </Box>
          <Box fontSize={11} color={"gray.500"}>
            {user?.followers.length} followers
          </Box>
        </VStack>
      </Flex>

      {authUser.uuid !== user?.uuid && (
        <Button
          fontSize={13}
          bg={"transparent"}
          p={0}
          h={"max-content"}
          fontWeight={"mediun"}
          color={"blue.400"}
          cursor={"pointer"}
          _hover={{ color: "white" }}
          onClick={onFollowUser}
          isLoading={isUpdating}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      )}
    </Flex>
  );
};

export default SuggestedUser;
