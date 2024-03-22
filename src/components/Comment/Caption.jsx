import { Avatar, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";
import useAuthStore from "../../store/useAuthStore";

const Caption = ({ post }) => {
  const userProfile = useAuthStore((state) => state.user);

  return (
    <Flex gap={4}>
      <Link to={`${userProfile.username}`}>
        <Avatar src={userProfile.profilePicUrl} size={"sm"} />
      </Link>

      <Flex flexDirection={"column"}>
        <Flex gap={2}>
          <Link to={`${userProfile.username}`}>
            <Text fontStyle={"bold"} fontSize={12}>
              {userProfile.username}
            </Text>
          </Link>
          <Text fontSize={14}>{post.caption}</Text>
        </Flex>

        <Text fontSize={12} color={"gray"}>
          {timeAgo(post.createdAt)}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Caption;
