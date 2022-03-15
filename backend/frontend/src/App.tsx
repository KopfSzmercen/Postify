import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Overlay from "./components/ui/overlay/Overlay";
import Dashboard from "./pages/authPages/Dashboard";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import useIsAuth from "./utils/useIsAuth";

function App() {
  const loading = useIsAuth();
  return (
    <Box className="App" bg="gray.200" minH="100vh">
      {loading && <Overlay />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
}

export default App;
