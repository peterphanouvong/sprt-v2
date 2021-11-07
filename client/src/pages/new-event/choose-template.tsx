import { Grid, Button } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import React from "react";
import { BaseContent } from "../../components/BaseContent";
import { BaseLayout } from "../../components/BaseLayout";
import { BasePageHeader } from "../../components/BasePageHeader";
import { EventTemplateList } from "../../components/EventTemplateList";
import { NewEventSideNav } from "../../components/NewEventSideNav";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useIsAuth } from "../../utils/useIsAuth";

interface Props {}

const EventChooseTemplate: React.FC<Props> = ({}) => {
  useIsAuth();
  const [hasChosenTemplate, setHasChosenTemplate] = React.useState(false);

  return (
    <BaseLayout>
      <Head>
        <title>EventChooseTemplate | sprt</title>
      </Head>
      <BasePageHeader>Choose template</BasePageHeader>
      <BaseContent>
        <Grid templateColumns="1fr 3fr" gridGap={4} alignItems="start">
          <NewEventSideNav
            isFromTemplate={true}
            hasChosenTemplate={hasChosenTemplate}
          />
          <div>
            <Button onClick={() => setHasChosenTemplate(true)}>
              choose template
            </Button>
            <EventTemplateList />
          </div>
        </Grid>
      </BaseContent>
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(
  EventChooseTemplate
);
