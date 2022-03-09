import { Box, Flex, IconButton, Text, Icon } from "@chakra-ui/react";
import React from "react";
import {
  DeleteNoteDocument,
  DeleteNoteMutation,
  NoteFragmentFragment
} from "../../generated";
import { ImBin2 } from "react-icons/im";
import { useMutation } from "@apollo/client";
import { cache } from "../..";

const NotificationCard: React.FC<{ notification: NoteFragmentFragment }> = ({
  notification
}) => {
  const parsedDate = new Date(parseInt(notification.createdAt))
    .toISOString()
    .substring(0, 10);

  const [deleteNote, { loading }] =
    useMutation<DeleteNoteMutation>(DeleteNoteDocument);
  return (
    <Box w="100%" maxW="450px" bg="whiteAlpha.900" p="15px" borderRadius="5px">
      <Text>{parsedDate}</Text>
      <Flex justify="space-between" align="center">
        <Text>{notification.text}</Text>
        <IconButton
          ml="auto"
          colorScheme="red"
          aria-label="delete"
          disabled={loading}
          icon={<Icon as={ImBin2} />}
          onClick={async () => {
            const response = await deleteNote({
              variables: {
                noteId: notification.id
              }
            });
            if (response.data?.deleteNote.success) {
              cache.evict({ id: cache.identify(notification) });
            }
          }}
        />
      </Flex>
    </Box>
  );
};

export default NotificationCard;
