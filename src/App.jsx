import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Layout from "./layout/Layout";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/:username" element={<Profile />} />
      </Routes>
    </Layout>
  );
}

export default App;
