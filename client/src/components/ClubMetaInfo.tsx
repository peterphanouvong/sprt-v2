import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon, Skeleton, Text } from "@chakra-ui/react";
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
      <Flex>
        <Text variant="label">
          <PhoneIcon w={3} h={3} mr={3} />
        </Text>
        <Text variant="label">
          {!name?.includes("undefined") ? (
            name
          ) : (
            <Skeleton>Erik Shoji</Skeleton>
          )}
        </Text>
      </Flex>

      <Flex>
        <Text variant="label">
          <Icon as={BsPersonFill} w={3} h={3} mr={3} />
        </Text>
        <Text variant="label">
          {phone || <Skeleton mt={1}>000000000</Skeleton>}
        </Text>
      </Flex>

      <Flex>
        <Text variant="label">
          <EmailIcon w={3} h={3} mr={3} />
        </Text>
        <Text variant="label">
          {email || <Skeleton mt={1}>example@example.com</Skeleton>}
        </Text>
      </Flex>
    </Box>
  );
};

export { ClubMetaInfo };
