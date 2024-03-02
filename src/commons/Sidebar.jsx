import { Avatar, Box, Button, Flex, Link, Tooltip } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import {
  CreatePostLogo as PostIcon,
  InstagramLogo as InstaIcon,
  InstagramMobileLogo as InstaMobIcon,
  NotificationsLogo as NotifyIcon,
  SearchLogo as SearchIcon,
} from "./Icons";
import { AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../hooks/useLogout";

import useAuthStore from "../store/useAuthStore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";

const Sidebar = () => {
  const { logout, isLoggingOut } = useLogout();
  const authUser = useAuthStore((state) => state.user);
  const [user] = useAuthState(auth);

  const sidebarItems = [
    {
      icon: <AiFillHome size={25} />,
      text: "Home",
      link: "/",
    },
    {
      icon: <SearchIcon />,
      text: "Search",
      link: "/search",
    },
    {
      icon: <NotifyIcon />,
      text: "Notifications",
      link: "/notification",
    },
    {
      icon: <PostIcon />,
      text: "Create",
      link: "/post",
    },
    {
      icon: (
        <Avatar
          size={"sm"}
          name="Steven Daye"
          src={authUser?.profilePicUrl || user.photoURL}
        />
      ),
      text: "Profile",
      link: authUser?.username || user.email.split("@")[0],
    },
  ];

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
          {sidebarItems.map((item, index) => (
            <Tooltip
              key={index}
              hasArrow
              label={item.text}
              placement="right"
              ml={1}
              openDelay={300}
              display={{ base: "block", md: "none" }}
            >
              <Link
                display={"flex"}
                to={item.link || null}
                as={RouterLink}
                alignItems={"center"}
                gap={5}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: "full" }}
                _hover={{ bg: "whiteAlpha.400" }}
              >
                {item.icon}
                <Box display={{ base: "none", md: "block" }}>{item.text}</Box>
              </Link>
            </Tooltip>
          ))}
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
