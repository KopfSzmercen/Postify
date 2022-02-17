import { useMutation } from "@apollo/client";
import { Box, Button, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useState } from "react";
import { InputField } from "../components/ui/InputField";
import Logo from "../components/ui/Logo";
import RegisterFormDialog from "../components/ui/RegisterFormDialog";
import { RegisterDocument, RegisterMutation } from "../generated";
import formatFormErrors from "../utils/formatFormErrors";

const Register = () => {
  const [sendRegiser] = useMutation<RegisterMutation>(RegisterDocument);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

  return (
    <>
      <Box w="100%" bg="blackAlpha.800" p={["15px 30px", "5px 30px"]}>
        <Logo />
      </Box>
      <Box p="15px 30px">
        <Box
          shadow="xl"
          margin="50px auto"
          maxWidth="500px"
          bg="gray.50"
          p="10px 15px"
        >
          <Text fontSize="2xl" fontWeight="bold" align="center" pb="10px">
            Register
          </Text>

          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: ""
            }}
            onSubmit={async (values, { setErrors, resetForm }) => {
              setIsRegisterSuccess(false);
              const response = await sendRegiser({
                variables: {
                  ...values
                }
              });
              if (
                !response.data?.register.success &&
                response.data?.register.errors
              ) {
                setErrors(formatFormErrors(response.data?.register.errors));
              } else if (response.data?.register.success) {
                resetForm();
                setIsRegisterSuccess(true);
              }
            }}
          >
            {(formik) => (
              <Form>
                <InputField
                  name="username"
                  placeholder="Username"
                  label="Username"
                  value={formik.values.username}
                />
                <InputField
                  name="email"
                  placeholder="Email"
                  label="Email"
                  value={formik.values.email}
                />
                <Box mt={4}>
                  <InputField
                    name="password"
                    placeholder="Password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                  />
                </Box>

                <InputField
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  label="Confirm Password"
                  type="password"
                  value={formik.values.confirmPassword}
                />

                <RegisterFormDialog isRegisterSuccess={isRegisterSuccess} />

                <Box width="100%" textAlign="center">
                  <Button
                    type="submit"
                    colorScheme="blue"
                    mt={4}
                    isLoading={formik.isSubmitting}
                  >
                    Register
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
};

export default Register;
