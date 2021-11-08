import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Tbody, Tr } from "@chakra-ui/table";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Attendee } from "../generated/graphql";
import { BaseTable, BaseTd, BaseTh, BaseThead, BaseTr } from "./BaseTable";

interface Props {
  attendees: Attendee[];
}

const EventAttendeeTable: React.FC<Props> = ({ attendees }) => {
  const onDragEnd = () => {
    console.log("on drag end");
  };
  return attendees.length > 0 ? (
    <DragDropContext onDragEnd={onDragEnd}>
      <BaseTable>
        <BaseThead>
          <BaseTr>
            <BaseTh>Position</BaseTh>
            <BaseTh>Name</BaseTh>
            <BaseTh width={0}></BaseTh>
          </BaseTr>
        </BaseThead>
        <Droppable droppableId='droppable'>
          {(provided) => (
            <Tbody ref={provided.innerRef} {...provided.droppableProps}>
              {attendees.map((attendee, index) => (
                <Draggable
                  key={index}
                  draggableId={attendee.phoneNumber}
                  index={index}
                >
                  {(provided) => (
                    <Tr
                      key={index}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <BaseTd>{index + 1}</BaseTd>
                      <BaseTd>
                        {attendee.firstname} {attendee.lastname}
                      </BaseTd>
                      <BaseTd width={0}>
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            aria-label='Options'
                            icon={<BsThreeDotsVertical />}
                            variant='ghost'
                            colorScheme='gray'
                            rounded='full'
                          />
                          <MenuList>
                            <MenuItem>Do something</MenuItem>
                          </MenuList>
                        </Menu>
                      </BaseTd>
                    </Tr>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Tbody>
          )}
        </Droppable>
      </BaseTable>
    </DragDropContext>
  ) : (
    <div>No attendees yet</div>
  );
};

export { EventAttendeeTable };
