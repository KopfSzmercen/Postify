import { useMutation } from "@apollo/client";
import { Flex, Icon, IconButton, Textarea } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { cache } from "../..";
import {
  AddCommentDocument,
  AddCommentMutation,
  PostFragmentFragment
} from "../../generated";

const AddCommentSection: React.FC<{ post: PostFragmentFragment }> = ({
  post
}) => {
  const [sendComment] = useMutation<AddCommentMutation>(AddCommentDocument);
  const [isLoading, setIsLoading] = useState(false);
  const [isInputError, setIsInputError] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <Flex align="center" color="white" bg="whiteAlpha.100" p="15px">
      <Textarea
        placeholder="Add a comment"
        colorScheme="linkedin"
        ref={inputRef}
        isRequired={true}
        variant="flushed"
        isInvalid={isInputError}
        disabled={isLoading}
      />
      <IconButton
        disabled={isLoading}
        ml="10px"
        aria-label="add a comment"
        icon={<Icon as={FaPlus} />}
        colorScheme="linkedin"
        onClick={async () => {
          if (inputRef.current!.value.length < 1) {
            setIsInputError(true);
            return;
          }
          setIsLoading(true);
          const result = await sendComment({
            variables: {
              postId: post.id,
              text: inputRef.current!.value
            }
          });
          setIsLoading(false);

          if (result.data?.addComment.success) {
            inputRef.current!.value = "";
            cache.modify({
              id: cache.identify(post),
              fields: {
                commentsNumber(existing) {
                  return existing + 1;
                },
                paginatedComments(existing) {
                  return [...existing, result.data?.addComment.returnedComment];
                }
              }
            });
          }
        }}
      />
    </Flex>
  );
};

export default AddCommentSection;
