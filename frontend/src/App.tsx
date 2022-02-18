import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/authPages/Dashboard";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Register from "./pages/Register";

function App() {
  return (
    <Box className="App" bg="gray.200" minH="100vh">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </Box>
  );
}

export default App;
