import { useQuery } from "@apollo/client";
import { Icon, IconButton } from "@chakra-ui/react";
import { FaBell, FaHome, FaUserFriends } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GetNotesDocument, GetNotesQuery } from "../../../generated";
import BadgeButton from "./BadgeButton";

const Links = () => {
  const navigate = useNavigate();
  const { data } = useQuery<GetNotesQuery>(GetNotesDocument);

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

      {data?.getNotes.notes.length === 0 ? (
        <IconButton
          colorScheme="yellow"
          aria-label="notification"
          fontSize="25px"
          icon={<Icon as={FaBell} />}
          onClick={() => navigate("/dashboard/notifications")}
        />
      ) : (
        <BadgeButton />
      )}
    </>
  );
};

export default Links;
