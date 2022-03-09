import { useQuery } from "@apollo/client";
import { Box, Center, Heading, Progress, Stack } from "@chakra-ui/react";
import React from "react";
import NotificationCard from "../../components/ui/NotificationCard";
import { GetNotesDocument, GetNotesQuery } from "../../generated";

const Notifications = () => {
  const { data, loading } = useQuery<GetNotesQuery>(GetNotesDocument);

  if (loading)
    return (
      <Center>
        <Progress />
      </Center>
    );

  return (
    <Box mt="30px">
      <Center>
        <Heading>Notifications</Heading>
      </Center>

      <Box mt="20px">
        <Stack w="100%" align="center">
          {data?.getNotes.notes.map((note) => {
            return <NotificationCard notification={note} key={note.id} />;
          })}
        </Stack>
      </Box>
    </Box>
  );
};

export default Notifications;
