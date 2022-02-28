import { Avatar, Box, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { PaginatedComment } from "../../generated";

const CommentsListItem: React.FC<{ comment: PaginatedComment }> = ({
  comment
}) => {
  return (
    <Box p="15px" bg="whiteAlpha.800" borderRadius="5px">
      <Stack>
        <Flex align="center">
          <Avatar name={comment.creatorName} />
          <Text ml="5px" fontWeight="semibold">
            {comment.creatorName}
          </Text>
        </Flex>
        <Text>{comment.updatedAt.toLocaleUpperCase()}</Text>
      </Stack>
      <Text mt="10px">{comment.text}</Text>
    </Box>
  );
};

export default CommentsListItem;
