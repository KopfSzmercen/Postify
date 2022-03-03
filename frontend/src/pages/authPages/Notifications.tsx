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

      <Center mt="20px">
        <Stack>
          {data?.getNotes.notes.map((note) => {
            return <NotificationCard notification={note} key={note.id} />;
          })}
        </Stack>
      </Center>
    </Box>
  );
};

export default Notifications;
