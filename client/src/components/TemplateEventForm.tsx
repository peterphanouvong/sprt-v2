import { Button, useToast, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import {
  EventTemplate,
  useUpdateEventTemplateMutation,
} from "../generated/graphql";
import { convertEpochToDate, formatDateForPostgres } from "../utils/parseDate";
import { parseRichText } from "../utils/parseRichText";
import { useIsMobileScreen } from "../utils/useIsMobileScreen";
import { BaseDynamicEditor } from "./BaseDynamicEditor";
import { BaseInputField } from "./BaseInputField";

interface Props {
  template: EventTemplate;
}

const TemplateEventForm: React.FC<Props> = ({ template }) => {
  const toast = useToast();
  const isMobile = useIsMobileScreen();
  const [, updateTemplate] = useUpdateEventTemplateMutation();

  const initialValues = {
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
    bannerImageLink: template.bannerImageLink ? template.bannerImageLink : "",
    clubBeemId: template.clubBeemId ? template.clubBeemId : "",
  };

  const onSubmit = async (values) => {
    console.log(values);
    const { error, data } = await updateTemplate({
      input: {
        templateName: values.templateName as string,
        title: values.title,
        capacity: Number(values.capacity),
        date: formatDateForPostgres(values.date),
        startTime: values.startTime,
        endTime: values.endTime,
        venue: values.venue,
        address: values.address,
        price: Number(values.price),
        youtubeLink: values.youtubeLink,
        logoImageLink: values.logoImageLink,
        bannerImageLink: values.bannerImageLink,
        clubBeemId: values.clubBeemId,
        description: JSON.stringify(values.description),
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
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => onSubmit(values)}
    >
      {(props) => (
        <Form>
          <VStack spacing={4} mt={8} alignItems='stretch'>
            <BaseInputField
              label='Template Name'
              name='templateName'
              touched={props.touched.templateName as boolean}
              required
            />

            <BaseInputField
              label='Event Title'
              name='title'
              touched={props.touched.title as boolean}
              required
            />

            <BaseInputField
              label='Date'
              name='date'
              touched={props.touched.date as boolean}
              type='date'
            />

            <BaseInputField
              label='Capacity'
              name='capacity'
              touched={props.touched.capacity as boolean}
            />

            <BaseInputField
              label='Venue'
              name='venue'
              touched={props.touched.venue as boolean}
            />

            <BaseInputField
              label='Address'
              name='address'
              touched={props.touched.address as boolean}
            />

            <BaseInputField
              label='Price'
              name='price'
              touched={props.touched.price as boolean}
            />

            <BaseInputField
              label='Club Beem ID'
              name='clubBeemId'
              touched={props.touched.clubBeemId as boolean}
            />

            <BaseDynamicEditor
              label='Description'
              setFieldValue={props.setFieldValue}
              name='description'
              initialValue={props.values.description}
            />

            <Button
              isLoading={props.isSubmitting}
              size={isMobile ? "md" : "lg"}
              type='submit'
            >
              Save Changes
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>

    // <FormControl>
    //   <FormLabel>Template Name</FormLabel>
    //   <Input></Input>

    //   <FormLabel>Event Title</FormLabel>
    //   <Input></Input>

    //   <FormLabel>Date</FormLabel>
    //   <Input></Input>

    //   <FormLabel>Start Time</FormLabel>
    //   <Input></Input>

    //   <FormLabel>End Time</FormLabel>
    //   <Input></Input>

    //   <FormLabel>Capacity</FormLabel>
    //   <Input></Input>

    //   <FormLabel>Venue</FormLabel>
    //   <Input></Input>

    //   <FormLabel>Address</FormLabel>
    //   <Input></Input>

    //   <FormLabel>Price</FormLabel>
    //   <NumberInput
    //     onChange={(v) => setPrice(v.replace(/^\$/, ""))}
    //     value={price !== "" ? `$` + price : "$"}
    //     max={50}
    //   >
    //     <NumberInputField />
    //   </NumberInput>

    //   <FormLabel>Club BeemId</FormLabel>
    //   <Input></Input>

    //   <FormLabel>Address</FormLabel>
    //   <Input></Input>

    //   <FormLabel>Description</FormLabel>
    //   <Input></Input>

    //   <FormLabel>Youtube Link</FormLabel>
    //   <Input></Input>

    //   <FormLabel>Logo Image</FormLabel>
    //   <Input></Input>

    //   <FormLabel>Banner Image</FormLabel>
    //   <Input></Input>
    // </FormControl>
  );
};

export { TemplateEventForm };
