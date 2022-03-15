import { Box, Center, Spinner } from "@chakra-ui/react";

const Overlay = () => {
  return (
    <Box
      w="100%"
      h="100%"
      bg="blackAlpha.900"
      position="absolute"
      zIndex="100000"
    >
      <Center mt="30%">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.100"
          color="blue.500"
          size="xl"
        />
      </Center>
    </Box>
  );
};

export default Overlay;
