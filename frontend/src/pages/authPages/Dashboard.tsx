import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import AuthNavbar from "../../components/ui/navbar/AuthNavbar";
import useIsAuth from "../../utils/useIsAuth";
import CreatePostPage from "./CreatePostPage";
import EditPostPage from "./EditPostPage";
import { MainDashboardPage } from "./MainDashboardPage";
import Notifications from "./Notifications";
import PostDetailPage from "./PostDetailPage";
import Users from "./Users";

const Dashboard = () => {
  useIsAuth();
  return (
    <Box>
      <AuthNavbar />
      <Routes>
        <Route path="/" element={<MainDashboardPage />} />
        <Route path="users" element={<Users />} />
        <Route path="post/:postId" element={<PostDetailPage />} />
        <Route path="createPost" element={<CreatePostPage />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="post/:postId/edit" element={<EditPostPage />} />
      </Routes>
    </Box>
  );
};

export default Dashboard;
