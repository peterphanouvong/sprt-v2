import { VStack, ModalFooter, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { Event } from "../generated/graphql";
import { parseDate } from "../utils/parseDate";
import { InputField } from "./InputField";
import { TextareaField } from "./TextareaField";

interface Props {
  event?: Event;
  onClose: () => void;
  onSubmit: (values: any) => Promise<void>;
}

const EventForm: React.FC<Props> = ({ event, onClose, onSubmit }) => {
  return (
    <Formik
      initialValues={
        event
          ? {
              title: event.title ?? "",
              description: event.description ?? "",
              location: event.location ?? "",
              startTime: parseDate(event.startTime) ?? "",
              endTime: parseDate(event.endTime) ?? "",
            }
          : {
              title: "",
              description: "",
              location: "",
              startTime: "",
              endTime: "",
            }
      }
      onSubmit={(values) => onSubmit(values)}
    >
      {(props) => (
        <Form>
          <VStack align="stretch" spacing={4} padding={4}>
            <InputField
              name="title"
              placeholder="what's it called?"
              label="Title"
              required
            />

            <InputField
              name="startTime"
              placeholder="when do I show up?"
              label="Start time"
              required
              type="datetime-local"
            />

            <InputField
              name="endTime"
              placeholder="when do I leave?"
              label="End time"
              type="datetime-local"
            />
            <InputField
              name="location"
              placeholder="where's it happening?"
              label="Location"
              required
            />
            <TextareaField
              name="description"
              placeholder="what's going down?"
              label="Description"
            />
          </VStack>

          <ModalFooter>
            <Button
              colorScheme="orange"
              variant="ghost"
              mr={3}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              colorScheme="orange"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Edit
            </Button>
          </ModalFooter>
        </Form>
      )}
    </Formik>
  );
};

export { EventForm };
