import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { PostFragmentFragment } from "../../generated";
import VoteSection from "./VoteSection";

const PostCard: React.FC<{
  // post: {
  //   __typename?: "Post" | undefined;
  //   id: number;
  //   createdAt: string;
  //   updatedAt: string;
  //   title: string;
  //   text: string;
  //   points: number;
  //   voteStatus: number | null | undefined;
  //   creator: {
  //     __typename?: "User" | undefined;
  //     id: number;
  //     username: string;
  //   };
  // };
  post: PostFragmentFragment;
}> = ({ post }) => {
  const parsedDate = new Date(parseInt(post.createdAt))
    .toISOString()
    .substring(0, 10);
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
            <Heading>{post.title}</Heading>
            <Text fontSize="md">{post.creator.username}</Text>
            <Text fontSize="sm">{parsedDate}</Text>
          </Box>
          <VoteSection post={post} />
        </Flex>
        <Text mt="10px">
          {post.text.length < 50
            ? post.text
            : `${post.text.substring(0, 50)}[...]`}
        </Text>

        <Flex mt="15px" align="center" justify="space-between">
          <Text>Comments: 12</Text>
          <Button colorScheme="yellow">View details</Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default PostCard;
