import { Box, Center } from "@chakra-ui/react";
import React from "react";
import PostDetailCard from "../../components/ui/PostDetailCard";

const PostDetailPage = () => {
  return (
    <Box p="30px">
      <Center>
        <PostDetailCard />
      </Center>
    </Box>
  );
};

export default PostDetailPage;
