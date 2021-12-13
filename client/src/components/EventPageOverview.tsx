import { Grid, VStack, Text } from "@chakra-ui/react";
import React from "react";
import { parseDatePretty } from "../utils/parseDate";
import { BaseContent } from "./BaseContent";
import { Event } from "../generated/graphql";
import { useIsMobileScreen } from "../utils/useIsMobileScreen";

interface Props {
  event: Event;
}

const MyGrid = ({ children }) => {
  return (
    <Grid width="100%" templateColumns="1fr 4fr" gridGap={4} alignItems="start">
      {children}
    </Grid>
  );
};

const EventPageOverview: React.FC<Props> = ({ event }) => {
  const isMobile = useIsMobileScreen();

  return (
    <BaseContent>
      {isMobile ? (
        <>
          <Text mb={4} variant="body-3" fontWeight="medium">
            Overview
          </Text>
          <Grid gridTemplateColumns="1fr 1fr">
            <VStack alignItems="start">
              <MyGrid>
                <Text variant="body-3">Venue:</Text>
                <Text variant="body-3">{event.venue}</Text>
              </MyGrid>

              <MyGrid>
                <Text variant="body-3">Address:</Text>
                <Text variant="body-3">{event.address}</Text>
              </MyGrid>

              <MyGrid>
                <Text variant="body-3">Date:</Text>
                <Text variant="body-3">{parseDatePretty(event.date)}</Text>
              </MyGrid>

              <MyGrid>
                <Text variant="body-3">Time:</Text>
                <Text variant="body-3">
                  {event.startTime} - {event.endTime}
                </Text>
              </MyGrid>
            </VStack>

            <VStack alignItems="start">
              <MyGrid>
                <Text variant="body-3">Price:</Text>
                <Text variant="body-3">${event.price?.toFixed(2)}</Text>
              </MyGrid>
              <MyGrid>
                <Text variant="body-3">Beem ID:</Text>
                <Text variant="body-3">{event.clubBeemId}</Text>
              </MyGrid>
            </VStack>
          </Grid>
        </>
      ) : (
        <Grid templateColumns="1fr 3fr" gridGap={4} alignItems="start">
          <Text variant="body-3" fontWeight="medium">
            Overview
          </Text>

          <Grid gridTemplateColumns="1fr 1fr">
            <VStack alignItems="start">
              <MyGrid>
                <Text variant="body-3">Venue:</Text>
                <Text variant="body-3">{event.venue}</Text>
              </MyGrid>

              <MyGrid>
                <Text variant="body-3">Address:</Text>
                <Text variant="body-3">{event.address}</Text>
              </MyGrid>

              <MyGrid>
                <Text variant="body-3">Date:</Text>
                <Text variant="body-3">{parseDatePretty(event.date)}</Text>
              </MyGrid>

              <MyGrid>
                <Text variant="body-3">Time:</Text>
                <Text variant="body-3">
                  {event.startTime} - {event.endTime}
                </Text>
              </MyGrid>
            </VStack>

            <VStack alignItems="start">
              <MyGrid>
                <Text variant="body-3">Price:</Text>
                <Text variant="body-3">${event.price?.toFixed(2)}</Text>
              </MyGrid>
              <MyGrid>
                <Text variant="body-3">Beem ID:</Text>
                <Text variant="body-3">{event.clubBeemId}</Text>
              </MyGrid>
            </VStack>
          </Grid>
        </Grid>
      )}
    </BaseContent>
  );
};

export { EventPageOverview };
