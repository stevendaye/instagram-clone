import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar/Sidebar";
import { auth } from "../firebase/firebase";
import Navbar from "../components/Navbar/Navbar";

const Layout = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const { pathname } = useLocation();
  const renderSidebar = pathname !== "/auth" && user;
  const renderNavbar = !user && !loading && pathname !== "/auth";

  if (!user && loading) {
    return <PageLayoutLoader />;
  }

  return (
    <Flex flexDirection={renderNavbar ? "column" : "row"}>
      {renderSidebar && (
        <Box w={{ base: "70px", md: "240px" }}>
          <Sidebar />
        </Box>
      )}

      {renderNavbar && <Navbar />}

      <Box
        flex={1}
        w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }}
        mx={"auto"}
      >
        {children}
      </Box>
    </Flex>
  );
};

const PageLayoutLoader = () => (
  <Flex
    flexDirection={"column"}
    h={"100vh"}
    alignItems={"center"}
    justifyContent={"center"}
  >
    <Spinner size={"2xl"} />
  </Flex>
);

export default Layout;
