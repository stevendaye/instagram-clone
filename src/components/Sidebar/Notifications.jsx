import { Box, Link, Tooltip } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { NotificationsLogo } from "../../commons/Icons";

const Notifications = () => {
  return (
    <>
      <Tooltip
        hasArrow
        label={"Notifications"}
        placement="right"
        ml={1}
        openDelay={300}
        display={{ base: "block", md: "none" }}
      >
        <Link
          display={"flex"}
          to={"/notifications"}
          as={RouterLink}
          alignItems={"center"}
          gap={5}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
          _hover={{ bg: "whiteAlpha.400" }}
          justifyContent={{ base: "center", md: "flex-start" }}
        >
          <NotificationsLogo />
          <Box display={{ base: "none", md: "block" }}>Notifications</Box>
        </Link>
      </Tooltip>
    </>
  );
};

export default Notifications;
