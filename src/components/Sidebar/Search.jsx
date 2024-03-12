import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { SearchLogo } from "../../commons/Icons";
import useSearchUser from "../../hooks/useSearchUser";
import { useRef } from "react";
import SuggestedUser from "../Suggested/SuggestedUser";

const Search = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, user, getUserProfile, setUser } = useSearchUser();
  const searchRef = useRef(null);

  const handleSearchUser = (e) => {
    e.preventDefault();
    searchRef.current.value && getUserProfile(searchRef.current.value);
  };

  return (
    <>
      <Tooltip
        hasArrow
        label={"Search"}
        placement="right"
        ml={1}
        openDelay={300}
        display={{ base: "block", md: "none" }}
      >
        <Link
          display={"flex"}
          as={RouterLink}
          alignItems={"center"}
          gap={5}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
          _hover={{ bg: "whiteAlpha.400" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
        >
          <SearchLogo />
          <Box display={{ base: "none", md: "block" }}>Search</Box>
        </Link>
      </Tooltip>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInLeft"
        size={"2xl"}
      >
        <ModalOverlay />
        <ModalContent bg={"black"} border={"2px solid gray"}>
          <ModalHeader>Search User</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <form onSubmit={handleSearchUser}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input placeholder={"stevendaye"} ref={searchRef} />
              </FormControl>

              <Flex w={"full"} justifyContent={"flex-end"}>
                <Button
                  type="submit"
                  ml={"auto"}
                  size={"sm"}
                  my={4}
                  isLoading={isLoading}
                >
                  Search
                </Button>
              </Flex>
            </form>

            {user && <SuggestedUser user={user} setUser={setUser} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Search;
