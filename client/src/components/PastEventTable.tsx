import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Link,
} from "@chakra-ui/react";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Maybe, useDeleteEventMutation } from "../generated/graphql";
import { parseDatePretty } from "../utils/parseDate";
import {
  BaseTable,
  BaseThead,
  BaseTr,
  BaseTh,
  BaseTbody,
  BaseTd,
} from "./BaseTable";
import NextLink from "next/link";

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
  const [, deleteEvent] = useDeleteEventMutation();
  return pastEvents.length > 0 ? (
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
                  <MenuItem>Do something</MenuItem>
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
  ) : (
    <div>No past events</div>
  );
};

export { PastEventTable };
