import { Box, Flex, Skeleton, SkeletonCircle, VStack } from "@chakra-ui/react";

const PostSkeletons = () => {
  return (
    <>
      {[0, 1, 2].map((_, index) => (
        <VStack key={index} gap={4} alignItems={"flex-start"} mb={10}>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            w={"full"}
          >
            <Box>
              <Flex gap={2}>
                <SkeletonCircle size={10} />
                <VStack gap={2} alignItems={"flex-start"} mt={4}>
                  <Skeleton height={"10px"} w={"125px"} />
                </VStack>
              </Flex>
            </Box>

            <Skeleton height={"10px"} w={"50px"} />
          </Flex>

          <Skeleton w={"full"}>
            <Box h={"600px"}>Content Wrapped</Box>
          </Skeleton>

          <VStack gap={2} alignItems={"flex-start"} mt={0}>
            <Skeleton height={"10px"} w={"150px"} />
            <Skeleton height={"10px"} w={"100px"} />
          </VStack>
        </VStack>
      ))}
    </>
  );
};

export default PostSkeletons;
