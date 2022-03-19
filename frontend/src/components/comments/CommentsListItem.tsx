import { useMutation } from "@apollo/client";
import {
  Avatar,
  Box,
  Flex,
  Icon,
  IconButton,
  Stack,
  Text
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ImBin2 } from "react-icons/im";
import { cache, currentPostVar } from "../..";
import {
  CommentFragmentFragment,
  DeleteCommentDocument,
  DeleteCommentMutation,
  PostFragmentFragment
} from "../../generated";

const CommentsListItem: React.FC<{ comment: CommentFragmentFragment }> = ({
  comment
}) => {
  const [deleteComment] = useMutation<DeleteCommentMutation>(
    DeleteCommentDocument
  );
  const [isLoading, setIsLoading] = useState(false);
  const parsedDate = new Date(comment.updatedAt);
  const formatDate =
    parsedDate.getDay() +
    "." +
    parsedDate.getMonth() +
    "." +
    parsedDate.getFullYear() +
    " " +
    parsedDate.getHours() +
    ":" +
    parsedDate.getMinutes();

  return (
    <Box p="15px" bg="whiteAlpha.800" borderRadius="5px">
      <Stack>
        <Flex align="center">
          <Avatar name={comment.creatorName} />
          <Text ml="5px" fontWeight="semibold">
            {comment.creatorName}
          </Text>
          {comment.canEdit === "true" && (
            <IconButton
              ml="auto"
              mt="5px"
              colorScheme="red"
              aria-label="delete"
              disabled={isLoading}
              icon={<Icon as={ImBin2} />}
              onClick={async () => {
                setIsLoading(true);
                const response = await deleteComment({
                  variables: {
                    commentId: comment.id
                  }
                });
                setIsLoading(false);
                if (response.data?.deleteComment.success) {
                  cache.evict({ id: cache.identify(comment) });

                  if (currentPostVar() !== null) {
                    cache.modify({
                      id: cache.identify(
                        currentPostVar() as PostFragmentFragment
                      ),
                      fields: {
                        commentsNumber(current) {
                          return current - 1;
                        }
                      }
                    });
                  }
                }
              }}
            />
          )}
        </Flex>
        <Text>{formatDate}</Text>
      </Stack>
      <Text mt="10px">{comment.text}</Text>
    </Box>
  );
};

export default CommentsListItem;
