import { Alert, AlertIcon, Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const RegisterFormDialog: React.FC<{ isRegisterSuccess: boolean }> = ({
  isRegisterSuccess
}) => {
  const navigate = useNavigate();
  if (!isRegisterSuccess) {
    return (
      <Box mt="10px" textAlign="center">
        <Text>You already have an account?</Text>
        <Button
          variant="link"
          color="blackAlpha.900"
          onClick={() => navigate("/login")}
        >
          Log in
        </Button>
      </Box>
    );
  }
  return (
    <Box mt="10px" textAlign="center">
      <Box textAlign="center">
        <Alert status="success" variant="subtle">
          <AlertIcon />
          <Text>Registering successfull!</Text>
        </Alert>
      </Box>
      <Button
        mt="15px"
        variant="link"
        color="blackAlpha.900"
        onClick={() => navigate("/login")}
      >
        Try Log in
      </Button>
    </Box>
  );
};

export default RegisterFormDialog;
