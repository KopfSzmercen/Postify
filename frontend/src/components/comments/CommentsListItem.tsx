import { Avatar, Box, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";

const CommentsListItem = () => {
  return (
    <Box p="10px" border="2px" borderColor="blackAlpha.200" borderRadius="5px">
      <Stack>
        <Flex align="center">
          <Avatar name="Username" />
          <Text ml="5px" fontWeight="semibold">
            Username
          </Text>
        </Flex>
        <Text>20.02.2022</Text>
      </Stack>
      <Text mt="10px">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quia eum
        corrupti at facilis! Quasi omnis dolor delectus placeat ad?
      </Text>
    </Box>
  );
};

export default CommentsListItem;
