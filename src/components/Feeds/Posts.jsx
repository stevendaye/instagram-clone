import { useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";
import Post from "./Post";
import PostSkeletons from "./PostSkeletons";

const Posts = () => {
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 2500);
  }, []);

  return (
    <Container maxW={"container.sms"} py={10} px={2}>
      {isLoading && <PostSkeletons />}

      {!isLoading && (
        <>
          <Post img="/img1.png" username="Steven Daye" avatar="/img1.png" />
          <Post img="/img2.png" username="John Doe" avatar="/img2.png" />
          <Post img="/img3.png" username="Chris Pathway" avatar="/img3.png" />
          <Post img="/img4.png" username="Elena Todds" avatar="/img4.png" />
        </>
      )}
    </Container>
  );
};

export default Posts;
