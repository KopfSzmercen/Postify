import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Text
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PostFragmentFragment } from "../../generated";
import VoteSection from "./VoteSection";
import { FaEdit } from "react-icons/fa";

const PostCard: React.FC<{
  post: PostFragmentFragment;
}> = ({ post }) => {
  const parsedDate = new Date(parseInt(post.createdAt))
    .toISOString()
    .substring(0, 10);

  const navigate = useNavigate();
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
            {post.canEdit === "true" && (
              <IconButton
                mt="5px"
                aria-label="edit"
                icon={<Icon ml="4px" as={FaEdit} />}
                colorScheme="linkedin"
                fontSize="25px"
                onClick={() => navigate(`post/${post.id}/edit`)}
              />
            )}
          </Box>
          <VoteSection post={post} />
        </Flex>
        <Text mt="10px">
          {post.text.length < 50
            ? post.text
            : `${post.text.substring(0, 50)}[...]`}
        </Text>

        <Flex mt="15px" align="center" justify="space-between">
          <Text>Comments: {post.commentsNumber}</Text>
          <Button
            colorScheme="yellow"
            onClick={() => navigate(`post/${post.id}`)}
          >
            View details
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default PostCard;
