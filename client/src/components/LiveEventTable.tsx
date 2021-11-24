import { Link } from "@chakra-ui/layout";
import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Maybe,
  useDeleteEventMutation,
  useMarkEventAsCompleteMutation,
} from "../generated/graphql";
import { parseDatePretty } from "../utils/parseDate";
import {
  BaseTable,
  BaseTbody,
  BaseTd,
  BaseTh,
  BaseThead,
  BaseTr,
} from "./BaseTable";

interface Props {
  liveEvents: {
    __typename?: "Event" | undefined;
    id: number;
    title: string;
    date?: Maybe<string> | undefined;
    capacity?: Maybe<number> | undefined;
    numWaitlist: number;
    numConfirmed: number;
  }[];
}

const LiveEventTable: React.FC<Props> = ({ liveEvents }) => {
  const [, deleteEvent] = useDeleteEventMutation();
  const [, markEventAsComplete] = useMarkEventAsCompleteMutation();

  return liveEvents.length > 0 ? (
    <Box overflowX={"auto"}>
      <BaseTable>
        <BaseThead>
          <BaseTr>
            <BaseTh>Title</BaseTh>
            <BaseTh>Date</BaseTh>
            <BaseTh>Attendees</BaseTh>
            <BaseTh>Waitlist</BaseTh>
            <BaseTh width="0"></BaseTh>
          </BaseTr>
        </BaseThead>
        <BaseTbody>
          {liveEvents.map((event) => (
            <BaseTr key={event.id}>
              <BaseTd>
                <NextLink href={`/events/${event.id}/sign-up`}>
                  <Link>{event.title}</Link>
                </NextLink>
              </BaseTd>
              <BaseTd>{parseDatePretty(event.date)}</BaseTd>
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
                        const res = await markEventAsComplete({ id: event.id });
                        if (res.data?.markEventAsComplete) {
                          alert("Nice it worked!");
                        } else {
                          alert("Something went wrong");
                        }
                      }}
                    >
                      Mark as complete
                    </MenuItem>
                    <MenuItem
                      color="red.500"
                      onClick={() => {
                        console.log("Delete event" + event.id);
                        deleteEvent({ id: event.id.toString() });
                      }}
                    >
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              </BaseTd>
            </BaseTr>
          ))}
        </BaseTbody>
      </BaseTable>
    </Box>
  ) : (
    <div>No live events</div>
  );
};

export { LiveEventTable };
