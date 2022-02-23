import { useQuery } from "@apollo/client";
import { Center, Progress, Stack, Text } from "@chakra-ui/react";
import React from "react";
import {
  GetUsersByUsernameDocument,
  GetUsersByUsernameQuery,
  GetUsersResult
} from "../generated";
import UserCard from "./ui/UserCard";

const SearchedUsers: React.FC<{
  users: GetUsersResult["users"];
  searchValue: string;
}> = ({ users, searchValue }) => {
  const { data, loading } = useQuery<GetUsersByUsernameQuery>(
    GetUsersByUsernameDocument,
    {
      variables: {
        username: searchValue
      }
    }
  );

  if (loading) {
    return (
      <Center>
        <Progress
          mt="30px"
          size="xs"
          isIndeterminate
          width="100%"
          maxWidth="300px"
        />
      </Center>
    );
  }

  if (!loading && data!.getUsersByUsername.users.length < 1) {
    return (
      <Center mt="25px">
        <Text size="2xl">No user with this username found</Text>{" "}
      </Center>
    );
  }

  return (
    <Stack mt="30px" align="center" spacing={6}>
      {data?.getUsersByUsername.users.map((u) => {
        return <UserCard user={u} key={u.id} />;
      })}
    </Stack>
  );
};

export default SearchedUsers;
