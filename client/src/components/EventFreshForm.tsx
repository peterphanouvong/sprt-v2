import { Box, Button, Flex, Heading, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useCreateEventMutation } from "../generated/graphql";
import { parseRichText } from "../utils/parseRichText";
import { useIsMobileScreen } from "../utils/useIsMobileScreen";
import { BaseCard } from "./BaseCard";
import { BaseDynamicEditor } from "./BaseDynamicEditor";
import { BaseInputField } from "./BaseInputField";

interface Props {
  initialValues?: {
    title: string | undefined;
    venue: string | undefined | null;
    date: string | undefined | null;
    address: string | undefined | null;
    price: string | undefined | null;
    description: string | undefined | null;
    startTime: string | undefined | null;
    endTime: string | undefined | null;
    capacity: string | undefined | null;
    youtubeLink: string | undefined | null;
    clubBeemId: string | undefined | null;
    bsb: string | undefined | null;
    accountNumber: string | undefined | null;
  };
}

const EventFreshForm: React.FC<Props> = ({ initialValues }) => {
  const [, createEvent] = useCreateEventMutation();
  const isMobile = useIsMobileScreen();
  const router = useRouter();

  return (
    <BaseCard padding={6}>
      <Heading variant="h5" mb={4}>
        Event details
      </Heading>
      <Box flex={1}>
        <Formik
          initialValues={
            initialValues
              ? initialValues
              : {
                  title: "",
                  venue: "",
                  date: "",
                  address: "",
                  price: "",
                  description: parseRichText(""),
                  startTime: "",
                  endTime: "",
                  capacity: "",
                  youtubeLink: "",
                  clubBeemId: "",
                  bsb: "",
                  accountNumber: "",
                }
          }
          onSubmit={async (values) => {
            console.log(values);
            console.log("submit");

            const res = await createEvent({
              input: {
                ...values,
                capacity: values.capacity
                  ? parseInt(values.capacity)
                  : undefined,
                price: values.price ? parseFloat(values.price) : undefined,
                description: JSON.stringify(values.description),
                clubBeemId: values.clubBeemId,
              },
            });

            if (res.error) {
              console.log(res);
              alert(res.error);
            } else {
              router.push(`/events/${res.data?.createEvent.id}`);
            }
            console.log(res);
          }}
        >
          {(props) => (
            <Form>
              <VStack spacing={4} alignItems="stretch">
                <BaseInputField
                  label="Title"
                  name="title"
                  touched={props.touched.title as boolean}
                  width="400px"
                  required
                />
                <BaseInputField
                  label="Venue"
                  name="venue"
                  touched={props.touched.venue as boolean}
                  width="400px"
                  required
                />
                <BaseInputField
                  label="Address"
                  name="address"
                  touched={props.touched.address as boolean}
                  width="400px"
                  required
                />
                <BaseInputField
                  label="Date"
                  name="date"
                  touched={props.touched.date as boolean}
                  width="200px"
                  type="date"
                  required
                />
                <Flex width="90%">
                  <BaseInputField
                    label="Start"
                    name="startTime"
                    touched={props.touched.startTime as boolean}
                    type="time"
                    required
                  />

                  <Box mr={4} />

                  <BaseInputField
                    label="End"
                    name="endTime"
                    touched={props.touched.endTime as boolean}
                    type="time"
                    required
                  />
                </Flex>
                <BaseInputField
                  label="Price"
                  name="price"
                  touched={props.touched.price as boolean}
                  type="number"
                  width={20}
                  required
                />

                <BaseInputField
                  label="Capacity"
                  name="capacity"
                  touched={props.touched.capacity as boolean}
                  type="number"
                  width={20}
                />

                <BaseInputField
                  label="Club Beem Id"
                  name="clubBeemId"
                  touched={props.touched.clubBeemId as boolean}
                  type="string"
                  width="200px"
                />

                <Flex width="90%">
                  <BaseInputField
                    label="BSB"
                    name="bsb"
                    touched={props.touched.bsb as boolean}
                    width="200px"
                  />

                  <Box mr={4} />

                  <BaseInputField
                    label="Account Number"
                    name="accountNumber"
                    touched={props.touched.accountNumber as boolean}
                    width="200px"
                  />
                </Flex>

                <BaseDynamicEditor
                  label="Description"
                  setFieldValue={props.setFieldValue}
                  name="description"
                  initialValue={props.values.description}
                />

                <BaseInputField
                  label="Youtube Link"
                  name="youtubeLink"
                  touched={props.touched.youtubeLink as boolean}
                  width="400px"
                />

                <Button
                  isLoading={props.isSubmitting}
                  size={isMobile ? "md" : "lg"}
                  type="submit"
                >
                  Create event!
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </BaseCard>
  );
};

export { EventFreshForm };
