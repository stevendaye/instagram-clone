import {
  Container,
  Flex,
  Skeleton,
  SkeletonCircle,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import ProfilePosts from "./ProfilePosts";
import useGetUserProfile from "../../hooks/useGetUserProfile";
import UserNotFound from "../NotFound/UserNotFound";

const Profile = () => {
  const { username } = useParams();
  const { isLoading, userProfile } = useGetUserProfile(username);
  const userNotFound = !isLoading && !userProfile;

  if (userNotFound) return <UserNotFound />;

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
        {!isLoading && userProfile && <ProfileHeader />}
        {isLoading && <ProfileHeaderSkeleton />}
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

// Loading Skeleton for ProfileHaeader Component
const ProfileHeaderSkeleton = () => {
  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      flexDirection={{ base: "column", sm: "row" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <SkeletonCircle size={24} />

      <VStack
        flex={1}
        gap={2}
        mx={"auto"}
        alignItems={{ base: "center", sm: "flex-start" }}
      >
        <Skeleton height="12px" width="150px" />
        <Skeleton height="12px" width="150px" />
      </VStack>
    </Flex>
  );
};

export default Profile;
