import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import { Box, Icon, Skeleton, Text } from "@chakra-ui/react";
import React from "react";
import { BsPersonFill } from "react-icons/bs";

interface Props {
  email: string | undefined;
  name: string | undefined;
  phone: string | undefined;
}

const ClubMetaInfo: React.FC<Props> = ({ email, name, phone }) => {
  return (
    <Box mt={2}>
      <Text variant={"label"} mb={1}>
        <Icon as={BsPersonFill} w={3} h={3} mr={1} />
        {name || <Skeleton>Some name lol</Skeleton>}
      </Text>
      <Text variant={"label"} mb={1}>
        <PhoneIcon w={3} h={3} mr={1} />
        {phone || <Skeleton>000000000</Skeleton>}
      </Text>
      <Text variant={"label"}>
        <EmailIcon w={3} h={3} mr={1} />
        {email || <Skeleton>example@example.com</Skeleton>}
      </Text>
    </Box>
  );
};

export { ClubMetaInfo };
