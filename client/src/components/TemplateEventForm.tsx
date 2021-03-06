import { Box, Button, Flex, Link, useToast, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import {
  EventTemplate,
  useCreateEventTemplateMutation,
  useUpdateEventTemplateMutation,
} from "../generated/graphql";
import { convertEpochToDate, formatDateForPostgres } from "../utils/parseDate";
import { parseRichText } from "../utils/parseRichText";
import { useIsMobileScreen } from "../utils/useIsMobileScreen";
import { BaseDynamicEditor } from "./BaseDynamicEditor";
import { BaseInputField } from "./BaseInputField";

interface Props {
  template?: EventTemplate | undefined;
  onClose?: () => void;
}

const TemplateEventForm: React.FC<Props> = ({ template, onClose }) => {
  const router = useRouter();
  const toast = useToast();
  const isMobile = useIsMobileScreen();
  const [, updateTemplate] = useUpdateEventTemplateMutation();
  const [, createEventTemplate] = useCreateEventTemplateMutation();

  const initialValues =
    template == undefined
      ? {
          templateName: "",
          title: "",
          description: parseRichText(""),
          capacity: "",
          date: "",
          startTime: "",
          endTime: "",
          venue: "",
          address: "",
          price: "",
          youtubeLink: "",
          logoImageLink: "",
          bannerImageLink: "",
          clubBeemId: "",
          bsb: "",
          accountNumber: "",
        }
      : {
          templateName: template.templateName ? template.templateName : "",
          title: template.title ? template.title : "",
          description: template.description
            ? parseRichText(template.description as string)
            : parseRichText(""),
          capacity: template.capacity ? template.capacity : "",
          date: template.date ? convertEpochToDate(template.date) : "",
          startTime: template.startTime ? template.startTime : "",
          endTime: template.endTime ? template.endTime : "",
          venue: template.venue ? template.venue : "",
          address: template.address ? template.address : "",
          price: template.price ? template.price : "",
          youtubeLink: template.youtubeLink ? template.youtubeLink : "",
          logoImageLink: template.logoImageLink ? template.logoImageLink : "",
          bannerImageLink: template.bannerImageLink
            ? template.bannerImageLink
            : "",
          clubBeemId: template.clubBeemId ? template.clubBeemId : "",
          bsb: template.bsb ? template.bsb : "",
          accountNumber: template.accountNumber ? template.accountNumber : "",
        };

  const onSubmit = async (values) => {
    console.log(values);
    if (template) {
      const { error, data } = await updateTemplate({
        input: {
          templateName: values.templateName as string,
          title: values.title,
          capacity: parseInt(values.capacity),
          date: formatDateForPostgres(values.date),
          startTime: values.startTime,
          endTime: values.endTime,
          venue: values.venue,
          address: values.address,
          price: parseFloat(values.price),
          youtubeLink: values.youtubeLink,
          logoImageLink: values.logoImageLink,
          bannerImageLink: values.bannerImageLink,
          clubBeemId: values.clubBeemId,
          description: JSON.stringify(values.description),
          bsb: values.bsb,
          accountNumber: values.accountNumber,
        },
        updateEventTemplateId: template.id,
      });
      console.log(data);

      if (error) {
        toast({
          description: error.message.substr(10),
          isClosable: true,
          position: "top",
          status: "error",
          variant: "subtle",
        });
      } else {
        toast({
          description: (
            <div>
              Changes saved successfully.{" "}
              <Link
                onClick={() => {
                  router.push(`/new-event/from-template/${template?.id}`);
                }}
                fontWeight="semibold"
              >
                Create event
              </Link>
            </div>
          ),
          isClosable: true,
          position: "top",
          status: "success",
          variant: "subtle",
        });
      }
    } else {
      const { data, error } = await createEventTemplate({
        input: {
          ...values,
          capacity: parseInt(values.capacity),
          price: parseFloat(values.price),
          date: formatDateForPostgres(values.date),
          description: JSON.stringify(values.description),
        },
      });

      if (error) {
        alert("something went wrong");
      } else {
        console.log("IT WORKD");
        console.log(data);
        // TODO: toast
        toast({
          description: "Successfully created event template",
          isClosable: true,
          position: "top",
          status: "success",
          variant: "subtle",
        });

        if (onClose) {
          onClose();
        }
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => onSubmit(values)}
    >
      {(props) => (
        <Form>
          <VStack spacing={4} mt={6} alignItems="stretch">
            <BaseInputField
              label="Template Name"
              name="templateName"
              touched={props.touched.templateName as boolean}
              width="400px"
              required
            />

            <BaseInputField
              label="Event Title"
              name="title"
              touched={props.touched.title as boolean}
              width="400px"
            />

            <BaseInputField
              label="Venue"
              name="venue"
              touched={props.touched.venue as boolean}
              width="400px"
            />

            <BaseInputField
              label="Address"
              name="address"
              touched={props.touched.address as boolean}
              width="500px"
            />

            <BaseInputField
              label="Date"
              name="date"
              touched={props.touched.date as boolean}
              width="200px"
              type="date"
            />

            <Flex width="90%">
              <BaseInputField
                label="Start"
                name="startTime"
                touched={props.touched.startTime as boolean}
                type="time"
              />

              <Box mr={4} />

              <BaseInputField
                label="End"
                name="endTime"
                touched={props.touched.endTime as boolean}
                type="time"
              />
            </Flex>

            <BaseInputField
              label="Price"
              name="price"
              touched={props.touched.price as boolean}
              width={20}
              type="number"
            />

            <BaseInputField
              label="Club Beem ID"
              name="clubBeemId"
              touched={props.touched.clubBeemId as boolean}
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

            <BaseInputField
              label="Capacity"
              name="capacity"
              touched={props.touched.capacity as boolean}
              width={20}
              type="number"
            />

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
              size={isMobile ? "sm" : "md"}
              type="submit"
            >
              {template ? "Save changes" : "Create template"}
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export { TemplateEventForm };
