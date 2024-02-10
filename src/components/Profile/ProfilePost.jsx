import {
  Avatar,
  Box,
  Divider,
  Flex,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Comment from "../Comment/Comment";
import PostFooter from "../Feeds/PostFooter";

const ProfilePost = ({ img }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        {/* Overlay */}
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          left={0}
          bottom={0}
          right={0}
          bg={"blackAlpha.700"}
          transition={"all 0.3s ease"}
          zIndex={1}
          justifyContent={"center"}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
            <Flex>
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"} ml={2}>
                114
              </Text>
            </Flex>

            <Flex>
              <FaComment size={20} />
              <Text fontWeight={"bold"} ml={2}>
                32
              </Text>
            </Flex>
          </Flex>
        </Flex>

        {/*User's Posts */}
        <Image
          src={img}
          alt="Profile Post"
          w={"100%"}
          h={"100%"}
          objectFit={"cover"}
        />
      </GridItem>

      {/* Open Modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "3xl", md: "5xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"blackAlpha.700"} py={7} borderRadius={4}>
            <Flex
              gap={4}
              mx={"auto"}
              w={{ base: "90%", sm: "70%", md: "full" }}
              flexDirection={{ base: "column", md: "row" }}
            >
              <Box borderRadius={4} overflow={"hidden"} flex={1.5}>
                <Image src={img} alt="Profile Post Image" />
              </Box>

              <Flex flexDirection={"column"} flex={1} px={10}>
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex alignItems={"center"} gap={4}>
                    <Avatar src="/profile.jpg" name="sda" size={"sm"} />

                    <Text fontSize={12} fontWeight={"bold"}>
                      Steven Daye
                    </Text>
                  </Flex>

                  <Box
                    _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                    borderRadius={4}
                    p={1}
                  >
                    <MdDelete size={20} cursor={"pointer"} />
                  </Box>
                </Flex>

                <Divider bg={"gray.500"} my={4} />

                <VStack
                  w={"full"}
                  alignItems={"start"}
                  maxH={"350px"}
                  overflowY={"auto"}
                >
                  <Comment
                    profilePic="/profile.jpg"
                    createdAt={"12h ago"}
                    text={"Good job there"}
                    username={"sda"}
                  />

                  <Comment
                    profilePic="https://bit.ly/kent-c-dodds"
                    createdAt={"1d ago"}
                    text={"Nice Pic"}
                    username={"kentdodds"}
                  />

                  <Comment
                    profilePic="https://bit.ly/ryan-florence"
                    createdAt={"2d ago"}
                    text={"Well crafted"}
                    username={"ryanflorence"}
                  />

                  <Comment
                    profilePic="https://bit.ly/code-beast"
                    createdAt={"2d ago"}
                    text={"Well crafted"}
                    username={"codebeast"}
                  />
                </VStack>

                <Divider bg={"gray.800"} my={4} />

                <PostFooter isProfilePage={true} />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePost;
