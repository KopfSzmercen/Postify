import { Box } from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Overlay from "./components/ui/overlay/Overlay";
import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";
import useIsAuth from "./utils/useIsAuth";

const Dashboard = lazy(() => import("./pages/authPages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

function App() {
  const loading = useIsAuth();
  return (
    <Suspense fallback={<Overlay />}>
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
    </Suspense>
  );
}

export default App;
