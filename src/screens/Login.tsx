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
    .email("Please enter a valid email")
    .required("Required Email"),
  userPassword: Yup.string()
    .matches(/^\S+$/, "Password must not contain whitespace or tabs only")
    .required("Required"),
});
const Login = () => {
  const navigate = useNavigate();
  const [userEmailPassword, setUserEmailPassword] = React.useState({
    userEmailName: "",
    userPassword: "",
  });
  const { toggleColorMode } = useColorMode();
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
            alignItems="center"
            justifyContent="center"
            flexDirection={"column"}
          >
            <Flex
              flexDirection="column"
              bg={formBackground}
              p={12}
              borderRadius={8}
              boxShadow="lg"
            >
              <Heading mb={6}>Log In</Heading>
              <Input
                placeholder="johndoe@gmail.com"
                type="email"
                variant="filled"
                mb={3}
                name="userEmailName"
                value={values.userEmailName}
                onChange={handleChange}
              />
              <Input
                placeholder="**********"
                type="password"
                variant="filled"
                mb={6}
                name="userPassword"
                onChange={handleChange}
                value={values.userPassword}
              />
              <Button colorScheme="teal" mb={8} type="submit">
                Log In
              </Button>
              <Text color={"red"}>{errors.userEmailName}</Text>
              <Text color={"red"}>{errors.userPassword}</Text>
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="dark_mode" mb="0">
                  Enable Dark Mode?
                </FormLabel>
                <Switch
                  id="dark_mode"
                  colorScheme="teal"
                  size="lg"
                  onChange={toggleColorMode}
                />
              </FormControl>
            </Flex>
          </Flex>
        </form>
      )}
    </Formik>
  );
};

export default Login;
