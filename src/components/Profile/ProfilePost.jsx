import {
  Avatar,
  Button,
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
import useUserProfileStore from "../../store/useUserProfileStore";
import useAuthStore from "../../store/useAuthStore";
import useDeletePost from "../../hooks/useDeletePost";
import Caption from "../Comment/Caption";

const ProfilePost = ({ post }) => {
  const authUser = useAuthStore((state) => state.user);
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const { isDeleting, deleteUserPost } = useDeletePost();
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (isDeleting) return;

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
                {post.likes.length}
              </Text>
            </Flex>

            <Flex>
              <FaComment size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post.comments.length}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        {/*User's Posts */}
        <Image
          src={post.imageURL}
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
              minW={"30vh"}
            >
              <Flex
                borderRadius={4}
                overflow={"hidden"}
                flex={1.5}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Image src={post.imageURL} alt="Profile Post Image" />
              </Flex>

              <Flex flexDirection={"column"} flex={1} px={10}>
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex alignItems={"center"} gap={4}>
                    <Avatar
                      src={userProfile.profilePicUrl}
                      name="sda"
                      size={"sm"}
                    />

                    <Text fontSize={12} fontWeight={"bold"}>
                      {userProfile.username}
                    </Text>
                  </Flex>

                  {authUser?.uuid === userProfile.uuid && (
                    <Button
                      size={"sm"}
                      background={"transparent"}
                      _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                      borderRadius={4}
                      p={1}
                      isLoading={isDeleting}
                      onClick={() => deleteUserPost(post.id)}
                    >
                      <MdDelete size={20} cursor={"pointer"} />
                    </Button>
                  )}
                </Flex>

                <Divider bg={"gray.500"} my={4} />

                <VStack
                  w={"full"}
                  alignItems={"start"}
                  maxH={"350px"}
                  overflowY={"auto"}
                >
                  {post.caption && <Caption post={post} />}
                  {post.comments.map((comment, id) => (
                    <Comment key={id} comment={JSON.parse(comment)} />
                  ))}
                </VStack>

                <Divider bg={"gray.800"} my={4} />

                <PostFooter post={post} isProfilePage={true} />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePost;
