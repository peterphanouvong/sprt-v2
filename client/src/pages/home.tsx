import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import { Button, Text } from "@chakra-ui/react";
import { useIsAuth } from "../utils/useIsAuth";
import { DynamicEditor } from "../components/DynamicEditor";
import { Form, Formik } from "formik";

interface Props {}

const Home: React.FC<Props> = ({}) => {
  useIsAuth();

  return (
    <Layout>
      <Text as="h1" fontSize="large">
        Home page
      </Text>

      <Formik
        initialValues={{ description: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {(props) => (
          <Form>
            <DynamicEditor
              setFieldValue={props.setFieldValue}
              name="description"
              label="Description"
              readOnly={true}
            />
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
