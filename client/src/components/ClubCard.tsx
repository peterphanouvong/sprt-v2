import { EmailIcon, PhoneIcon, WarningIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  Link,
  MenuItem,
  Skeleton,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import {
  Club,
  useAddRequestedMemberMutation,
  // useDeleteClubMutation,
  useMeQuery,
  User,
} from "../generated/graphql";
import { AccordionUsers } from "./AccordionUsers";
import { Card } from "./Card";
import { ClubEditButton } from "./ClubEditButton";
import { ClubFollowButton } from "./ClubFollowButton";
import { OptionsButton } from "./OptionsButton";
import { ClubDeleteButton } from "./ClubDeleteButton";
import NextLink from "next/link";
import { pluralize } from "../utils/pluralize";
import { ClubJoinButton } from "./ClubJoinButton";

interface Props {
  club: Club;
}

const ClubCard: React.FC<Props> = ({ club }) => {
  // const [, deleteClub] = useDeleteClubMutation();
  const [{ data: userData }] = useMeQuery();
  const [, addRequestedMember] = useAddRequestedMemberMutation();
  const toast = useToast();

  const [hasRequestedToJoin, setHasRequestedToJoin] = React.useState(false);

  const [followers, setFollowers] = React.useState(club.followers);

  const isAuthorised = (club: Club) => {
    if (!userData) {
      return false;
    }
    return club.admins
      .map((admin) => admin.username)
      .includes(userData.me!.username);
  };

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

  const requestToJoinClub = async () => {
    const { data, error } = await addRequestedMember({
      userId: userData!.me!.id,
      clubId: club.id,
    });

    if (!error && data) {
      toast({
        position: "top",
        variant: "subtle",
        duration: 3000,
        isClosable: true,
        status: "success",
        title: `A request has been sent to "${club.name}".`,
        description: "Please wait for the club to accept your request.",
      });
    } else if (error) {
      toast({
        position: "top",
        variant: "subtle",
        duration: 3000,
        isClosable: true,
        status: "error",
        title: `Error.`,
        description: error.message,
      });
    }

    setHasRequestedToJoin(true);
  };

  if (!userData) {
    return <Skeleton height='250px'></Skeleton>;
  }

  return (
    <Card>
      <Box display='flex' justifyContent='space-between'>
        <Box>
          <Heading mb={4}>
            <a href={`/club/${club.id}`}>
              <Link>{club.name}</Link>
            </a>
          </Heading>
        </Box>
        <OptionsButton>
          {isAuthorised(club) ? (
            <>
              <ClubEditButton club={club} />
              <ClubDeleteButton clubId={club.id} />
            </>
          ) : (
            <MenuItem icon={<WarningIcon />}>Report</MenuItem>
          )}
        </OptionsButton>
      </Box>
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
    /* 
    <Card>
      <Box display='flex' justifyContent='space-between'>
        <Box>
          <Heading>
            <a href={`/club/${club.id}`}>
              <Link>{club.name}</Link>
            </a>
          </Heading>
          {club.admins.map((admin) => (
            <Text key={admin.username}>Owner: {admin.username}</Text>
          ))}
          <Text>Email: {club.email}</Text>
          <Text>{club.description}</Text>
        </Box>
        <OptionsButton>
          {isAuthorised(club) ? (
            <>
              <ClubEditButton club={club} />
              <ClubDeleteButton clubId={club.id} />
            </>
          ) : (
            <MenuItem icon={<WarningIcon />}>Report</MenuItem>
          )}
        </OptionsButton>
      </Box>
      <ClubFollowButton
        followerList={club.followers}
        clubId={club.id}
        data={userData}
        addFollower={addFollower}
        removeFollower={removeFollower}
      />
    </Card>
    */
  );
};

export { ClubCard };
