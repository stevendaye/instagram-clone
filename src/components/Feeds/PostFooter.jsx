import { useEffect, useRef, useState } from "react";
import {
  Box,
  Flex,
  InputGroup,
  Input,
  Text,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import {
  CommentLogo as CommentIcon,
  NotificationsLogo as LikeIcon,
  UnlikeLogo as UnlikeIcon,
} from "../../commons/Icons";
import useCommentPost from "../../hooks/useCommentPost";
import useAuthStore from "../../store/useAuthStore";
import useLikePost from "../../hooks/useLikePost";
import { timeAgo } from "../../utils/timeAgo";

const PostFooter = ({ post, owner, isProfilePage }) => {
  const authUser = useAuthStore((state) => state.user);
  const { likes, hasLiked, handleLikePost } = useLikePost(post);
  const [clickComment, setClickComment] = useState(false);
  const [comment, setComment] = useState("");
  const { isCommenting, commentPost } = useCommentPost();
  const commentRef = useRef(null);

  const handleClickComment = () => {
    setClickComment((click) => {
      return !click;
    });
  };

  useEffect(() => {
    if (clickComment) {
      commentRef.current.focus();
    }
  }, [clickComment]);

  const handleComment = async () => {
    if (!comment) return;
    await commentPost(post.id, comment);
    setComment("");
  };

  return (
    <Box mb={10} marginTop={"auto"}>
      <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
        <Box cursor={"pointer"} fontSize={18} onClick={handleLikePost}>
          {!hasLiked ? <LikeIcon /> : <UnlikeIcon />}
        </Box>

        <Box cursor={"pointer"} fontSize={18} onClick={handleClickComment}>
          <CommentIcon />
        </Box>
      </Flex>

      <Text fontWeight={600} fontSize={"sm"}>
        {likes} likes
      </Text>

      {isProfilePage && (
        <Text fontSize={12} color={"gray"}>
          Posted {timeAgo(post.createdAt)} ago
        </Text>
      )}

      {!isProfilePage && (
        <>
          <Text fontWeight={700} fontSize={"sm"}>
            {owner?.username}{" "}
            <Text as="span" fontWeight={400}>
              {post.caption}
            </Text>
          </Text>

          {post.comments.length > 0 && (
            <Text fontSize={"sm"} color={"gray"}>
              View all {post.comments.length} comments
            </Text>
          )}
        </>
      )}

      {clickComment && authUser && (
        <Box>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={2}
            w={"full"}
          >
            <InputGroup>
              <Input
                type="text"
                variant={"flushed"}
                placeholder="Add a comment"
                fontSize={14}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                ref={commentRef}
              />
              <InputRightElement>
                <Button
                  fontSize={14}
                  color={"Blue.500"}
                  fontWeight={600}
                  _hover={{ color: "white" }}
                  bg={"transparent"}
                  cursor={"pointer"}
                  isLoading={isCommenting}
                  onClick={handleComment}
                >
                  Post
                </Button>
              </InputRightElement>
            </InputGroup>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default PostFooter;
