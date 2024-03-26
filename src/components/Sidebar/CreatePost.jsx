import {
  Box,
  Button,
  CloseButton,
  Flex,
  Image,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { CreatePostLogo } from "../../commons/Icons";
import { BsFillImageFill } from "react-icons/bs";
import { useRef, useState } from "react";
import usePreviewImg from "../../hooks/usePreviewImg";
import useCreatePost from "../../hooks/useCreatePost";
import useShowToast from "../../hooks/useShowToast";

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [caption, setCaption] = useState();
  const imgRef = useRef(null);
  const { selectedFile, setSelectedFile, handleImageChange } = usePreviewImg();
  const { isLoading, handleCreatePost } = useCreatePost();
  const showToast = useShowToast();

  const handlePostCreation = async () => {
    try {
      await handleCreatePost(selectedFile, caption);
      onClose();
      setCaption("");
      setSelectedFile(null);
    } catch (error) {
      showToast("Error", error.mesage, "error");
    }
  };

  return (
    <>
      <Tooltip
        hasArrow
        label={"Create Post"}
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
          <CreatePostLogo />
          <Box display={{ base: "none", md: "block" }}>Create</Box>
        </Link>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} bg={"blackAlpha.700"} py={7} borderRadius={4}>
            <Textarea
              placeholder="Post caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />

            <Input
              type="file"
              ref={imgRef}
              hidden
              onChange={handleImageChange}
            />

            <BsFillImageFill
              style={{
                marginTop: "15px",
                marginLeft: "5px",
                cursor: "pointer",
              }}
              size={16}
              onClick={() => imgRef.current.click()}
            />

            {selectedFile && (
              <Flex
                mt={5}
                w={"full"}
                justifyContent={"center"}
                position={"relative"}
              >
                <Image src={selectedFile} alt="Selected Image" />
                <CloseButton
                  position={"absolute"}
                  top={2}
                  right={2}
                  onClick={() => setSelectedFile(null)}
                  backgroundColor={"blackAlpha.500"}
                  borderRadius={"100%"}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter bg={"blackAlpha.700"} py={7}>
            <Button mr={3} isLoading={isLoading} onClick={handlePostCreation}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
