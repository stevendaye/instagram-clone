import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Comment from "../Comment/Comment";
import useCommentPost from "../../hooks/useCommentPost";
import { useEffect, useRef, useState } from "react";

const CommentsModal = ({ isOpen, onClose, post }) => {
  const { isCommenting, commentPost } = useCommentPost();
  const [comment, setComment] = useState("");
  const handleCommentPost = async (e) => {
    e.preventDefault();
    if (comment) {
      await commentPost(post.id, comment);
      setComment("");
    }
  };

  const commentsContainerRef = useRef(null);
  useEffect(() => {
    const scrollToBottom = () => {
      commentsContainerRef.current.scrollTop =
        commentsContainerRef.current.scrollHeight;
    };

    const timeOut = 1000;
    if (isOpen) {
      setTimeout(() => {
        scrollToBottom();
      }, timeOut);
    }
  }, [isOpen, post.comments.length]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
      <ModalOverlay />
      <ModalContent maxW={"400px"}>
        <ModalHeader>Comments</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6} bg={"blackAlpha.700"} py={7} borderRadius={4}>
          <Flex
            mb={4}
            gap={4}
            flexDirection={"column"}
            maxH={"250px"}
            overflowY={"auto"}
            ref={commentsContainerRef}
          >
            {post.comments.map((comment, id) => (
              <Comment key={id} comment={JSON.parse(comment)} />
            ))}
          </Flex>
          <form style={{ marginTop: "2rem" }} onSubmit={handleCommentPost}>
            <Input
              placeholder="Comments"
              size={"sm"}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <Flex w={"full"} justifyContent={"flex-end"}>
              <Button
                type="submit"
                ml={"auto"}
                size={"sm"}
                my={4}
                isLoading={isCommenting}
              >
                Post
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CommentsModal;
