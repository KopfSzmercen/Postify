import { Box, Stack } from "@chakra-ui/react";
import AddCommentSection from "./AddCommentSection";
import CommentsListItem from "./CommentsListItem";

const CommentsList = () => {
  return (
    <Box w="90%">
      <Stack gap={5}>
        <CommentsListItem />
        <CommentsListItem />
        <CommentsListItem />
        <CommentsListItem />
        <CommentsListItem />
        <CommentsListItem />
        <CommentsListItem />
        <CommentsListItem />
      </Stack>

      <Box mt="15px">
        <AddCommentSection />
      </Box>
    </Box>
  );
};

export default CommentsList;
