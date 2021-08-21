import { Spinner } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  Club,
  Event,
  PublicityType,
  useFeedQuery,
  useMeQuery,
  usePublicityTypesQuery,
} from "../generated/graphql";
// import { RenderPrettyJSON } from "../utils/renderPrettyJSON";
import { EventList } from "./EventList";
import { EventListFilter } from "./EventListFilter";

interface Props {
  userId: number;
}

const PublicFeed: React.FC<Props> = ({ userId }) => {
  const [{ data, fetching }] = useFeedQuery({
    variables: {
      id: userId,
    },
  });
  const [{ data: meData }] = useMeQuery();
  const [{ data: publicityTypesData }] = usePublicityTypesQuery();

  const [selectedClubs, setSelectedClubs] = useState<Record<number, boolean>>(
    meData?.me?.followingClubs?.reduce((map, obj) => {
      map[obj.id] = true;
      return map;
    }, {})!
  );

  const [selectedPublicityTypes, setSelectedPublicityTypes] = useState<
    Record<number, boolean>
  >(
    publicityTypesData?.publicityTypes.reduce((map, obj) => {
      map[obj.id] = true;
      return map;
    }, {})!
  );

  if (!data && !fetching) return <>ya fucked it</>;
  if (!data) return <Spinner />;

  return (
    <>
      <EventListFilter
        clubs={meData?.me?.followingClubs as Club[]}
        selectedClubs={selectedClubs}
        setSelectedClubs={setSelectedClubs}
        publicityTypes={publicityTypesData?.publicityTypes as PublicityType[]}
        selectedPublicityTypes={selectedPublicityTypes}
        setSelectedPublicityTypes={setSelectedPublicityTypes}
      />
      {/* <RenderPrettyJSON object={selectedClubs} /> */}
      <EventList
        events={
          data.feed.filter((x) => {
            return x.clubId
              ? selectedClubs[x.clubId] &&
                  selectedPublicityTypes[x.publicityTypeId]
              : selectedPublicityTypes[x.publicityTypeId];
          }) as Event[]
        }
      />
    </>
  );
};

export { PublicFeed };
