import { Icon, IconButton } from "@chakra-ui/react";
import { FaBell, FaHome, FaUserFriends } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Links = () => {
  const navigate = useNavigate();

  return (
    <>
      <IconButton
        colorScheme="yellow"
        aria-label="home"
        fontSize="25px"
        icon={<Icon as={FaHome} />}
        onClick={() => navigate("/dashboard")}
      />

      <IconButton
        colorScheme="yellow"
        aria-label="people"
        fontSize="25px"
        icon={<Icon as={FaUserFriends} />}
        onClick={() => navigate("/dashboard/users")}
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
