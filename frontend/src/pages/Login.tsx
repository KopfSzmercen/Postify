import { useMutation } from "@apollo/client";
import { Box, Button, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InputField } from "../components/ui/InputField";
import Logo from "../components/ui/Logo";
import { LoginDocument, LoginMutation } from "../generated";
import formatFormErrors from "../utils/formatFormErrors";
import useStore from "../utils/store/store";

const Login = () => {
  const navigate = useNavigate();
  const [sendLogin] = useMutation<LoginMutation>(LoginDocument);
  const store = useStore();
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) navigate("/dashboard", { replace: true });
  }, [isLoggedIn, navigate]);

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
            Login
          </Text>

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
              const response = await sendLogin({
                variables: values
              });
              if (
                !response.data?.login.success &&
                response.data?.login.errors
              ) {
                setErrors(formatFormErrors(response.data.login.errors));
              } else if (response.data?.login.success) {
                const userId = response.data!.login.userId as number;
                const username = response.data.login.username as string;
                store.logInUser(userId, username);
                navigate("/dashboard", { replace: true });
              }
            }}
          >
            {(formik) => (
              <Form>
                <InputField
                  name="email"
                  placeholder="Email"
                  label="Email"
                  type="email"
                />
                <Box mt={4}>
                  <InputField
                    name="password"
                    placeholder="Password"
                    label="Password"
                    type="password"
                  />
                </Box>

                <Box mt="10px" textAlign="center">
                  <Text>You don't have an acoount?</Text>
                  <Button
                    variant="link"
                    color="blackAlpha.900"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </Button>
                </Box>

                <Box width="100%" textAlign="center">
                  <Button
                    type="submit"
                    colorScheme="blue"
                    mt={4}
                    isLoading={formik.isSubmitting}
                  >
                    Login
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

export default Login;
