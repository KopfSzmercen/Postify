import { useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Center,
  Heading,
  Icon,
  IconButton,
  Stack
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import UserCard from "../../components/ui/UserCard";
import { GetUsersDocument, GetUsersQuery } from "../../generated";
import { FaArrowUp } from "react-icons/fa";

const Users: React.FC<{}> = () => {
  const { data, fetchMore } = useQuery<GetUsersQuery>(GetUsersDocument, {
    variables: {
      limit: 10,
      cursor: 1
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const scrollToTarget = useRef<HTMLDivElement>(null);
  const scrollUp = () => {
    scrollToTarget.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box p="30px 30px">
      <Box ref={scrollToTarget} position="absolute" top="0"></Box>
      <Heading m="auto">Users</Heading>

      <Stack mt="25px" align="center" spacing={6}>
        {data?.getUsers.users.map((u) => {
          return <UserCard id={u.id} username={u.username} key={u.id} />;
        })}
      </Stack>

      <Center>
        {data?.getUsers.hasMore && (
          <Button
            aria-label="load-more"
            isLoading={isLoading}
            margin="30px"
            colorScheme="pink"
            onClick={async () => {
              setIsLoading(true);
              console.log(
                "C: " + data?.getUsers.users[data?.getUsers.users.length - 1].id
              );
              await fetchMore({
                variables: {
                  limit: 11,
                  cursor:
                    data?.getUsers.users[data?.getUsers.users.length - 1].id
                }
              });
              setIsLoading(false);
            }}
          >
            Load more...
          </Button>
        )}
      </Center>

      <IconButton
        position="fixed"
        bottom="30px"
        right="30px"
        size="lg"
        fontSize="30px"
        aria-label="scroll-up"
        colorScheme="pink"
        icon={<Icon as={FaArrowUp} />}
        onClick={() => scrollUp()}
      />
    </Box>
  );
};

export default Users;
