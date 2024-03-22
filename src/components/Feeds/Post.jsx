import { Box, Image } from "@chakra-ui/react";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import useGetUserInfo from "../../hooks/useGetUserInfo";

const Post = ({ post }) => {
  const { userProfile } = useGetUserInfo(post.createdBy);

  return (
    <>
      <PostHeader post={post} owner={userProfile} />
      <Box my={2} borderRadius={4} overflow={"hidden"}>
        <Image src={post.imageURL} alt={"Feed Post Image"} />
      </Box>
      <PostFooter post={post} owner={userProfile} />
    </>
  );
};

export default Post;
