import { Grid, Spinner } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { BaseBreadcrumbs } from "../../../components/BaseBreadcrumbs";
import { BaseContent } from "../../../components/BaseContent";
import { BaseLayout } from "../../../components/BaseLayout";
import { BasePageHeader } from "../../../components/BasePageHeader";
import { EventFreshForm } from "../../../components/EventFreshForm";
import { NewEventSideNav } from "../../../components/NewEventSideNav";
import { useEventTemplateQuery } from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { parseDate } from "../../../utils/parseDate";
import { parseRichText } from "../../../utils/parseRichText";
import { useIsAuth } from "../../../utils/useIsAuth";
import { useIsMobileScreen } from "../../../utils/useIsMobileScreen";

interface Props {}

const Home: React.FC<Props> = ({}) => {
  useIsAuth();

  const isMobile = useIsMobileScreen();

  const router = useRouter();
  const { id } = router.query;

  const [{ data, fetching }] = useEventTemplateQuery({
    pause: id === undefined,
    variables: {
      eventTemplateId: Number(id as string),
    },
  });

  if (fetching) {
    return <Spinner />;
  }

  if (!data?.eventTemplate && !fetching) {
    return <div>Not found</div>;
  }

  console.log(data);

  return (
    <BaseLayout>
      <Head>
        <title>Event Details | sprt</title>
      </Head>

      <BasePageHeader>Event details</BasePageHeader>
      <BaseContent>
        {isMobile ? (
          <>
            <BaseBreadcrumbs
              crumbs={[
                { href: "/new-event", title: "Choose path" },
                {
                  href: "/new-event/choose-template/",
                  title: "Choose template",
                },
                {
                  href: `/new-event/from-template/${id}`,
                  title: "Event details",
                },
              ]}
            />

            <EventFreshForm
              initialValues={{
                title: data?.eventTemplate.title,
                venue: data?.eventTemplate.venue,
                date: parseDate(data?.eventTemplate.date),
                address: data?.eventTemplate.address,
                price: data?.eventTemplate.price
                  ? data?.eventTemplate.price.toString()
                  : undefined,
                description: data?.eventTemplate.description
                  ? parseRichText(data?.eventTemplate.description)
                  : parseRichText(""),
                startTime: data?.eventTemplate.startTime,
                endTime: data?.eventTemplate.endTime,
                capacity: data?.eventTemplate.capacity
                  ? data.eventTemplate.capacity.toString()
                  : undefined,
                youtubeLink: data?.eventTemplate.youtubeLink,
                clubBeemId: data?.eventTemplate.clubBeemId,
              }}
            />
          </>
        ) : (
          <Grid templateColumns="1fr 3fr" gridGap={4} alignItems="start">
            <NewEventSideNav isFromTemplate={true} />
            <EventFreshForm
              initialValues={{
                title: data?.eventTemplate.title,
                venue: data?.eventTemplate.venue,
                date: parseDate(data?.eventTemplate.date),
                address: data?.eventTemplate.address,
                price: data?.eventTemplate.price
                  ? data?.eventTemplate.price.toString()
                  : undefined,
                description: data?.eventTemplate.description
                  ? parseRichText(data?.eventTemplate.description)
                  : parseRichText(""),
                startTime: data?.eventTemplate.startTime,
                endTime: data?.eventTemplate.endTime,
                capacity: data?.eventTemplate.capacity
                  ? data.eventTemplate.capacity.toString()
                  : undefined,
                youtubeLink: data?.eventTemplate.youtubeLink,
                clubBeemId: data?.eventTemplate.clubBeemId,
              }}
            />
          </Grid>
        )}
      </BaseContent>
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Home);
