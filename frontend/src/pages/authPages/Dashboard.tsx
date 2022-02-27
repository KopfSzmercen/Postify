import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import AuthNavbar from "../../components/ui/navbar/AuthNavbar";
import PostDetailCard from "../../components/ui/PostDetailCard";
import { MainDashboardPage } from "./MainDashboardPage";
import PostDetailPage from "./PostDetailPage";
import Users from "./Users";

const Dashboard = () => {
  // const navigate = useNavigate();
  // const isLoggedIn = useStore((state) => state.isLoggedIn);

  // useEffect(() => {
  //   if (!isLoggedIn) navigate("/login", { replace: true });
  // }, [isLoggedIn]);

  return (
    <Box>
      <AuthNavbar />

      <Routes>
        <Route path="/" element={<MainDashboardPage />} />
        <Route path="users" element={<Users />} />
        <Route path="post/:postId" element={<PostDetailPage />} />
      </Routes>
    </Box>
  );
};

export default Dashboard;
