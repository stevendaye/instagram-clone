import { useState } from "react";
import { Box, VStack, Image, Text, Flex } from "@chakra-ui/react";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import GoogleAuth from "./GoogleAuth";

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spacing={5}>
          <Image
            src="/logo.png"
            h={24}
            cursor={"pointer"}
            alt="Instagram Logo"
          />

          {isLogin ? <LogIn /> : <SignUp />}

          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            my={4}
            gap={1}
            w={"full"}
          >
            <Box flex={2} h={1} bg={"gray.400"}></Box>
            <Text mx={1} color={"white"}>
              Or
            </Text>
            <Box flex={2} h={1} bg={"gray.400"}></Box>
          </Flex>

          <GoogleAuth prefix={isLogin ? "Log in" : "Sign up"} />
        </VStack>
      </Box>

      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <Flex justifyContent={"center"} alignItems={"center"}>
          <Box mx={2} fontSize={14}>
            {isLogin ? "Don't have an account?" : "Already have an account"}
          </Box>
          <Box
            onClick={() => setIsLogin(!isLogin)}
            color={"blue.500"}
            cursor={"pointer"}
          >
            {isLogin ? "Sign Up" : "Log In"}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default SignIn;
