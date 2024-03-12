import {
  Flex,
  VStack,
  Text,
  Box,
  Link,
  Skeleton,
  SkeletonCircle,
} from "@chakra-ui/react";
import MainUser from "./MainUser";
import SuggestedUser from "./SuggestedUser";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";

const SuggestedUsers = () => {
  const { isLoading, suggestedUsers } = useGetSuggestedUsers();
  const suggestions = [1, 2];

  return (
    <VStack py={8} px={6} gap={4}>
      <MainUser />

      {suggestedUsers.length !== 0 && (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
          <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
            Suggested for you
          </Text>
          <Text
            fontSize={12}
            fontWeight={"bold"}
            color={"gray.500"}
            cursor={"pointer"}
            _hover={{ color: "gray.400" }}
          >
            See All
          </Text>
        </Flex>
      )}

      {isLoading
        ? suggestions.map((n) => <SuggestedUserSkeleton key={n} />)
        : suggestedUsers.map((user) => (
            <SuggestedUser key={user.id} user={user} />
          ))}

      <Box fontSize={12} color={"gray.500"} mt={4} alignSelf={"start"}>
        &copy; Built by{" "}
        <Link
          href="https://www.github.com/stevendaye"
          target="_blank"
          color={"blue.500"}
          fontSize={14}
        >
          Steven Daye
        </Link>
      </Box>
    </VStack>
  );
};

const SuggestedUserSkeleton = () => {
  return (
    <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
      <Flex gap={5}>
        <SkeletonCircle size={14} />
        <VStack gap={6} mt="2px">
          <Skeleton width="95px" height="12px" />
          <Skeleton width="95px" height="12px" />
        </VStack>
      </Flex>

      <Skeleton width="35px" height="10px" />
    </Flex>
  );
};

export default SuggestedUsers;
