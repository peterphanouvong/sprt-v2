import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import { Box, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { BsPersonFill } from "react-icons/bs";

interface Props {
  email: string;
  name: string;
  phone: string;
}

const ClubMetaInfo: React.FC<Props> = ({ email, name, phone }) => {
  return (
    <Box mt={2}>
      <Text variant={"label"} mb={1}>
        <Icon as={BsPersonFill} w={3} h={3} mr={1} />
        {name}
      </Text>
      <Text variant={"label"} mb={1}>
        <PhoneIcon w={3} h={3} mr={1} />
        {phone}
      </Text>
      <Text variant={"label"}>
        <EmailIcon w={3} h={3} mr={1} />
        {email}
      </Text>
    </Box>
  );
};

export { ClubMetaInfo };
