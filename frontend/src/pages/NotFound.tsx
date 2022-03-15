import { Box, Flex, Button, Center, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/ui/Logo";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box minHeight="100vh">
      <Flex
        justifyContent="space-between"
        flexDir={["column", "row"]}
        p={["15px 30px", "5px 30px"]}
        w="100%"
        bg="blackAlpha.800"
      >
        <Logo />
        <Box mt={["0px", "17px"]}>
          <Button colorScheme="yellow" onClick={() => navigate("/login")}>
            Log in
          </Button>
          <Button
            colorScheme="yellow"
            ml="20px"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </Box>
      </Flex>
      <Center>
        <Heading mt="30px">Page not found...</Heading>
      </Center>
    </Box>
  );
};

export default NotFound;
