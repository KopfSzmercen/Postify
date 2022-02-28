import { Box, Center, Icon, IconButton } from "@chakra-ui/react";
import React, { useRef } from "react";
import { FaArrowUp } from "react-icons/fa";
import PostDetailCard from "../../components/ui/PostDetailCard";

const PostDetailPage = () => {
  const scrollToTarget = useRef<HTMLDivElement>(null);
  const scrollUp = () => {
    scrollToTarget.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box p="30px">
      <Box ref={scrollToTarget} position="absolute" top="0"></Box>
      <Center>
        <PostDetailCard />
        <IconButton
          position="fixed"
          bottom="30px"
          right="30px"
          size="lg"
          fontSize="30px"
          aria-label="scroll-up"
          colorScheme="pink"
          icon={<Icon as={FaArrowUp} />}
          onClick={() => scrollUp()}
        />
      </Center>
    </Box>
  );
};

export default PostDetailPage;
