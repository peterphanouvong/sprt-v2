import {
  Box,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Maybe, useMarkEventAsLiveMutation } from "../generated/graphql";
import { parseDateStandard } from "../utils/parseDate";
import {
  BaseTable,
  BaseTbody,
  BaseTd,
  BaseTh,
  BaseThead,
  BaseTr,
} from "./BaseTable";
import { EventDeleteModal } from "./EventDeleteModal";

interface Props {
  pastEvents: {
    __typename?: "Event" | undefined;
    id: number;
    title: string;
    date?: Maybe<string> | undefined;
    capacity?: Maybe<number> | undefined;
    numWaitlist: number;
    numConfirmed: number;
  }[];
}

const PastEventTable: React.FC<Props> = ({ pastEvents }) => {
  const [, markEventAsLive] = useMarkEventAsLiveMutation();
  const toast = useToast();

  return pastEvents.length > 0 ? (
    <Box overflowX="auto">
      <BaseTable>
        <BaseThead>
          <BaseTr>
            <BaseTh>Title</BaseTh>
            <BaseTh>Date</BaseTh>
            <BaseTh>Attendees</BaseTh>
            <BaseTh>Waitlist</BaseTh>
            <BaseTh></BaseTh>
          </BaseTr>
        </BaseThead>
        <BaseTbody>
          {pastEvents.map((event) => (
            <BaseTr key={event.id}>
              <BaseTd>
                <NextLink href={`/events/${event.id}/join`}>
                  <Link>{event.title}</Link>
                </NextLink>
              </BaseTd>
              <BaseTd>{parseDateStandard(event.date)}</BaseTd>
              <BaseTd>
                {event.capacity
                  ? event.numConfirmed + "/" + event.capacity
                  : event.numConfirmed}
              </BaseTd>
              <BaseTd>{event.numWaitlist}</BaseTd>
              <BaseTd width="0">
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<BsThreeDotsVertical />}
                    variant="ghost"
                    colorScheme="gray"
                    rounded="full"
                  />
                  <MenuList>
                    <MenuItem
                      onClick={async () => {
                        const res = await markEventAsLive({
                          id: event.id,
                        });
                        console.log(res);
                        if (res.data?.markEventAsLive) {
                          toast({
                            description: `${event.title} marked as live`,
                            isClosable: true,
                            position: "top",
                            status: "success",
                            variant: "subtle",
                          });
                        } else {
                          toast({
                            description: "Something went wrong",
                            isClosable: true,
                            position: "top",
                            status: "error",
                            variant: "subtle",
                          });
                        }
                      }}
                    >
                      Mark as live
                    </MenuItem>
                    <EventDeleteModal event={event} />
                  </MenuList>
                </Menu>
              </BaseTd>
            </BaseTr>
          ))}
        </BaseTbody>
      </BaseTable>
    </Box>
  ) : (
    <div>No past events</div>
  );
};

export { PastEventTable };
