import { Text, Spinner } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import React from "react";
import { BaseContent } from "../components/BaseContent";
import { BaseLayout } from "../components/BaseLayout";
import { BasePageHeader } from "../components/BasePageHeader";
import { BaseSection } from "../components/BaseSection";
import { useMeQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

interface Props {}

const Home: React.FC<Props> = ({}) => {
  useIsAuth();
  const [{ data, fetching }] = useMeQuery();

  if (fetching) return <Spinner />;

  return (
    <BaseLayout>
      <Head>
        <title>Home | sprt</title>
      </Head>
      <BasePageHeader>{data?.me?.clubName}</BasePageHeader>

      <BaseContent>
        <BaseSection title="test test">
          <Text variant="body-3">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae
            eveniet deleniti, error est qui consequuntur! Dolorum reprehenderit
            odio cum magnam.
          </Text>
        </BaseSection>
      </BaseContent>
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Home);
