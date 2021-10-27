import React, { useState } from "react";
import { NextPage } from "next";
import { Form, Formik } from "formik";
import { Box, Button, Heading, VStack } from "@chakra-ui/react";

import { BaseInputField } from "../../components/BaseInputField";
import { BaseWrapper } from "../../components/BaseWrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { useRouter } from "next/router";
import { NextComponentType, withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import Head from "next/head";

const ChangePassword: NextPage<{ token: string }> = () => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();

  const [tokenError, setTokenError] = useState("");

  return (
    <BaseWrapper variant="small">
      <Head>
        <title>Change Password | sprt</title>
      </Head>
      <Heading as="h1" fontSize="x-large" mb={4}>
        Change password
      </Heading>
      <Formik
        initialValues={{ newPassword: "", confirmPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          if (values.newPassword !== values.confirmPassword) {
            setErrors({
              confirmPassword: "passwords do not match",
              newPassword: "passwords do not match",
            });

            return;
          }

          const res = await changePassword({
            newPassword: values.newPassword,
            token:
              typeof router.query.token === "string" ? router.query.token : "",
          });

          if (res.data?.changePassword.errors) {
            const errorMap = toErrorMap(res.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (res.data?.changePassword.user) {
            router.push("/");
          }
        }}
      >
        {(props) => (
          <Form>
            <VStack spacing={4} align="stretch">
              <BaseInputField
                name="newPassword"
                label="New password"
                placeholder="new password"
                type="password"
                touched={props.touched.newPassword as boolean}
              />
              <BaseInputField
                name="confirmPassword"
                label="Confirm new password"
                placeholder="new password"
                type="password"
                touched={props.touched.confirmPassword as boolean}
              />
              <Button isLoading={props.isSubmitting} type="submit">
                Change password
              </Button>
              <Box color="red.400">{tokenError}</Box>
            </VStack>
          </Form>
        )}
      </Formik>
    </BaseWrapper>
  );
};

export default withUrqlClient(createUrqlClient)(
  (ChangePassword as unknown) as NextComponentType
);
