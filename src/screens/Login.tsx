import React from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Switch,
  useColorMode,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../types/login";
import * as Yup from "yup";

const initialValues = {
  userEmailName: "",
  userPassword: "",
};
const validationSchema = Yup.object().shape({
  userEmailName: Yup.string()
    .email("*Please enter a valid email")
    .required("*Required Email"),
  userPassword: Yup.string()
    .matches(/^\S+$/, "Password must not contain whitespace or tabs only")
    .required("*Password is required to login"),
});
const Login = () => {
  const navigate = useNavigate();
  const [userEmailPassword, setUserEmailPassword] = React.useState({
    userEmailName: "",
    userPassword: "",
  });
  const { toggleColorMode, colorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");

  const OnSumbit = (values: LOGIN) => {
    setUserEmailPassword({
      userEmailName: values.userEmailName,
      userPassword: values.userPassword,
    });
    navigate("ProjectsSummary");
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        OnSumbit(values);
        setTimeout(() => {
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <Flex
            h="100vh"
            w={{ base: "100vw", sm: "100vw" }}
            alignItems="center"
            justifyContent="center"
            flexDirection={"column"}
          >
            <Flex
              w={{ base: "100%", sm: "100%", md: "500px" }}
              h={{ base: "100%", sm: "100%", md: "500px" }}
              flexDirection="column"
              bg={formBackground}
              p={12}
              borderRadius={8}
              boxShadow="lg"
            >
              <Heading mb={6} textAlign={"center"}>
                Log In
              </Heading>
              <Input
                placeholder="Enter your email"
                type="email"
                fontSize={"smaller"}
                mb={2}
                name="userEmailName"
                value={values.userEmailName}
                onChange={handleChange}
              />
              {
                <Text color={"red"} fontSize="smaller">
                  {errors.userEmailName}
                </Text>
              }
              <Input
                placeholder="Enter your password"
                type="password"
                fontSize={"smaller"}
                mb={2}
                name="userPassword"
                onChange={handleChange}
                value={values.userPassword}
              />
              {
                <Text color={"red"} fontSize="smaller">
                  {errors.userPassword}
                </Text>
              }
              <Button colorScheme="teal" mb={6} type="submit">
                Log In
              </Button>
              <Text fontSize={".9rem"} color={"#2C3335"}>
                Forgot Password ?
              </Text>
              {/* <Flex alignItems="center">
                <FormLabel htmlFor="dark_mode" mb="0">
                  {colorMode !== "dark"
                    ? "Enable Dark Mode?"
                    : "Disable Dark Mode"}
                </FormLabel>
                <Switch
                  colorScheme="teal"
                  size="lg"
                  border={"1px solid #319795"}
                  borderRadius={"30px"}
                  onChange={toggleColorMode}
                  _active={{ border: "none" }}
                />
              </Flex> */}
            </Flex>
          </Flex>
        </form>
      )}
    </Formik>
  );
};

export default Login;
