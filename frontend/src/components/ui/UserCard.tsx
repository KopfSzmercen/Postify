import { useMutation } from "@apollo/client";
import { Avatar, Box, Button, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import {
  ManageFriendshipRequestDocument,
  ManageFriendshipRequestMutation
} from "../../generated";
import CreateFriendshipButton from "../functionButtons/CreateFriendshipButton";

const UserCard: React.FC<{
  user: {
    __typename?: "UserProfile" | undefined;
    id: number;
    username: string;
    friendshipStatus: string;
  };
}> = ({ user }) => {
  const [manageFriendsRequest] = useMutation<ManageFriendshipRequestMutation>(
    ManageFriendshipRequestDocument
  );

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Box
      w="100%"
      maxWidth="350px"
      bg="white"
      p="10px"
      borderRadius="5px"
      shadow="lg"
    >
      <Flex alignItems="center">
        <Avatar name={user.username} />
        <Text ml="8px" fontSize="xl">
          {user.username}
        </Text>
      </Flex>

      {user.friendshipStatus === "NO REQUEST" && (
        <CreateFriendshipButton user={user} />
      )}

      {user.friendshipStatus === "ARE FRIENDS" && (
        <Text mt="15px" color="gray.600" ml="3px">
          {user.username} and You are friends
        </Text>
      )}

      {user.friendshipStatus === "PENDING FROM" && (
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
            >
              Accept
            </Button>
            <Button
              rightIcon={<Icon as={FaTimes} />}
              colorScheme="red"
              isLoading={isLoading}
            >
              Decline
            </Button>
          </Stack>
        </>
      )}

      {user.friendshipStatus === "PENDING TO" && (
        <Text mt="15px" color="gray.600" ml="3px">
          Request to {user.username} has been sent
        </Text>
      )}
    </Box>
  );
};

export default UserCard;
