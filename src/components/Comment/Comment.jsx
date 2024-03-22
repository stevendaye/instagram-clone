import { Avatar, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import useGetUserInfo from "../../hooks/useGetUserInfo";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";

const Comment = ({ comment }) => {
  const { userProfile, isLoading } = useGetUserInfo(comment.createdBy);

  if (isLoading) return <CommentSkeleton />;

  return (
    <Flex gap={4}>
      <Link to={`${userProfile?.username}`}>
        <Avatar src={userProfile?.profilePicUrl} size={"sm"} />
      </Link>

      <Flex flexDirection={"column"}>
        <Flex gap={2}>
          <Link to={`${userProfile?.username}`}>
            <Text fontStyle={"bold"} fontSize={12}>
              {userProfile?.username}
            </Text>
          </Link>
          <Text fontSize={14}>{comment.comment}</Text>
        </Flex>

        <Text fontSize={12} color={"gray"}>
          {timeAgo(comment.createdAt)}
        </Text>
      </Flex>
    </Flex>
  );
};

const CommentSkeleton = () => {
  <Flex gap={4} w={"full"} alignItems={"center"}>
    <SkeletonCircle h={10} w={10} />
    <Flex gap={1} flexDirection={"column"}>
      <Skeleton height={2} width={100} />
      <Skeleton height={2} width={50} />
    </Flex>
  </Flex>;
};

export default Comment;
