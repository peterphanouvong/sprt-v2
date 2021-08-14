import {
  VStack,
  ModalFooter,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Switch,
  Box,
  Text,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { Event } from "../generated/graphql";
import { parseDate } from "../utils/parseDate";
import { InputField } from "./InputField";
import { TextareaField } from "./TextareaField";

interface Props {
  event?: Event;
  onClose: () => void;
  onSubmit: (values: any) => Promise<void>;
  submitMessage: string;
}

const EventForm: React.FC<Props> = ({
  event,
  onClose,
  onSubmit,
  submitMessage,
}) => {
  const [hasCapacity, setHasCapacity] = useState(
    event ? (!!event.capacity ? true : false) : true
  );

  const toggleCapacity = (values: any) => {
    if (hasCapacity) {
      values.capacity = "";
    }
    setHasCapacity(!hasCapacity);
  };

  const matchTimes = (e: any, values: any) => {
    console.log(e.target.value);
    values.endTime = e.target.value;
  };

  return (
    <Formik
      initialValues={
        event
          ? {
              title: event.title ?? "",
              description: event.description ?? "",
              location: event.location ?? "",
              capacity: event.capacity ?? "",
              startTime: parseDate(event.startTime) ?? "",
              endTime: parseDate(event.endTime) ?? "",
            }
          : {
              title: "",
              description: "",
              location: "",
              startTime: "",
              endTime: "",
              capacity: "",
            }
      }
      onSubmit={(values) => {
        console.log(values);
        onSubmit({
          ...values,
          capacity: values.capacity,
        });
      }}
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
              name="location"
              placeholder="where's it happening?"
              label="Location"
              required
            />
            <InputField
              name="startTime"
              placeholder="when do I show up?"
              label="Start time"
              required
              type="datetime-local"
              onBlurCapture={(x) => matchTimes(x, props.values)}
            />

            <InputField
              name="endTime"
              placeholder="when do I leave?"
              label="End time"
              type="datetime-local"
              min={props.values.startTime}
            />
            <Box>
              <FormLabel width="min" htmlFor="email-alerts">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-start"
                >
                  <Text mr={2}>Capacity</Text>
                  <Switch
                    id="email-alerts"
                    size="sm"
                    isChecked={hasCapacity}
                    onChange={() => toggleCapacity(props.values)}
                    colorScheme="orange"
                  />
                </Box>
              </FormLabel>

              <InputField
                hidden={!hasCapacity}
                name="capacity"
                placeholder="how many peeps?"
                type="number"
                min={0}
              />
            </Box>

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
              {submitMessage}
            </Button>
          </ModalFooter>
        </Form>
      )}
    </Formik>
  );
};

export { EventForm };
