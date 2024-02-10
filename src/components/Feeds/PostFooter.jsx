import { useState } from "react";
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

const PostFooter = ({ username, isProfilePage }) => {
  const [like, setLike] = useState(false);
  const [likeCounts, setLikeCounts] = useState(1000);
  const [clickComment, setClickComment] = useState(false);

  const handleLike = () => {
    if (like) {
      setLike(false);
      setLikeCounts(likeCounts - 1);
      return;
    }

    setLike(true);
    setLikeCounts(likeCounts + 1);
  };

  return (
    <Box mb={10} marginTop={"auto"}>
      <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
        <Box cursor={"pointer"} fontSize={18} onClick={handleLike}>
          {!like ? <LikeIcon /> : <UnlikeIcon />}
        </Box>

        <Box
          cursor={"pointer"}
          fontSize={18}
          onClick={() => setClickComment(!clickComment)}
        >
          <CommentIcon />
        </Box>
      </Flex>

      <Text fontWeight={600} fontSize={"sm"}>
        {likeCounts} likes
      </Text>

      {!isProfilePage && (
        <>
          <Text fontWeight={700} fontSize={"sm"}>
            {username}{" "}
            <Text as="span" fontWeight={400}>
              It&apos;s Alright
            </Text>
          </Text>
          <Text fontSize={"sm"} color={"gray"}>
            View all 1,000 comments
          </Text>
        </>
      )}

      {clickComment && (
        <Box>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={2}
            w={"full"}
          >
            <InputGroup>
              <Input
                variant={"flushed"}
                placeholder="Add a comment"
                fontSize={14}
              />
              <InputRightElement>
                <Button
                  fontSize={14}
                  color={"Blue.500"}
                  fontWeight={600}
                  _hover={{ color: "white" }}
                  bg={"transparent"}
                  cursor={"pointer"}
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
