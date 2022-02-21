import { Avatar, Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { FaPlusSquare } from "react-icons/fa";

const UserCard: React.FC<{ username: string; id: number }> = ({
  username,
  id
}) => {
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
        <Avatar name={username} />
        <Text ml="8px" fontSize="xl">
          {username}
        </Text>
      </Flex>
      <Button
        mt="15px"
        rightIcon={<Icon as={FaPlusSquare} />}
        colorScheme="linkedin"
      >
        Add to friends
      </Button>
    </Box>
  );
};

export default UserCard;
