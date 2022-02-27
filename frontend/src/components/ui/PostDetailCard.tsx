import { Box, Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import CommentsList from "../comments/CommentsList";
import VoteSection from "./VoteSection";

const PostDetailCard = () => {
  return (
    <Box
      shadow="lg"
      p="15px"
      borderRadius="5px"
      w="100%"
      maxW="600px"
      bg="white"
    >
      <Box>
        <Flex p="5px" dir="column" justify="space-between">
          <Box>
            <Heading>Title</Heading>
            <Text fontSize="md">Creator name</Text>
            <Text fontSize="sm">26.02.2022</Text>
          </Box>
        </Flex>
        <Text mt="20px">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Exercitationem aperiam quis nemo neque laboriosam id qui vero sed,
          ratione voluptates facilis sunt enim beatae quam error architecto,
          earum hic eos praesentium tenetur quaerat debitis necessitatibus
          inventore. Commodi nisi eos autem enim quo deserunt amet quisquam
          voluptatum id quia. Temporibus dignissimos praesentium, ipsam fugit
          voluptatibus blanditiis labore quis mollitia ut sequi sit, accusantium
          recusandae, debitis aut aliquam eligendi odio ducimus repudiandae!
        </Text>

        <Box mt="40px">
          <Center>
            <Text fontSize="lg" fontWeight="semibold">
              Comments
            </Text>
          </Center>

          <Center mt="15px">
            <CommentsList />
          </Center>
        </Box>
      </Box>
    </Box>
  );
};

export default PostDetailCard;
