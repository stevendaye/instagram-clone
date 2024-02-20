import { useState } from "react";
import {
  Alert,
  AlertIcon,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import useManualSignUp from "../../hooks/useManualSignUp";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { error, loading, signUp } = useManualSignUp();

  const handleInputs = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Input
        type="email"
        name="email"
        fontSize={14}
        placeholder="Email"
        value={inputs.email}
        onChange={handleInputs}
      />

      <Input
        type="text"
        name="fullName"
        fontSize={14}
        placeholder="Fullname"
        value={inputs.fullName}
        onChange={handleInputs}
      />

      <Input
        type="text"
        name="username"
        fontSize={14}
        placeholder="Username"
        value={inputs.username}
        onChange={handleInputs}
      />

      <InputGroup>
        <Input
          type={showPassword ? "text" : "password"}
          name="password"
          fontSize={14}
          placeholder="Password"
          value={inputs.password}
          onChange={handleInputs}
        />
        <InputRightElement h={"full"}>
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>

      {error && (
        <Alert status="error" fontSize={13} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>
      )}

      <Button
        w={"full"}
        colorScheme="blue"
        size={"sm"}
        fontSize={14}
        isLoading={loading}
        onClick={() => {
          signUp(inputs);
        }}
      >
        Sign Up
      </Button>
    </>
  );
};

export default SignUp;
