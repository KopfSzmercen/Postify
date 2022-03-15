import { Box, Center, Heading } from "@chakra-ui/react";
import AddPostForm from "../../components/AddPostForm";

const CreatePostPage = () => {
  return (
    <Center>
      <Box
        bg="whiteAlpha.800"
        mt="30px"
        p="15px"
        w="90%"
        maxW="600px"
        textAlign="center"
        shadow="md"
        borderRadius="5px"
      >
        <Heading>Create post</Heading>
        <AddPostForm />
      </Box>
    </Center>
  );
};

export default CreatePostPage;
