import { Box, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <Box
      width="100%"
      maxWidth="180px"
      cursor="pointer"
      aria-label="/"
      padding="5px 10px 10px 0px"
      borderRadius="10px"
      onClick={() => navigate("/")}
    >
      <Heading color="whiteAlpha.900">Postify</Heading>
      <Box bgColor="blue.500" height="15px" mt="5px" width="105%"></Box>
    </Box>
  );
};

export default Logo;
