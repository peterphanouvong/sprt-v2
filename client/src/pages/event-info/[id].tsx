import React, { useState } from "react";
import { useRouter } from "next/router";
import { useEventQuery } from "../../generated/graphql";
import { Layout } from "../../components/Layout";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { BackButton } from "../../components/BackButton";
import { Box, Heading, HStack, Text } from "@chakra-ui/layout";
import {
  Button,
  Checkbox,
  IconButton,
  MenuItemOption,
  MenuOptionGroup,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import { OptionsButton } from "../../components/OptionsButton";
import { CSVLink } from "react-csv";
import { DownloadIcon } from "@chakra-ui/icons";

const attendeeFieldOptions = [
  { label: "First name", value: "firstname" },
  { label: "Last name", value: "lastname" },
  { label: "Username", value: "username" },
  { label: "Id", value: "id" },
];

interface Props {}

const EventInfo: React.FC<Props> = ({}) => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, fetching, error }] = useEventQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });

  const [selectedAttendeeFields, setSelectedAttendeeFields] = useState<
    Record<string, boolean>
  >({
    firstname: true,
    lastname: true,
  });

  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  if (fetching) return <>loading..</>;
  if (error) return <Layout>{error.message}</Layout>;
  if (!data?.event) return <Layout>couldn't find the event</Layout>;

  return (
    <Layout title={data.event.title}>
      <HStack spacing={4} mb={6}>
        <Heading as="h3" variant="h3">
          {data.event.title}
        </Heading>
      </HStack>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box mb={2} display="flex" alignItems="center">
          <Heading as="h5" variant="h5">
            Attendees
          </Heading>
          <CSVLink
            data={[
              attendeeFieldOptions
                .filter((x) => selectedAttendeeFields[x.value])
                .map((x) => x.label),
              ...data.event.attendees.map((x) => {
                let userInfo = [];
                Object.keys(selectedAttendeeFields).forEach((field) => {
                  //@ts-ignore
                  userInfo.push(x[field]);
                });
                return userInfo;
              }),
            ]}
          >
            <Tooltip label="download">
              <IconButton
                icon={<DownloadIcon />}
                variant="ghost"
                aria-label="download-list"
                size={isSmallScreen ? "sm" : "md"}
              />
            </Tooltip>
          </CSVLink>
        </Box>

        <OptionsButton closeOnSelect={false}>
          <MenuOptionGroup
            defaultValue={attendeeFieldOptions
              .filter((x) => selectedAttendeeFields[x.value])
              .map((x) => x.value)}
            title="Fields"
            type="checkbox"
          >
            {attendeeFieldOptions.map((x) => (
              <MenuItemOption
                onClick={() =>
                  setSelectedAttendeeFields({
                    ...selectedAttendeeFields,
                    [x.value]: !selectedAttendeeFields[x.value],
                  })
                }
                value={x.value}
              >
                {x.label}
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
        </OptionsButton>
      </Box>

      <Box overflowX="auto">
        <Table size="sm">
          <Thead>
            <Tr>
              {attendeeFieldOptions
                .filter((x) => selectedAttendeeFields[x.value])
                .map((x) => (
                  <Th whiteSpace="nowrap" key={x.value} pl={0} pr={10}>
                    {x.label}
                  </Th>
                ))}
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.event.attendees.map((x) => {
              return (
                <Tr key={x.id}>
                  {attendeeFieldOptions
                    .filter((x) => selectedAttendeeFields[x.value])
                    .map((field) => {
                      return (
                        <Td key={field.value} pl={0} pr={4}>
                          <Text variant="body-2">{x[field.value]}</Text>
                        </Td>
                      );
                    })}
                  <Td pl={0} width={0}>
                    <Checkbox />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>

      <Box mt={4}>
        <CSVLink
          data={[
            attendeeFieldOptions
              .filter((x) => selectedAttendeeFields[x.value])
              .map((x) => x.label),
            ...data.event.attendees.map((x) => {
              let userInfo = [];
              attendeeFieldOptions
                .filter((x) => selectedAttendeeFields[x.value])
                .forEach((field) => {
                  //@ts-ignore
                  userInfo.push(x[field.value]);
                });
              return userInfo;
            }),
          ]}
        >
          <Button
            size={isSmallScreen ? "sm" : "md"}
            leftIcon={<DownloadIcon />}
          >
            Download table
          </Button>
        </CSVLink>
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EventInfo);
