import { Box, Stack } from "@chakra-ui/react";
import { PostFragmentFragment } from "../../generated";
import AddCommentSection from "./AddCommentSection";
import CommentsListItem from "./CommentsListItem";

const CommentsList: React.FC<{ post: PostFragmentFragment }> = ({ post }) => {
  return (
    <Box w="90%">
      <Stack gap={5}>
        {post.paginatedComments?.map((comment) => {
          return <CommentsListItem comment={comment} key={comment.id} />;
        })}
      </Stack>

      <Box mt="15px" pb="20px">
        <AddCommentSection post={post} />
      </Box>
    </Box>
  );
};

export default CommentsList;
