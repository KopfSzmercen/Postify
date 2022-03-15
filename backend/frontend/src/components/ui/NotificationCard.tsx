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
import IncomingFriendshipButton from "../functionButtons/IncomingFriendshipButton";

const NotificationCard: React.FC<{ notification: NoteFragmentFragment }> = ({
  notification
}) => {
  const parsedDate = new Date(parseInt(notification.createdAt))
    .toISOString()
    .substring(0, 10);

  const [deleteNote, { loading }] =
    useMutation<DeleteNoteMutation>(DeleteNoteDocument);

  const deleteNoteFunc = async () => {
    const response = await deleteNote({
      variables: {
        noteId: notification.id
      }
    });
    if (response.data?.deleteNote.success) {
      cache.evict({ id: cache.identify(notification) });
    }
  };

  return (
    <Box w="100%" maxW="450px" bg="whiteAlpha.900" p="15px" borderRadius="5px">
      <Text>{parsedDate}</Text>
      <IconButton
        mt="5px"
        colorScheme="red"
        aria-label="delete"
        disabled={loading}
        icon={<Icon as={ImBin2} />}
        onClick={deleteNoteFunc}
      />
      <Flex justify="space-between" align="center">
        {notification.type !== "FRIENDS REQ" && (
          <Text>{notification.text}</Text>
        )}
        <Box>
          {notification.type === "FRIENDS REQ" && (
            <IncomingFriendshipButton
              userId={notification.senderId!}
              deleteNote={deleteNoteFunc}
            />
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default NotificationCard;
