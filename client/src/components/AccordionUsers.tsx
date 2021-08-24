import { CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  ListItem,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { User } from "../generated/graphql";

interface Props {
  userType: string;
  userList: User[];
  numHighlighted?: number;
}

const AccordionUsers: React.FC<Props> = ({
  userType,
  userList,
  numHighlighted = 0,
}) => {
  return (
    <Box mt={4}>
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton
            _hover={{
              backgroundColor: "gray.50",
            }}
          >
            <Box flex='1' textAlign='left'>
              <Text fontWeight='medium'>{userType}</Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel p={0}>
            {userList.map((attendee, index) => {
              const isHighlighted = index < numHighlighted;
              return (
                <ListItem
                  paddingY={1}
                  paddingX={4}
                  listStyleType='none'
                  key={attendee.id}
                  background={isHighlighted ? "green.50" : "yellow.50"}
                  _hover={{
                    backgroundColor: isHighlighted ? "green.100" : "yellow.100",
                  }}
                >
                  <Box
                    fontSize='sm'
                    color={isHighlighted ? "green.900" : "yellow.900"}
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                  >
                    {attendee.username}
                    {isHighlighted ? (
                      <CheckIcon color='green' />
                    ) : (
                      <Text>(waitlist)</Text>
                    )}
                  </Box>
                </ListItem>
              );
            })}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export { AccordionUsers };
