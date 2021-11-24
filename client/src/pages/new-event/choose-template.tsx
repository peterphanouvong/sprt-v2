import { Grid } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import React from "react";
import { BaseBreadcrumbs } from "../../components/BaseBreadcrumbs";
import { BaseContent } from "../../components/BaseContent";
import { BaseLayout } from "../../components/BaseLayout";
import { BasePageHeader } from "../../components/BasePageHeader";
import { NewEventSideNav } from "../../components/NewEventSideNav";
import { TemplateChooseList } from "../../components/TemplateChooseList";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useIsAuth } from "../../utils/useIsAuth";
import { useIsMobileScreen } from "../../utils/useIsMobileScreen";

interface Props {}

const EventChooseTemplate: React.FC<Props> = ({}) => {
  useIsAuth();
  const isMobile = useIsMobileScreen();
  return (
    <BaseLayout>
      <Head>
        <title>EventChooseTemplate | sprt</title>
      </Head>
      <BasePageHeader>Choose template</BasePageHeader>
      <BaseContent>
        {isMobile ? (
          <>
            <BaseBreadcrumbs
              crumbs={[
                { href: "/new-event", title: "Choose path" },
                {
                  href: "/new-event/choose-template",
                  title: "Choose template",
                },
              ]}
            />

            <TemplateChooseList />
          </>
        ) : (
          <Grid templateColumns="1fr 3fr" gridGap={4} alignItems="start">
            <NewEventSideNav
              isFromTemplate={true}
              // hasChosenTemplate={hasChosenTemplate}
            />
            <div>
              <TemplateChooseList />
            </div>
          </Grid>
        )}
      </BaseContent>
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(
  EventChooseTemplate
);
