import { Box, Button, Icon, Text } from "@chakra-ui/react";
import { FaPlusCircle } from "react-icons/fa";
import { Route, Routes } from "react-router-dom";
import AuthNavbar from "../../components/ui/navbar/AuthNavbar";
import Users from "./Users";

const MainDashboardPage = () => {
  return (
    <Box mt="20px" ml="30px">
      <Text fontSize="xl" fontWeight="semibold">
        What is on your mind?
      </Text>
      <Button
        mt="5px"
        aria-label="add-post"
        leftIcon={<Icon as={FaPlusCircle} />}
        colorScheme="pink"
      >
        Add a post
      </Button>
    </Box>
  );
};

const Dashboard = () => {
  //const { data } = useQuery<SayHiQuery>(SayHiDocument);

  return (
    <Box>
      <AuthNavbar />

      <Routes>
        <Route path="/" element={<MainDashboardPage />} />
        <Route path="users" element={<Users />} />
      </Routes>
    </Box>
  );
};

export default Dashboard;
