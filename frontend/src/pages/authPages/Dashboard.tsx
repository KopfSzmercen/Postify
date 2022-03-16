import { Box } from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AuthNavbar from "../../components/ui/navbar/AuthNavbar";
import Overlay from "../../components/ui/overlay/Overlay";

import { MainDashboardPage } from "./MainDashboardPage";

import Users from "./Users";

const PostDetailPage = lazy(() => import("./PostDetailPage"));
const CreatePostPage = lazy(() => import("./CreatePostPage"));
const Notifications = lazy(() => import("./Notifications"));
const EditPostPage = lazy(() => import("./EditPostPage"));

const Dashboard = () => {
  // useIsAuth();
  return (
    <Suspense fallback={<Overlay />}>
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
    </Suspense>
  );
};

export default Dashboard;
