import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import {
  Heading,
  HStack,
  Box,
  Icon,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { BsPersonFill } from "react-icons/bs";
import { Club, useClubQuery, useMeQuery, User } from "../generated/graphql";
import { pluralize } from "../utils/pluralize";
import { Card } from "./Card";
import { ClubFollowButton } from "./ClubFollowButton";
import { ClubJoinButton } from "./ClubJoinButton";

interface Props {
  club: Club;
}

const ClubSimpleCard: React.FC<Props> = ({ club }) => {
  const [{ data: userData }] = useMeQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, fetching, error }] = useClubQuery({
    pause: intId === -1,
    variables: { clubId: intId },
  });
  const [followers, setFollowers] = React.useState<User[]>(
    data?.club.followers as User[]
  );
  const [members, setMembers] = React.useState<User[]>(
    data?.club.members as unknown as User[]
  );

  const addFollower = () => {
    setFollowers([...followers, userData!.me as User]);
  };

  const removeFollower = () => {
    console.log(followers);
    const newFollowers = followers.filter(
      (user) => user.id !== userData!.me!.id
    );
    console.log(newFollowers);
    setFollowers(newFollowers);
  };

  return (
    <Card>
      <Heading mb={4}>{club.name}</Heading>
      <HStack>
        <ClubFollowButton
          followerList={club.followers as User[]}
          data={userData}
          clubId={club.id}
          addFollower={addFollower}
          removeFollower={removeFollower}
        />
        <ClubJoinButton club={club as Club} />
      </HStack>

      <Box mt={4}>
        <Text variant={"label"} mb={1}>
          <Icon as={BsPersonFill} w={3} h={3} mr={1} />
          {club.admins[0].firstname + " " + club.admins[0].lastname}
        </Text>
        <Text variant={"label"} mb={1}>
          <PhoneIcon w={3} h={3} mr={1} />
          {club.phoneNumber}
        </Text>
        <Text variant={"label"}>
          <EmailIcon w={3} h={3} mr={1} />
          {club.email}
        </Text>
      </Box>

      <Text variant={"body-2"} marginY={4}>
        {club.description}
      </Text>
      {/* <Box onClick={onOpen} display={"inline"}>
        <Text variant={"body-3"} display={"inline"}>
          <b>{followers.length}</b> {pluralize(followers.length, "Follower")},{" "}
        </Text>
        <Text variant={"body-3"} display={"inline"}>
          <b>{members.length}</b> {pluralize(members.length, "Member")}
        </Text>
      </Box> */}
    </Card>
  );
};

export { ClubSimpleCard };
