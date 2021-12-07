import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Heading,
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
    <>
      <Heading variant="h4">Confirmed</Heading>
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

      <Heading variant="h4" mt={4}>
        Waitlist
      </Heading>
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
    </>
  ) : (
    <div>No attendees yet</div>
  );
};

export { EventAttendeeTable };
