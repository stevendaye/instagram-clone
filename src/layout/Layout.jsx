import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../commons/Sidebar";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <Flex justifyContent={"center"}>
      {pathname !== "/auth" && (
        <Box w={{ base: "70px", md: "240px" }}>
          <Sidebar />
        </Box>
      )}

      <Box flex={1} w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }}>
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;
