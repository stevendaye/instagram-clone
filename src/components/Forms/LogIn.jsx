import { useState } from "react";
import { Alert, AlertIcon, Button, Input } from "@chakra-ui/react";
import useLogin from "../../hooks/useLogin";

const LogIn = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { login, loading, error } = useLogin();

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
        type="password"
        name="password"
        fontSize={14}
        placeholder="Password"
        value={inputs.password}
        onChange={handleInputs}
      />

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
        onClick={() => login(inputs)}
      >
        Log In
      </Button>
    </>
  );
};

export default LogIn;
