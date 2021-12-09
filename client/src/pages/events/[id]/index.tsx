import { AspectRatio, Button, Grid, Spinner, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BaseBreadcrumbs } from "../../../components/BaseBreadcrumbs";
import { BaseContent } from "../../../components/BaseContent";
import { BaseDynamicEditor } from "../../../components/BaseDynamicEditor";
import { BaseLayout } from "../../../components/BaseLayout";
import { BasePageHeader } from "../../../components/BasePageHeader";
import { BaseSection } from "../../../components/BaseSection";
import { EventPageOverview } from "../../../components/EventPageOverview";
import { EventPageSideNav } from "../../../components/EventPageSideNav";
import { Event, useEventQuery } from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { getYoutubeVideoId } from "../../../utils/getYoutubeVideoId";
import { parseRichText } from "../../../utils/parseRichText";
import { useIsMobileScreen } from "../../../utils/useIsMobileScreen";

interface Props {}

const EventOverview: React.FC<Props> = ({}) => {
  const isMobile = useIsMobileScreen();

  const router = useRouter();
  const { id } = router.query;

  const [{ data, fetching }] = useEventQuery({
    pause: id === undefined,
    variables: {
      id: id as string,
    },
  });

  console.log(data);

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
        {isMobile ? (
          <>
            <BaseBreadcrumbs
              crumbs={[
                { href: `events/${id}`, title: "Description" },
                { href: `/events/${id}/join`, title: "Join event" },
                { href: `/events/${id}/attendees`, title: "See who's going" },
              ]}
            />
            <BaseSection title="Description">
              {data?.event.description !==
              '[{"type":"paragraph","children":[{"text":""}]}]' ? (
                <BaseDynamicEditor
                  name="description"
                  initialValue={parseRichText(data?.event.description || "")}
                  required
                  readOnly
                />
              ) : (
                <Text variant="body-2">No description for this event.</Text>
              )}

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

              <NextLink href={`/events/${id}/join`}>
                <Button mt={4}>Join this event</Button>
              </NextLink>
            </BaseSection>
          </>
        ) : (
          <Grid templateColumns="1fr 3fr" gridGap={4} alignItems="start">
            <EventPageSideNav id={id as string} />
            <BaseSection title="Description">
              {data?.event.description !==
              '[{"type":"paragraph","children":[{"text":""}]}]' ? (
                <BaseDynamicEditor
                  name="description"
                  initialValue={parseRichText(data?.event.description || "")}
                  required
                  readOnly
                />
              ) : (
                <Text variant="body-2">No description for this event.</Text>
              )}
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

              <NextLink href={`/events/${id}/join`}>
                <Button mt={4}>Join this event</Button>
              </NextLink>
            </BaseSection>
          </Grid>
        )}
      </BaseContent>
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EventOverview);
