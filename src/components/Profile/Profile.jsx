import { Container, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import ProfilePosts from "./ProfilePosts";

const Profile = () => {
  const { username } = useParams();

  useEffect(() => {
    console.log(username);
  }, [username]);

  return (
    <Container maxW={"container.lg"} py={5}>
      <Flex
        py={10}
        px={4}
        pl={{ base: 4, md: 10 }}
        w={"full"}
        mx={"auto"}
        flexDirection={"column"}
      >
        <ProfileHeader />
      </Flex>

      <Flex
        px={{ base: 2, sm: 4 }}
        maxW={"full"}
        mx={"auto"}
        borderTop={"1px solid"}
        borderColor={"whiteAlpha.300"}
        flexDirection={"column"}
      >
        <ProfileTabs />
        <ProfilePosts />
      </Flex>
    </Container>
  );
};

export default Profile;
