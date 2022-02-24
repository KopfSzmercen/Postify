import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import CreateFriendshipButton from "../functionButtons/CreateFriendshipButton";
import IncomingFriendshipButton from "../functionButtons/IncomingFriendshipButton";

const UserCard: React.FC<{
  user: {
    __typename?: "UserProfile" | undefined;
    id: number;
    username: string;
    friendshipStatus: string;
  };
}> = ({ user }) => {
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

      {user.friendshipStatus === "PENDING INCOMING" && (
        <IncomingFriendshipButton user={user} />
      )}

      {user.friendshipStatus === "PENDING OUTGOING" && (
        <Text mt="15px" color="gray.600" ml="3px">
          Request to {user.username} has been sent
        </Text>
      )}
    </Box>
  );
};

export default UserCard;
