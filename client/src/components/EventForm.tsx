import {
  VStack,
  ModalFooter,
  Button,
  FormLabel,
  Switch,
  Box,
  Text,
} from "@chakra-ui/react";
import { Steps, Step, useSteps } from "chakra-ui-steps";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { Event } from "../generated/graphql";
import { parseDate } from "../utils/parseDate";
import { parseRichText } from "../utils/parseRichText";
import { DynamicEditor } from "./DynamicEditor";
import { EventFormBasicDetails } from "./EventFormBasicDetails";
import { EventFormPickType } from "./EventFormPickType";
import { InputField } from "./InputField";
import { PrevNextButtons } from "./StepComponents";

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
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const [hasCapacity, setHasCapacity] = useState(
    event ? (!!event.capacity ? true : false) : false
  );

  const [hasDescription, setHasDescription] = useState(
    event ? (!!event.description ? true : false) : false
  );

  const toggleCapacity = (values: any) => {
    if (hasCapacity) {
      values.capacity = "";
    }
    setHasCapacity(!hasCapacity);
  };

  const toggleDescription = (values: any) => {
    if (hasDescription) {
      values.description = parseRichText("");
    }
    setHasDescription(!hasDescription);
  };

  const matchTimes = (e: any, values: any) => {
    console.log(e.target.value);
    values.endTime = e.target.value;
  };

  return (
    <>
      <Formik
        initialValues={
          event
            ? {
                title: event.title ?? "",
                description: parseRichText(event.description ?? ""),
                location: event.location ?? "",
                capacity: event.capacity ?? "",
                startTime: parseDate(event.startTime) ?? "",
                endTime: parseDate(event.endTime) ?? "",
              }
            : {
                title: "",
                description: parseRichText(""),
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
            description: JSON.stringify(values.description),
          });
        }}
      >
        {(props) => (
          <Form>
            {/* <EventFormBasicDetails /> */}
            <Box padding={6}>
              <Steps mb={6} colorScheme="orange" activeStep={activeStep}>
                <Step label="Event type">
                  <EventFormPickType nextStep={nextStep} />
                </Step>
                <Step label="Basic details">
                  <EventFormBasicDetails
                    matchTimes={matchTimes}
                    toggleCapacity={toggleCapacity}
                    hasCapacity={hasCapacity}
                    toggleDescription={toggleDescription}
                    hasDescription={hasDescription}
                    props={props}
                  />
                  <PrevNextButtons nextStep={nextStep} prevStep={prevStep} />
                </Step>
                <Step label="Confirmation">
                  <PrevNextButtons
                    prevStep={prevStep}
                    nextStep={nextStep}
                    final={true}
                  />
                </Step>
              </Steps>
            </Box>
            {/* <ModalFooter>
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
            </ModalFooter> */}
          </Form>
        )}
      </Formik>
    </>
  );
};

export { EventForm };
