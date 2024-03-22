import { Box, Container, Text } from "@chakra-ui/react";
import Post from "./Post";
import PostSkeletons from "./PostSkeletons";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";

const Posts = () => {
  const { isLoading, posts } = useGetFeedPosts();

  return (
    <Container maxW={"container.sms"} py={10} px={2}>
      {isLoading && <PostSkeletons />}

      {!isLoading &&
        posts.length > 0 &&
        posts.map((post) => <Post key={post.id} post={post} />)}

      {!isLoading && posts.length === 0 && (
        <Box>
          <Text fontSize={"md"} color={"gray"} textAlign={"center"}>
            It seems like you follow no one yet.
          </Text>
          <Text color={"gray"} textAlign={"center"}>
            Start follwing a few ones you find intersting.
          </Text>
        </Box>
      )}
    </Container>
  );
};

export default Posts;
