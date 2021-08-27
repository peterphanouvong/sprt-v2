import React, { useState } from "react";
import { NextPage } from "next";
import { Form, Formik } from "formik";
import { Box, Button, Heading, VStack } from "@chakra-ui/react";

import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { useRouter } from "next/router";
import { NextComponentType, withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";

const ChangePassword: NextPage<{ token: string }> = () => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();

  const [tokenError, setTokenError] = useState("");

  return (
    <Wrapper variant="small">
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
              <InputField
                name="newPassword"
                label="New password"
                placeholder="new password"
                type="password"
                touched={props.touched.newPassword as boolean}
              />
              <InputField
                name="confirmPassword"
                label="Confirm new password"
                placeholder="new password"
                type="password"
                touched={props.touched.confirmPassword as boolean}
              />
              <Button
                colorScheme="brand"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Change password
              </Button>
              <Box color="red.400">{tokenError}</Box>
            </VStack>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(
  (ChangePassword as unknown) as NextComponentType
);
