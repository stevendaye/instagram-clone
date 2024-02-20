import { Box, Container, Flex, Image, VStack } from "@chakra-ui/react";
import AuthForm from "../components/Forms/AuthForm";

const Auth = () => {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
      <Container maxW={"container.md"} padding={0}>
        <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
          <Box display={{ base: "none", md: "block" }} flex={1}>
            <Image src="/auth.png" h={650} alt="Instagram Landing Image" />
          </Box>

          <VStack spacing={4} align={"stretch"} flex={1}>
            <AuthForm />
            <Box textAlign={"center"}>Get the App</Box>

            <Flex gap={5} justifyContent={"center"}>
              <Image src="/playstore.png" h={"10"} alt="Playstore Logo" />
              <Image src="/microsoft.png" h={"10"} alt="Microsoft Logo" />
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
};

export default Auth;
