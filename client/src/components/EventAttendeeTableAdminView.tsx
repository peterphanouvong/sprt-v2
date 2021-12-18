import { CheckIcon, CloseIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import React from "react";
import {
  EventAttendee,
  useConfirmAttendeeMutation,
  useUnconfirmAttendeeMutation,
} from "../generated/graphql";
import { tableViewFormat } from "../utils/parseDate";
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
  isWaitlist: boolean;
}

const EventAttendeeTableAdminView: React.FC<Props> = ({
  eventAttendees,
  eventId,
  isWaitlist,
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

  console.log(eventAttendees);

  return eventAttendees.length > 0 ? (
    <>
      <Box overflowX="auto" maxW="100%">
        <BaseTable>
          <BaseThead>
            <BaseTr>
              <BaseTh>Pos</BaseTh>
              <BaseTh>Name</BaseTh>
              <BaseTh>Phone</BaseTh>
              <BaseTh>BeemID</BaseTh>
              <BaseTh>Cash</BaseTh>
              <BaseTh>Joined</BaseTh>

              <BaseTh width={0}></BaseTh>
            </BaseTr>
          </BaseThead>
          <BaseTbody>
            {eventAttendees.map((eventAttendee, index) => (
              <BaseTr key={index}>
                <BaseTd>{index + 1}</BaseTd>
                <BaseTd>
                  {eventAttendee.attendee.firstname}{" "}
                  {eventAttendee.attendee.lastname}
                </BaseTd>
                <BaseTd>{eventAttendee.attendee.phoneNumber}</BaseTd>
                <BaseTd>
                  {eventAttendee.attendee.beemId || <MinusIcon />}
                </BaseTd>
                <BaseTd>
                  {eventAttendee.isPayingCash ? <CheckIcon /> : <CloseIcon />}
                </BaseTd>
                <BaseTd>
                  {tableViewFormat(eventAttendee.attendee.createdAt)}
                </BaseTd>
                <BaseTd width={0}>
                  {isWaitlist ? (
                    <ButtonGroup>
                      <Button
                        colorScheme="green"
                        size="sm"
                        onClick={() =>
                          confirmWaitlistAttendee(eventAttendee.attendee)
                        }
                      >
                        Confirm
                      </Button>
                      <EventAttendeeDeleteModal
                        attendee={eventAttendee.attendee}
                        eventId={eventId}
                        as="button"
                      />
                    </ButtonGroup>
                  ) : (
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() =>
                        removeConfirmedAttendee(eventAttendee.attendee)
                      }
                    >
                      Unconfirm
                    </Button>
                  )}
                </BaseTd>
              </BaseTr>
            ))}
          </BaseTbody>
        </BaseTable>
      </Box>
    </>
  ) : (
    <Box overflowX="auto">
      <BaseTable>
        <BaseThead>
          <BaseTr>
            <BaseTh>Position</BaseTh>
            <BaseTh>Name</BaseTh>
            <BaseTh width={0}></BaseTh>
          </BaseTr>
        </BaseThead>
        <BaseTbody>
          <Box padding={2}>Nothing here</Box>
        </BaseTbody>
      </BaseTable>
    </Box>
  );
};

export { EventAttendeeTableAdminView };
