import { Box, Button, Icon, Text } from "@chakra-ui/react";
import { FaPlusCircle } from "react-icons/fa";
import AuthNavbar from "../../components/ui/navbar/AuthNavbar";

const Dashboard = () => {
  //const { data } = useQuery<SayHiQuery>(SayHiDocument);

  return (
    <Box>
      <AuthNavbar />

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
    </Box>
  );
};

export default Dashboard;
