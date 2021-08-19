import { Button, Box, Text, HStack } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { Event } from "../generated/graphql";
import { parseDate } from "../utils/parseDate";
import { parseRichText } from "../utils/parseRichText";
import { useSteps } from "../utils/useSteps";
import { EventFormBasicDetails } from "./EventFormBasicDetails";
import { EventFormEventDetails } from "./EventFormEventDetails";
import { EventFormPickType } from "./EventFormPickType";
import { Steps } from "./Steps";

interface Props {
  event?: Event;
  onClose: () => void;
  onSubmit: (values: any) => Promise<void>;
  submitMessage: string;
}

const EventForm: React.FC<Props> = ({ event, onClose, onSubmit }) => {
  const { nextStep, prevStep, activeStep } = useSteps({
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
              <Steps activeStep={activeStep}>
                <Box mt={6}>
                  <EventFormBasicDetails
                    toggleDescription={toggleDescription}
                    hasDescription={hasDescription}
                    props={props}
                  />
                  <HStack display="flex" justifyContent="flex-end" mt={6}>
                    <Text variant="meta">Step 1 of 3</Text>
                    <Button
                      variant="ghost"
                      colorScheme="gray"
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                    <Button colorScheme="orange" onClick={nextStep}>
                      Continue
                    </Button>
                  </HStack>
                </Box>

                <Box mt={6}>
                  <EventFormEventDetails
                    props={props}
                    matchTimes={matchTimes}
                    toggleCapacity={toggleCapacity}
                    hasCapacity={hasCapacity}
                  />
                  <HStack display="flex" justifyContent="flex-end" mt={6}>
                    <Text variant="meta">Step 2 of 3</Text>
                    <Button
                      variant="ghost"
                      colorScheme="gray"
                      onClick={prevStep}
                    >
                      Go back
                    </Button>
                    <Button colorScheme="orange" onClick={nextStep}>
                      Continue
                    </Button>
                  </HStack>
                </Box>

                <Box mt={6}>
                  <EventFormPickType />

                  <HStack display="flex" justifyContent="flex-end" mt={6}>
                    <Text variant="meta">Step 3 of 3</Text>
                    <Button
                      variant="ghost"
                      colorScheme="gray"
                      onClick={prevStep}
                    >
                      Go back
                    </Button>
                    <Button colorScheme="orange" type="submit">
                      Create event
                    </Button>
                  </HStack>
                </Box>
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
