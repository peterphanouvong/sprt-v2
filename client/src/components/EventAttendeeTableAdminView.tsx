import { CheckIcon, CloseIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
      <DragDropContext
        onDragEnd={(result) => {
          const { destination, source, draggableId } = result;
          if (!destination) {
            return;
          }

          // Drop at the same place
          if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
          ) {
            return;
          }
          // TODO: finish reordering
          // database now stores the position -> update the positions after dropping
        }}
      >
        <Droppable droppableId="droppable">
          {(provided) => (
            <Box
              overflowX="auto"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
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
                    <Draggable
                      key={index}
                      draggableId={eventAttendee.attendee.phoneNumber}
                      index={index}
                    >
                      {(provided) => (
                        <Tr
                          key={index}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          backgroundColor={"white"}
                        >
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
                            {eventAttendee.isPayingCash ? (
                              <CheckIcon />
                            ) : (
                              <CloseIcon />
                            )}
                          </BaseTd>
                          <BaseTd>
                            {tableViewFormat(eventAttendee.attendee.createdAt)}
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
                                {isWaitlist ? (
                                  <>
                                    <MenuItem
                                      color="green.500"
                                      onClick={() =>
                                        confirmWaitlistAttendee(
                                          eventAttendee.attendee
                                        )
                                      }
                                    >
                                      Confirm
                                    </MenuItem>
                                    <EventAttendeeDeleteModal
                                      attendee={eventAttendee.attendee}
                                      eventId={eventId}
                                    />
                                  </>
                                ) : (
                                  <MenuItem
                                    color="red.500"
                                    onClick={() =>
                                      removeConfirmedAttendee(
                                        eventAttendee.attendee
                                      )
                                    }
                                  >
                                    Unconfirm
                                  </MenuItem>
                                )}
                              </MenuList>
                            </Menu>
                          </BaseTd>
                        </Tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </BaseTbody>
              </BaseTable>
            </Box>
          )}
        </Droppable>
      </DragDropContext>
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
