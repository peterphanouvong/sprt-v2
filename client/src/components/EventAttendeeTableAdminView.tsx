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
import { BooleanSchema } from "yup";
import {
  Attendee,
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
  // attendees: {
  //   __typename?: "Attendee" | undefined;
  //   id: number;
  //   firstname: string;
  //   lastname: string;
  //   email?: string | undefined;
  //   phoneNumber: string;
  //   beemId: string;
  //   createdAt: string;
  //   updatedAt: string;
  //   isConfirmed: boolean;
  // }[];
  attendees: Attendee[];
  eventId: number;
  isWaitlist: boolean;
}

const EventAttendeeTableAdminView: React.FC<Props> = ({
  attendees,
  eventId,
  isWaitlist,
}) => {
  const [, confirmAttendee] = useConfirmAttendeeMutation();
  const [, unconfirmAttendee] = useUnconfirmAttendeeMutation();

  console.log(attendees);
  // const confirmedAttendees = attendees.filter(
  //   (attendee) => attendee.isConfirmed
  // );

  // const waitlistAttendees = attendees.filter(
  //   (attendee) => !attendee.isConfirmed
  // );

  // console.log(waitlistAttendees);

  const confirmWaitlistAttendee = (attendee) => {
    console.log(attendee);
    confirmAttendee({ attendeeId: attendee.id, eventId });
  };

  const removeConfirmedAttendee = (attendee) => {
    console.log(attendee);
    unconfirmAttendee({ attendeeId: attendee.id, eventId });
  };

  return attendees.length > 0 ? (
    <>
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
          {attendees.map((attendee, index) => (
            <BaseTr key={index}>
              <BaseTd>{index + 1}</BaseTd>
              <BaseTd>
                {attendee.firstname} {attendee.lastname}
              </BaseTd>
              <BaseTd>{attendee.phoneNumber}</BaseTd>
              <BaseTd>{attendee.beemId}</BaseTd>
              <BaseTd>{convertEpochToDate(attendee.createdAt)}</BaseTd>
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
                    {isWaitlist ? (
                      <>
                        <MenuItem
                          color="green.500"
                          onClick={() => confirmWaitlistAttendee(attendee)}
                        >
                          Confirm
                        </MenuItem>
                        <EventAttendeeDeleteModal
                          attendee={attendee}
                          eventId={eventId}
                        />
                      </>
                    ) : (
                      <MenuItem
                        color="red.500"
                        onClick={() => removeConfirmedAttendee(attendee)}
                      >
                        Unconfirm
                      </MenuItem>
                    )}
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
