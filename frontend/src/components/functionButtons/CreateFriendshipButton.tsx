import { useMutation } from "@apollo/client";
import { Button, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaPlusSquare } from "react-icons/fa";
import { cache } from "../..";
import {
  CreateFriendshipDocument,
  CreateFriendshipMutation,
  UserFragmentFragment
} from "../../generated";

const CreateFriendshipButton: React.FC<{
  user: UserFragmentFragment;
}> = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [createFriendship] = useMutation<CreateFriendshipMutation>(
    CreateFriendshipDocument
  );

  return (
    <Button
      mt="15px"
      rightIcon={<Icon as={FaPlusSquare} />}
      colorScheme="linkedin"
      isLoading={isLoading}
      onClick={async () => {
        setIsLoading(true);
        const response = await createFriendship({
          variables: {
            friend: user.id
          }
        });

        if (response.data?.createFriendship.success) {
          cache.modify({
            id: cache.identify(user),
            fields: {
              friendshipStatus(existing) {
                existing = "PENDING OUTGOING";
                return existing;
              }
            }
          });
        }

        setIsLoading(false);
      }}
    >
      Add to friends
    </Button>
  );
};

export default CreateFriendshipButton;
