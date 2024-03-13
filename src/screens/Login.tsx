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

const Login = () => {
  const navigate = useNavigate();
  const [userEmailPassword, setUserEmailPassword] = React.useState({
    userEmailName: "",
    userPassword: "",
  });
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");

  const ValueChange = (e: any) => {
    setUserEmailPassword({
      ...userEmailPassword,
      [e.target.name]: e.target.value,
    });
  };

  const OnSumbit = (values: LOGIN) => {
    setUserEmailPassword({
      userEmailName: values.userEmailName,
      userPassword: values.userPassword,
    });
    console.log(userEmailPassword, "userEmailPassworduserEmailPassword");
    navigate("ProjectsSummary");
  };
  return (
    <Formik
      initialValues={{ userEmailName: "", userPassword: "" }}
      validate={(values: LOGIN) => {
        const errors = {
          userEmailName: "",
          password: "",
        };
        // if (!values.userEmailName) {
        //   errors.userEmailName = "Required";
        // } else if (
        //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.userEmailName)
        // ) {
        //   errors.userEmailName = "Invalid email address";
        // }
        // return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        OnSumbit(values);
        setTimeout(() => {
          // alert(JSON.stringify(values, null, 2));
          OnSumbit(values);
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
            {/* <Text as="h2" mb="4" fontSize="2rem">
              Login to track Project Status
            </Text> */}
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
                onChange={ValueChange}
              />
              <Input
                placeholder="**********"
                type="password"
                variant="filled"
                mb={6}
                name="userPassword"
                onChange={ValueChange}
              />
              <Button colorScheme="teal" mb={8} type="submit">
                Log In
              </Button>
              <Text>{errors.userEmailName}</Text>
              <Text>{errors.userPassword}</Text>
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
