import React from "react";

import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

import { Code } from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import { useUserByUsernameQuery } from "../generated/graphql";
import { useRouter } from "next/router";
import { useIsAuth } from "../utils/useIsAuth";

const Profile = () => {
  useIsAuth();
  const router = useRouter();
  const username = router.query.username;
  const [{ data, fetching, error }] = useUserByUsernameQuery({
    variables: {
      username: username as string,
    },
  });
  console.log(data);

  if (fetching) return <>loading..</>;
  if (error) return <Layout>{error.message}</Layout>;
  if (!data?.userByUsername) return <Layout>couldn't find the user</Layout>;

  return (
    <Layout>
      <Code>
        <pre id="json">{JSON.stringify(data.userByUsername, null, 2)}</pre>
      </Code>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Profile);
