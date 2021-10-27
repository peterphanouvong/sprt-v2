import React, { useState } from "react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import {
  Heading,
  VStack,
  Button,
  Text,
  Alert,
  AlertDescription,
  Link,
  Box,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { BaseInputField } from "../components/BaseInputField";
import { BaseWrapper } from "../components/BaseWrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import NextLink from "next/link";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Head from "next/head";

interface Props {}

const ForgotPassword: React.FC<Props> = ({}) => {
  const [, forgotPassword] = useForgotPasswordMutation();

  const [complete, setComplete] = useState(false);
  return (
    <BaseWrapper variant="small">
      <Head>
        <title>Forgot Password | sprt</title>
      </Head>
      <Heading as="h1" fontSize="x-large" mb={4}>
        Forgot password?
      </Heading>
      <Text color="gray.400" mb={4}>
        That's okay, give us your email and we'll send you a reset link!
      </Text>

      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values, { setErrors }) => {
          if (values.email.length <= 2 || !values.email.includes("@")) {
            setErrors({
              email: "invalid email",
            });

            return;
          }
          await forgotPassword(values);
          setComplete(true);
        }}
      >
        {(props) =>
          complete ? (
            <Box>
              <Alert marginBottom={4} status="info">
                <AlertDescription>
                  A link to reset your password has been sent to
                  <Text fontWeight="medium">{props.values.email}</Text>
                </AlertDescription>
              </Alert>
            </Box>
          ) : (
            <Form>
              <VStack spacing={4} align="stretch">
                <BaseInputField
                  name="email"
                  label="Email"
                  placeholder="email"
                  touched={props.touched.email as boolean}
                />

                <Button isLoading={props.isSubmitting} type="submit">
                  Send email
                </Button>
              </VStack>
            </Form>
          )
        }
      </Formik>
      <Box marginTop={4}>
        <ArrowBackIcon marginRight={2} />
        <Link fontSize="sm">
          <NextLink href="/login">Back to login</NextLink>
        </Link>
      </Box>
    </BaseWrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
