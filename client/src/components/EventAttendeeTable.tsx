import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Box,
  Td,
} from "@chakra-ui/react";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { EventAttendee } from "../generated/graphql";
import {
  BaseTable,
  BaseTbody,
  BaseTd,
  BaseTh,
  BaseThead,
  BaseTr,
} from "./BaseTable";

interface Props {
  eventAttendees: EventAttendee[];
}

const EventAttendeeTable: React.FC<Props> = ({ eventAttendees }) => {
  console.log(eventAttendees);
  return eventAttendees.length > 0 ? (
    <>
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
            {eventAttendees
              // .filter((eventAttendee) => !eventAttendee.isConfirmed)
              .map((eventAttendee, index) => (
                <BaseTr key={index}>
                  <BaseTd>{index + 1}</BaseTd>
                  <BaseTd>
                    {eventAttendee.attendee.firstname}{" "}
                    {eventAttendee.attendee.lastname}
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
                        <MenuItem>Do something</MenuItem>
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

export { EventAttendeeTable };
