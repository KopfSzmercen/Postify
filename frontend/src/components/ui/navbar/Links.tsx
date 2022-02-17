import { Icon, IconButton } from "@chakra-ui/react";
import React from "react";
import { FaBell, FaHome, FaUserFriends } from "react-icons/fa";

const Links = () => {
  return (
    <>
      <IconButton
        colorScheme="yellow"
        aria-label="home"
        fontSize="25px"
        icon={<Icon as={FaHome} />}
      />

      <IconButton
        colorScheme="yellow"
        aria-label="people"
        fontSize="25px"
        icon={<Icon as={FaUserFriends} />}
      />

      <IconButton
        colorScheme="yellow"
        aria-label="notification"
        fontSize="25px"
        icon={<Icon as={FaBell} />}
      />
    </>
  );
};

export default Links;
