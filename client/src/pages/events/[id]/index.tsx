import { AspectRatio, Button, Grid, Spinner } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { BaseContent } from "../../../components/BaseContent";
import { BaseLayout } from "../../../components/BaseLayout";
import { BasePageHeader } from "../../../components/BasePageHeader";
import { BaseSection } from "../../../components/BaseSection";
import { EventPageOverview } from "../../../components/EventPageOverview";
import { EventPageSideNav } from "../../../components/EventPageSideNav";
import { Event, useEventQuery } from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useIsAuth } from "../../../utils/useIsAuth";
import { getYoutubeVideoId } from "../../../utils/getYoutubeVideoId";
import NextLink from "next/link";

interface Props {}

const EventOverview: React.FC<Props> = ({}) => {
  useIsAuth();
  const router = useRouter();
  const { id } = router.query;

  const [{ data, fetching }] = useEventQuery({
    pause: id === undefined,
    variables: {
      id: id as string
    }
  });

  if (fetching) {
    return <Spinner />;
  }

  if (!fetching && !data) {
    return <>no data </>;
  }

  return (
    <BaseLayout>
      <Head>
        <title>EventOverview | sprt</title>
      </Head>
      <BasePageHeader>{data?.event.title}</BasePageHeader>
      <EventPageOverview event={data?.event as Event} />

      <BaseContent flex={1}>
        <Grid templateColumns="1fr 3fr" gridGap={4} alignItems="start">
          <EventPageSideNav id={id as string} />
          <BaseSection title="Description">
            {data?.event.youtubeLink && (
              <AspectRatio ratio={16 / 9}>
                <iframe
                  title="naruto"
                  src={`//www.youtube.com/embed/${getYoutubeVideoId(
                    data?.event.youtubeLink as string
                  )}`}
                  allowFullScreen
                />
              </AspectRatio>
            )}

            <NextLink href={`/events/${id}/sign-up`}>
              <Button mt={4}>Sign up!</Button>
            </NextLink>
          </BaseSection>
        </Grid>
      </BaseContent>
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EventOverview);
