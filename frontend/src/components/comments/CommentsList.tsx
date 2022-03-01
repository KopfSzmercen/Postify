import { useLazyQuery } from "@apollo/client";
import { Box, Button, Center, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { cache } from "../..";
import {
  GetMoreCommentsDocument,
  GetMoreCommentsQuery,
  PostFragmentFragment
} from "../../generated";
import AddCommentSection from "./AddCommentSection";
import CommentsListItem from "./CommentsListItem";

const CommentsList: React.FC<{ post: PostFragmentFragment }> = ({ post }) => {
  const [hasMore, setHasMore] = useState(
    post.paginatedComments!.length < post.commentsNumber
  );

  const [getMoreComments, { loading }] = useLazyQuery<GetMoreCommentsQuery>(
    GetMoreCommentsDocument
  );

  return (
    <Box w="90%">
      <Stack gap={5}>
        {post.paginatedComments?.map((comment) => {
          return <CommentsListItem comment={comment} key={comment.id} />;
        })}
      </Stack>

      {hasMore && (
        <Center mt="15px">
          <Button
            disabled={loading}
            colorScheme="linkedin"
            onClick={async () => {
              const response = await getMoreComments({
                variables: {
                  postId: post.id,
                  cursor:
                    post.paginatedComments![post.paginatedComments!.length - 1]
                      .updatedAt
                }
              });

              if (response.data?.getMoreComments.success) {
                cache.modify({
                  id: cache.identify(post),
                  fields: {
                    paginatedComments(existing) {
                      const updated = [
                        ...existing,
                        ...response.data!.getMoreComments.paginatedComments!
                      ];
                      return updated;
                    },
                    hasMoreComments() {
                      return response.data?.getMoreComments.hasMoreComments;
                    }
                  }
                });
                setHasMore(response.data?.getMoreComments.hasMoreComments);
              }
            }}
          >
            Load more ...
          </Button>
        </Center>
      )}

      <Box mt="15px" pb="20px">
        <AddCommentSection post={post} />
      </Box>
    </Box>
  );
};

export default CommentsList;
