import { Link } from "@chakra-ui/layout";
import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Maybe, useMarkEventAsCompleteMutation } from "../generated/graphql";
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
  const [, markEventAsComplete] = useMarkEventAsCompleteMutation();
  const toast = useToast();

  return liveEvents.length > 0 ? (
    <>
      <Box overflowX="auto">
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
                          await markEventAsComplete({
                            id: event.id,
                          });

                          toast({
                            description: `${event.title} marked as complete`,
                            isClosable: true,
                            position: "top",
                            status: "success",
                            variant: "subtle",
                          });
                        }}
                      >
                        Mark as complete
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
    </>
  ) : (
    <div>No live events</div>
  );
};

export { LiveEventTable };
