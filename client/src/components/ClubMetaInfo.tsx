import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon, Skeleton, Text } from "@chakra-ui/react";
import React from "react";
import { BsPersonFill } from "react-icons/bs";
import { SiFacebook, SiInstagram } from "react-icons/si";
import { IoGlobeOutline } from "react-icons/io5";
import { Maybe } from "../generated/graphql";

interface Props {
  email: string | undefined;
  name: string | undefined;
  phone: string | undefined;
  facebookLink: Maybe<string> | undefined;
  instagramLink: Maybe<string> | undefined;
  websiteLink: Maybe<string> | undefined;
}

const ClubMetaInfo: React.FC<Props> = ({
  email,
  name,
  phone,
  facebookLink,
  instagramLink,
  websiteLink,
}) => {
  return (
    <Box mt={2}>
      <Flex>
        <Text variant='label'>
          <Icon as={BsPersonFill} w={3} h={3} mr={3} />
        </Text>
        <Text variant='label'>
          {!name?.includes("undefined") ? (
            name
          ) : (
            <Skeleton>Erik Shoji</Skeleton>
          )}
        </Text>
      </Flex>

      {/* <Flex>
        <Text variant='label'>
          <PhoneIcon w={3} h={3} mr={3} />
        </Text>
        <Text variant='label'>
          {phone || <Skeleton mt={1}>000000000</Skeleton>}
        </Text>
      </Flex> */}
      {facebookLink && (
        <Flex>
          <Text variant='label'>
            <Icon as={SiFacebook} w={3} h={3} mr={3} />
          </Text>
          <Text variant='label'>
            {facebookLink || <Skeleton mt={1}>000000000</Skeleton>}
          </Text>
        </Flex>
      )}

      {instagramLink && (
        <Flex>
          <Text variant='label'>
            <Icon as={SiInstagram} w={3} h={3} mr={3} />
          </Text>
          <Text variant='label'>
            {instagramLink || <Skeleton mt={1}>000000000</Skeleton>}
          </Text>
        </Flex>
      )}

      {websiteLink && (
        <Flex>
          <Text variant='label'>
            <Icon as={IoGlobeOutline} w={3} h={3} mr={3} />
          </Text>
          <Text variant='label'>
            {websiteLink || <Skeleton mt={1}>000000000</Skeleton>}
          </Text>
        </Flex>
      )}

      <Flex>
        <Text variant='label'>
          <EmailIcon w={3} h={3} mr={3} />
        </Text>
        <Text variant='label'>
          {email || <Skeleton mt={1}>example@example.com</Skeleton>}
        </Text>
      </Flex>
    </Box>
  );
};

export { ClubMetaInfo };
