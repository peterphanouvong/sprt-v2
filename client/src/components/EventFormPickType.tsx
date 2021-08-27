import {
  Box,
  Heading,
  Text,
  HStack,
  Button,
  Spinner,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { FormikProps } from "formik";
import React, { useState } from "react";
import { usePublicityTypesQuery } from "../generated/graphql";
import { SelectField } from "./SelectField";

interface Props {
  props: FormikProps<{
    title: string;
    description: any;
    location: string;
    capacity: string | number;
    startTime: string;
    endTime: string;
    creatorTypeId: number;
    publicityTypeId: number;
    clubId: number | null;
  }>;
  prevStep: () => void;
  setValues: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  submitMessage: string;
}

const EventFormPickType: React.FC<Props> = ({
  prevStep,
  setValues,
  props,
  submitMessage,
}) => {
  const [{ data, fetching }] = usePublicityTypesQuery();
  const [selected, setSelected] = useState(
    props.values.publicityTypeId.toString()
  );

  if (!data) return <Spinner />;
  if (!data && !fetching) return <>sumting wong</>;

  return (
    <Box>
      <Heading fontSize="x-large">Who's can see this event?</Heading>
      <Text mb={4}>Choose who gets to see this event.</Text>

      <RadioGroup
        name="publicityTypeId"
        onChange={(value) => {
          setSelected(value.toString());
          setValues("publicityTypeId", parseInt(value));
        }}
        value={selected}
      >
        <Stack>
          {data.publicityTypes.map((value) => {
            return (
              <Radio
                colorScheme="brand"
                value={value.id.toString()}
                key={value.id}
              >
                {value.name}
              </Radio>
            );
          })}
        </Stack>
      </RadioGroup>
      <Box mt={4}>
        {selected ===
        data.publicityTypes.find((x) => x.id === 1)!.id.toString() ? (
          <Text variant="meta">
            All of your followers will be able to see this event.
          </Text>
        ) : selected ===
          data.publicityTypes.find((x) => x.id === 2)!.id.toString() ? (
          <>
            <Text variant="meta">
              You can choose who gets to see this event.
            </Text>
            <Box mt={6}>
              <SelectField
                name="hello"
                isMulti
                placeholder=""
                label="Who's invited?"
                options={[
                  { value: "1", label: "Redfox" },
                  { value: "2", label: "Peter Phanouvong" },
                  { value: "3", label: "Tom Phanouvong" },
                  { value: "4", label: "Kevin Chau" },
                ]}
              />
            </Box>
          </>
        ) : (
          <></>
        )}
      </Box>
      <HStack display="flex" justifyContent="flex-end" mt={6}>
        <Text variant="meta">Step 3 of 3</Text>
        <Button variant="ghost" colorScheme="gray" onClick={prevStep}>
          Go back
        </Button>
        <Button colorScheme="brand" type="submit">
          {submitMessage}
        </Button>
      </HStack>
    </Box>
  );
};

export { EventFormPickType };
