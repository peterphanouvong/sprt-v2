import {
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  EventAttendee,
  useConfirmAttendeeMutation,
  useUnconfirmAttendeeMutation,
} from "../generated/graphql";
import { convertEpochToDate } from "../utils/parseDate";
import {
  BaseTable,
  BaseTbody,
  BaseTd,
  BaseTh,
  BaseThead,
  BaseTr,
} from "./BaseTable";
import { EventAttendeeDeleteModal } from "./EventAttendeeDeleteModal";

interface Props {
  eventAttendees: EventAttendee[];
  eventId: number;
}

const EventAttendeeTableAdminView: React.FC<Props> = ({
  eventAttendees,
  eventId,
}) => {
  const [, confirmAttendee] = useConfirmAttendeeMutation();
  const [, unconfirmAttendee] = useUnconfirmAttendeeMutation();

  const confirmWaitlistAttendee = (attendee) => {
    console.log(attendee);
    confirmAttendee({ attendeeId: attendee.id, eventId });
  };

  const removeConfirmedAttendee = (attendee) => {
    console.log(attendee);
    unconfirmAttendee({ attendeeId: attendee.id, eventId });
  };

  return eventAttendees.length > 0 ? (
    <>
      <Heading variant="h4">Confirmed</Heading>
      <BaseTable>
        <BaseThead>
          <BaseTr>
            <BaseTh>Position</BaseTh>
            <BaseTh>Name</BaseTh>
            <BaseTh>Phone Number</BaseTh>
            <BaseTh>BeemID</BaseTh>
            <BaseTh>Joined At</BaseTh>

            <BaseTh width={0}></BaseTh>
          </BaseTr>
        </BaseThead>
        <BaseTbody>
          {eventAttendees
            .filter((eventAttendee) => eventAttendee.isConfirmed)
            .map((eventAttendee, index) => (
              <BaseTr key={index}>
                <BaseTd>{index + 1}</BaseTd>
                <BaseTd>
                  {eventAttendee.attendee.firstname}{" "}
                  {eventAttendee.attendee.lastname}
                </BaseTd>
                <BaseTd>{eventAttendee.attendee.phoneNumber}</BaseTd>
                <BaseTd>{eventAttendee.attendee.beemId}</BaseTd>
                <BaseTd>
                  {convertEpochToDate(eventAttendee.attendee.createdAt)}
                </BaseTd>
                <BaseTd width={0}>
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
                        color="red.500"
                        onClick={() =>
                          removeConfirmedAttendee(eventAttendee.attendee)
                        }
                      >
                        Unconfirm
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </BaseTd>
              </BaseTr>
            ))}
        </BaseTbody>
      </BaseTable>

      <Heading variant="h4" mt={4}>
        Waitlist
      </Heading>
      <BaseTable>
        <BaseThead>
          <BaseTr>
            <BaseTh>Position</BaseTh>
            <BaseTh>Name</BaseTh>
            <BaseTh>Phone Number</BaseTh>
            <BaseTh>BeemID</BaseTh>
            <BaseTh>Joined At</BaseTh>

            <BaseTh width={0}></BaseTh>
          </BaseTr>
        </BaseThead>
        <BaseTbody>
          {eventAttendees
            .filter((eventAttendee) => !eventAttendee.isConfirmed)
            .map((eventAttendee, index) => (
              <BaseTr key={index}>
                <BaseTd>{index + 1}</BaseTd>
                <BaseTd>
                  {eventAttendee.attendee.firstname}{" "}
                  {eventAttendee.attendee.lastname}
                </BaseTd>
                <BaseTd>{eventAttendee.attendee.phoneNumber}</BaseTd>
                <BaseTd>{eventAttendee.attendee.beemId}</BaseTd>
                <BaseTd>
                  {convertEpochToDate(eventAttendee.attendee.createdAt)}
                </BaseTd>
                <BaseTd width={0}>
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
                        color="green.500"
                        onClick={() =>
                          confirmWaitlistAttendee(eventAttendee.attendee)
                        }
                      >
                        Confirm
                      </MenuItem>
                      <EventAttendeeDeleteModal
                        attendee={eventAttendee.attendee}
                        eventId={eventId}
                      />
                    </MenuList>
                  </Menu>
                </BaseTd>
              </BaseTr>
            ))}
        </BaseTbody>
      </BaseTable>
    </>
  ) : (
    <div>No attendees yet</div>
  );
};

export { EventAttendeeTableAdminView };
