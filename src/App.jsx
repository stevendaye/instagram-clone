import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Layout from "./layout/Layout";
import Profile from "./components/Profile/Profile";
import PageNotFound from "./components/NotFound/PageNotFound";

function App() {
  const [user] = useAuthState(auth);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to={"/auth"} />} />
        <Route
          path="/auth"
          element={!user ? <Auth /> : <Navigate to={"/"} />}
        />
        <Route path="/:username" element={<Profile />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
