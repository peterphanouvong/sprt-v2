import React from "react";

import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { useEventQuery } from "../../generated/graphql";
import { Card } from "../../components/Card";
import { RenderPrettyJSON } from "../../utils/renderPrettyJSON";

const Event = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const [{ data, fetching, error }] = useEventQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });

  console.log(data);

  if (fetching) return <>loading..</>;
  if (error) return <Layout>{error.message}</Layout>;
  if (!data?.event) return <Layout>couldn't find the event</Layout>;

  return (
    <Layout>
      <Card>
        <RenderPrettyJSON object={data} />
      </Card>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Event);
