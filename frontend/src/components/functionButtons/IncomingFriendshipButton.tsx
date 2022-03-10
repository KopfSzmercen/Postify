import { useMutation, useQuery } from "@apollo/client";
import { Button, Icon, Spinner, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { cache } from "../..";
import {
  GetUserByIdDocument,
  GetUserByIdQuery,
  ManageFriendshipRequestDocument,
  ManageFriendshipRequestMutation
} from "../../generated";

const IncomingFriendshipButton: React.FC<{
  userId: number;
  deleteNote: (() => void) | null;
}> = ({ userId, deleteNote }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [manageFriendship] = useMutation<ManageFriendshipRequestMutation>(
    ManageFriendshipRequestDocument
  );

  const { data, loading } = useQuery<GetUserByIdQuery>(GetUserByIdDocument, {
    variables: {
      userId
    }
  });

  if (loading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  }
  if (data?.getUserById.user) {
    const user = data.getUserById.user;
    return (
      <>
        <Text mt="15px" ml="3px">
          {user.username} wants to be Your friend
        </Text>

        <Stack mt="10px" direction="row" spacing={4}>
          <Button
            leftIcon={<Icon as={FaCheck} />}
            colorScheme="green"
            variant="solid"
            isLoading={isLoading}
            onClick={async () => {
              setIsLoading(true);
              const response = await manageFriendship({
                variables: {
                  senderId: user.id,
                  action: "accept"
                }
              });

              deleteNote && deleteNote();

              if (response.data?.manageFriendsRequest.success) {
                cache.modify({
                  id: cache.identify(user),
                  fields: {
                    friendshipStatus(existing) {
                      existing = "ARE FRIENDS";
                      return existing;
                    }
                  }
                });
              }

              setIsLoading(false);
            }}
          >
            Accept
          </Button>

          <Button
            rightIcon={<Icon as={FaTimes} />}
            colorScheme="red"
            isLoading={isLoading}
            onClick={async () => {
              setIsLoading(true);
              const response = await manageFriendship({
                variables: {
                  senderId: user.id,
                  action: "accept"
                }
              });

              if (response.data?.manageFriendsRequest.success) {
                cache.modify({
                  id: cache.identify(user),
                  fields: {
                    friendshipStatus(existing) {
                      existing = "NO REQUEST";
                      return existing;
                    }
                  }
                });
              }

              setIsLoading(false);
            }}
          >
            Decline
          </Button>
        </Stack>
      </>
    );
  }

  return <Text>Error</Text>;
};

export default IncomingFriendshipButton;
