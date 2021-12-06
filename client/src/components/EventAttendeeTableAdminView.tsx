import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Button,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Attendee } from "../generated/graphql";
import { convertEpochToDate } from "../utils/parseDate";
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

const EventAttendeeTableAdminView: React.FC<Props> = ({ attendees }) => {
  return attendees.length > 0 ? (
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
                  <VStack>
                    <Button colorScheme="green" variant="solid">
                      Confirm
                    </Button>
                    <Button colorScheme="red" variant="solid">
                      Delete
                    </Button>
                  </VStack>
                </MenuList>
              </Menu>
            </BaseTd>
          </BaseTr>
        ))}
      </BaseTbody>
    </BaseTable>
  ) : (
    <div>No attendees yet</div>
  );
};

export { EventAttendeeTableAdminView };
