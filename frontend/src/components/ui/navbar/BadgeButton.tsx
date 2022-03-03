import { Box, Icon, IconButton } from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BadgeButton = () => {
  const navigate = useNavigate();
  return (
    <Box position="relative">
      <Box
        position="absolute"
        right="-5px"
        top="-5px"
        w="15px"
        h="15px"
        bg="red"
        borderRadius="50%"
        zIndex="10000"
      ></Box>
      <IconButton
        colorScheme="yellow"
        aria-label="notification"
        fontSize="25px"
        icon={<Icon as={FaBell} />}
        onClick={() => navigate("/dashboard/notifications")}
      />
    </Box>
  );
};

export default BadgeButton;
