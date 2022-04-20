import { useMutation } from "@apollo/client";
import {
  Button,
  Center,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cache } from "../..";
import {
  DeletePostDocument,
  DeletePostMutation,
  PostFragmentFragment
} from "../../generated";

const ConfirmDeleteModal: React.FC<{
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  post: PostFragmentFragment;
}> = ({ isOpen, onClose, post }) => {
  const [deletePost] = useMutation<DeletePostMutation>(DeletePostDocument);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent textAlign="center">
        <Center flexDir="column">
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalFooter>
            <Button
              disabled={isLoading}
              colorScheme="linkedin"
              mr="10px"
              onClick={async () => {
                setIsLoading(true);
                const response = await deletePost({
                  variables: {
                    postId: post.id
                  }
                });
                setIsLoading(false);
                if (response.data?.deletePost.success) {
                  cache.modify({
                    fields: {
                      getPaginatedPosts(existing) {
                        const updatedPosts = existing.posts.filter(
                          (p: PostFragmentFragment) => p.id !== post.id
                        );
                        return {
                          ...existing,
                          posts: [...updatedPosts]
                        };
                      }
                    }
                  });
                  onClose();
                  navigate("/dashboard", { replace: true });
                }
              }}
            >
              Yes
            </Button>
            <Button
              colorScheme="gray"
              ml="10px"
              disabled={isLoading}
              onClick={onClose}
            >
              No
            </Button>
          </ModalFooter>
        </Center>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDeleteModal;
