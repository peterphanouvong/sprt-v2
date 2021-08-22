import React from "react";

import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { useEventQuery } from "../../generated/graphql";
import { Card } from "../../components/Card";
import { RenderPrettyJSON } from "../../utils/renderPrettyJSON";
import { CSVLink } from "react-csv";
import { Box, Button } from "@chakra-ui/react";

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
        <Box mt={6} />
        <CSVLink
          data={data.event.attendees.map((x) => ({
            id: x.id,
            Username: x.username,
            Firtname: x.firstname,
            Lastname: x.lastname,
          }))}
          filename={`${data.event.title}-attendees.csv`}
        >
          <Button>Download a list of attendees!</Button>
        </CSVLink>
      </Card>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Event);
