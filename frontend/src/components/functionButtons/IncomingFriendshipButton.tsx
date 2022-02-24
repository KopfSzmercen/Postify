import { useMutation } from "@apollo/client";
import { Button, Icon, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { cache } from "../..";
import {
  ManageFriendshipRequestDocument,
  ManageFriendshipRequestMutation
} from "../../generated";

const IncomingFriendshipButton: React.FC<{
  user: {
    __typename?: "UserProfile" | undefined;
    id: number;
    username: string;
    friendshipStatus: string;
  };
}> = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [manageFriendship] = useMutation<ManageFriendshipRequestMutation>(
    ManageFriendshipRequestDocument
  );

  return (
    <>
      <Text mt="15px" color="gray.600" ml="3px">
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
};

export default IncomingFriendshipButton;
