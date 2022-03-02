import { useMutation } from "@apollo/client";
import { Box, Text, Input, Textarea, Button, Icon } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { cache } from "..";
import {
  CreatePostDocument,
  CreatePostMutation,
  PostFragmentFragmentDoc
} from "../generated";

const AddPostForm = () => {
  const [isTitleError, setIsTitleError] = useState(false);
  const [isTextError, setIsTextError] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const [sendPost, { loading }] = useMutation<CreatePostMutation>(
    CreatePostDocument,
    {
      update(cache, { data }) {
        if (data?.createPost.success) {
          cache.modify({
            fields: {
              getPaginatedPosts(existing) {
                const newPostRef = cache.writeFragment({
                  data: data?.createPost.returnedPost,
                  fragment: PostFragmentFragmentDoc
                });

                return { ...existing, posts: [newPostRef, ...existing.posts] };
              }
            }
          });
        }
      }
    }
  );

  const navigate = useNavigate();
  return (
    <Box mt="15px" p="10px">
      <Input placeholder="Post title" ref={titleRef} />
      {isTitleError && (
        <Text mt="10px" fontSize="sm" color="red.500">
          Title has to be between 5 and 40 characters long.
        </Text>
      )}

      <Textarea
        mt="10px"
        placeholder="What are you thinking about right now..."
        ref={textRef}
      />
      {isTextError && (
        <Text mt="10px" fontSize="sm" color="red.500">
          Post must have text of length between 1 and 5000 characters.
        </Text>
      )}

      <Button
        mt="10px"
        colorScheme="pink"
        rightIcon={<Icon as={FaPlus} />}
        onClick={async () => {
          const titleLength = titleRef.current!.value.length;
          const textLength = textRef.current!.value.length;

          if (titleLength < 5 || titleLength > 40) setIsTitleError(true);
          else setIsTitleError(false);

          if (textLength < 1 || textLength > 5000) setIsTextError(true);
          else setIsTextError(false);
          if (isTitleError || isTextError) return;

          const result = await sendPost({
            variables: {
              title: titleRef.current!.value,
              text: textRef.current!.value
            }
          });

          if (result.data?.createPost.success) {
            navigate("/dashboard", { replace: true });
          }
        }}
      >
        Create
      </Button>
    </Box>
  );
};

export default AddPostForm;
