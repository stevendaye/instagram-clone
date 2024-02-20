import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Layout from "./layout/Layout";
import Profile from "./components/Profile/Profile";

function App() {
  const [isAuthenticated] = useAuthState(auth);

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to={"/auth"} />}
        />
        <Route
          path="/auth"
          element={!isAuthenticated ? <Auth /> : <Navigate to={"/"} />}
        />
        <Route path="/:username" element={<Profile />} />
      </Routes>
    </Layout>
  );
}

export default App;
