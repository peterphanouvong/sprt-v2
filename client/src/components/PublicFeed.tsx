import { Spinner } from "@chakra-ui/react";
import React from "react";
import { Event, useFeedQuery } from "../generated/graphql";
// import { RenderPrettyJSON } from "../utils/renderPrettyJSON";
import { EventList } from "./EventList";

interface Props {
  userId: number;
}

const PublicFeed: React.FC<Props> = ({ userId }) => {
  const [{ data, fetching }] = useFeedQuery({
    variables: {
      id: userId,
    },
  });
  if (!data && !fetching) return <>ya fucked it</>;
  if (!data) return <Spinner />;
  return (
    <>
      {/* <RenderPrettyJSON object={data} /> */}
      <EventList events={data.feed as Event[]} />
    </>
  );
};

export { PublicFeed };
