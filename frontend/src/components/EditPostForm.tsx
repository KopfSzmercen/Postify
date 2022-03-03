import { useMutation } from "@apollo/client";
import {
  Center,
  Heading,
  Stack,
  Input,
  Textarea,
  Button,
  Text
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cache } from "..";
import { PostFragmentFragment } from "../generated";
import { EditPostMutation, EditPostDocument } from "../generated";

const EditPostForm: React.FC<{ post: PostFragmentFragment }> = ({ post }) => {
  const [isTitleError, setIsTitleError] = useState(false);
  const [isTextError, setIsTextError] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const [editPost] = useMutation<EditPostMutation>(EditPostDocument);
  const navigate = useNavigate();

  return (
    <Center
      w="100%"
      maxW="500px"
      bg="whiteAlpha.900"
      borderRadius="5px"
      p="25px"
      display="flex"
      flexDir="column"
    >
      <Heading>Edit post</Heading>

      <Stack mt="25px" w="100%">
        <Input defaultValue={post?.title} ref={titleRef} />
        {isTitleError && (
          <Text mt="10px" fontSize="sm" color="red.500">
            Title has to be between 5 and 40 characters long.
          </Text>
        )}

        <Textarea defaultValue={post?.text} mt="10px" ref={textRef} />
        {isTextError && (
          <Text mt="10px" fontSize="sm" color="red.500">
            Post must have text of length between 1 and 5000 characters.
          </Text>
        )}
      </Stack>
      <Button
        mt="25px"
        colorScheme="pink"
        onClick={async () => {
          const titleLength = titleRef.current!.value.length;
          const textLength = textRef.current!.value.length;

          if (titleLength < 5 || titleLength > 40) setIsTitleError(true);
          else setIsTitleError(false);

          if (textLength < 1 || textLength > 5000) setIsTextError(true);
          else setIsTextError(false);
          if (isTitleError || isTextError) return;

          const response = await editPost({
            variables: {
              postId: post.id,
              title: titleRef.current!.value,
              text: textRef.current!.value
            }
          });

          if (response.data?.editPost.success) {
            cache.modify({
              id: cache.identify(post),
              fields: {
                title() {
                  return titleRef.current!.value;
                },
                text() {
                  return textRef.current!.value;
                }
              }
            });
            navigate("/dashboard", { replace: true });
          }
        }}
      >
        Save changes
      </Button>
    </Center>
  );
};

export default EditPostForm;
