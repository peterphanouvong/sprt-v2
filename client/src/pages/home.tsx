import { withUrqlClient } from "next-urql";
import Head from "next/head";
import React from "react";
import { BaseLayout } from "../components/BaseLayout";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

interface Props {}

const Home: React.FC<Props> = ({}) => {
  useIsAuth();

  return (
    <BaseLayout>
      <Head>
        <title>Home | sprt</title>
      </Head>
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Home);
