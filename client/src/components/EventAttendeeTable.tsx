import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Attendee } from "../generated/graphql";
import {
  BaseTable,
  BaseTbody,
  BaseTd,
  BaseTh,
  BaseThead,
  BaseTr,
} from "./BaseTable";

interface Props {
  attendees: Attendee[];
}

const EventAttendeeTable: React.FC<Props> = ({ attendees }) => {
  return attendees.length > 0 ? (
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
          {attendees.map((attendee, index) => (
            <BaseTr key={index}>
              <BaseTd>{index + 1}</BaseTd>
              <BaseTd>
                {attendee.firstname} {attendee.lastname}
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
  ) : (
    <div>No attendees yet</div>
  );
};

export { EventAttendeeTable };
