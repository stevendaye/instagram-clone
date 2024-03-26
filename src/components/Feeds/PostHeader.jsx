import {
  Avatar,
  Box,
  Button,
  Flex,
  Skeleton,
  SkeletonCircle,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useFollow from "../../hooks/useFollow";
import { timeAgo } from "../../utils/timeAgo";

const PostHeader = ({ post, owner }) => {
  const { isUpdating, isFollowing, handleFollowUser } = useFollow(owner?.uuid);
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"full"}
      my={2}
    >
      <Flex alignItems={"center"} gap={2}>
        {owner ? (
          <Link to={`/${owner.username}`}>
            <Avatar src={owner.profilePicUrl} size={"sm"} alt="User Profile" />
          </Link>
        ) : (
          <SkeletonCircle size={10} />
        )}

        <Flex fontSize={12} fontWeight={"bold"} gap={2}>
          {owner ? (
            <Link to={`/${owner.username}`}>{owner.username}</Link>
          ) : (
            <Skeleton width={"100px"} height={"10px"} />
          )}
          <Box color={"gray.500"}>- {timeAgo(post.createdAt)} </Box>
        </Flex>
      </Flex>

      <Box cursor={"pointer"}>
        <Button
          size={"sm"}
          bg={"transparent"}
          fontSize={12}
          color={"blue.500"}
          fontWeight={"bold"}
          _hover={{ color: "white" }}
          transition={"0.2s all ease-in-out"}
          isLoading={isUpdating}
          onClick={handleFollowUser}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </Box>
    </Flex>
  );
};

export default PostHeader;
