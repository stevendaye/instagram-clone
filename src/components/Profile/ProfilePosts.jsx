import { Box, Grid, Skeleton, VStack } from "@chakra-ui/react";
import ProfilePost from "./ProfilePost";
import useGetUserPosts from "../../hooks/useGetUserPosts";
import PostsNotFound from "../NotFound/PostsNotFound";

const ProfilePosts = () => {
  const { isLoading, posts } = useGetUserPosts();
  const noPostsFound = !isLoading && posts.length === 0;

  if (noPostsFound) return <PostsNotFound />;

  return (
    <Grid
      templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
      gap={1}
      columnGap={1}
    >
      {isLoading &&
        [0, 1, 2].map((_, index) => (
          <VStack key={index}>
            <Skeleton w={"full"}>
              <Box h={"300px"}>Contents Wrapped</Box>
            </Skeleton>
          </VStack>
        ))}

      {!isLoading &&
        posts.map((post) => <ProfilePost key={post.id} post={post} />)}
    </Grid>
  );
};

export default ProfilePosts;
