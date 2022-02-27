import { Flex, Icon, IconButton, Stack, Text } from "@chakra-ui/react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  PostFragmentFragment,
  VoteDocument,
  VoteMutation
} from "../../generated";
import { cache } from "../..";

const VoteSection: React.FC<{
  post: PostFragmentFragment;
}> = ({ post }) => {
  const [sendVote] = useMutation<VoteMutation>(VoteDocument);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Stack textAlign="center" p="5px" pl="15px">
      <IconButton
        disabled={isLoading}
        aria-label="upvote"
        icon={<Icon as={FaArrowUp} />}
        colorScheme={`${post.voteStatus === 1 ? "green" : "gray"}`}
        onClick={async () => {
          if (post.voteStatus === 1) return;
          setIsLoading(true);
          const response = await sendVote({
            variables: {
              postId: post.id,
              value: 1
            }
          });
          setIsLoading(false);
          if (response.data?.vote.success) {
            cache.modify({
              id: cache.identify(post),
              fields: {
                voteStatus(existing) {
                  existing = 1;
                  return existing;
                },
                points(existing) {
                  if (existing === -1) existing = 1;
                  else existing = existing + 1;
                  return existing;
                }
              }
            });
          }
        }}
      />
      <Text>{post.points}</Text>
      <IconButton
        disabled={isLoading}
        aria-label="downvote"
        icon={<Icon as={FaArrowDown} />}
        colorScheme={`${post.voteStatus === -1 ? "green" : "gray"}`}
        onClick={async () => {
          if (post.voteStatus === -1) return;
          setIsLoading(true);
          const response = await sendVote({
            variables: {
              postId: post.id,
              value: -1
            }
          });
          setIsLoading(false);
          if (response.data?.vote.success) {
            cache.modify({
              id: cache.identify(post),
              fields: {
                voteStatus(existing) {
                  existing = -1;
                  return existing;
                },
                points(existing) {
                  if (existing === 1) existing = existing - 2;
                  else existing = existing - 1;
                  return existing;
                }
              }
            });
          }
        }}
      />
    </Stack>
  );
};

export default VoteSection;
