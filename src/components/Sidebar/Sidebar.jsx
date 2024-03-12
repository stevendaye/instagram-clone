import { Box, Button, Flex, Link, Tooltip } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import {
  InstagramLogo as InstaIcon,
  InstagramMobileLogo as InstaMobIcon,
} from "../../commons/Icons";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import SidebarItems from "./SidebarItems";

const Sidebar = () => {
  const { logout, isLoggingOut } = useLogout();

  return (
    <Box
      h={"100vh"}
      position={"sticky"}
      top={0}
      left={0}
      border={"1px solid"}
      borderColor={"whiteAlpha.300"}
      py={8}
      px={{ base: 2, md: 4 }}
    >
      <Flex flexDirection={"column"} gap={10} w={"full"} height={"full"}>
        <Link
          to={"/"}
          as={RouterLink}
          pl={2}
          display={{ base: "none", md: "block" }}
          cursor={"pointer"}
        >
          <InstaIcon />
        </Link>

        <Link
          to={"/"}
          as={RouterLink}
          p={2}
          display={{ base: "block", md: "none" }}
          cursor={"pointer"}
          borderRadius={6}
          w={10}
          _hover={{
            bg: "whiteAlpha.300",
          }}
        >
          <InstaMobIcon />
        </Link>

        <Flex flexDirection={"column"} gap={5} cursor={"pointer"}>
          <SidebarItems />
        </Flex>

        <Tooltip
          hasArrow
          label="Log Out"
          placement="right"
          ml={1}
          openDelay={300}
          display={{ base: "block", md: "none" }}
        >
          <Flex
            as={RouterLink}
            alignItems={"center"}
            gap={5}
            borderRadius={6}
            p={2}
            w={{ base: 10, md: "full" }}
            mt={"auto"}
            _hover={{ bg: "whiteAlpha.400" }}
            onClick={logout}
          >
            <BiLogOut size={25} />
            <Button
              variant={"ghost"}
              isLoading={isLoggingOut}
              display={{ base: "none", md: "block" }}
              _hover={{ bg: "transparent" }}
            >
              Log Out
            </Button>
          </Flex>
        </Tooltip>
      </Flex>
    </Box>
  );
};

export default Sidebar;
