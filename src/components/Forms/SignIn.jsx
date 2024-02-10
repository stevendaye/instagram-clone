import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  VStack,
  Image,
  Input,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleInputs = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleAuth = () => {
    if (!inputs.email || !inputs.password) {
      console.log("Fields are required");
      return;
    }
    navigate("/");
  };

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
          <Input
            type="email"
            name="email"
            fontSize={14}
            placeholder="Email"
            value={inputs.email}
            onChange={handleInputs}
          />
          <Input
            type="password"
            name="password"
            fontSize={14}
            placeholder="Password"
            value={inputs.password}
            onChange={handleInputs}
          />

          {!isLogin && (
            <Input
              type="password"
              name="confirmPassword"
              fontSize={14}
              placeholder="Confirm Password"
              value={inputs.confirmPassword}
              onChange={handleInputs}
            />
          )}

          <Button
            w={"full"}
            colorScheme="blue"
            size={"sm"}
            fontSize={14}
            onClick={handleAuth}
          >
            {isLogin ? "Log In" : "Sign Up"}
          </Button>

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

          <Flex justifyContent={"center"} alignItems={"center"}>
            <Image src="/google.png" w={5} alt="Google Logo" />
            <Text mx={2} color={"blue.500"}>
              Log in with Google
            </Text>
          </Flex>
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
