import { Box } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
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
  clubId: number | null;
}

const EventForm: React.FC<Props> = ({ event, onClose, onSubmit, clubId }) => {
  const { nextStep, prevStep, activeStep } = useSteps({
    initialStep: 0,
  });

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
                creatorTypeId: !!clubId ? 2 : 1,
                publicityTypeId: 1,
                clubId: clubId,
              }
            : {
                title: "",
                description: parseRichText(""),
                location: "",
                startTime: "",
                endTime: "",
                capacity: "",
                creatorTypeId: !!clubId ? 2 : 1,
                publicityTypeId: 1,
                clubId: clubId,
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
            <Box padding={6}>
              <Steps activeStep={activeStep}>
                <Box mt={6}>
                  <EventFormBasicDetails
                    props={props}
                    onClose={onClose}
                    nextStep={nextStep}
                  />
                </Box>

                <Box mt={6}>
                  <EventFormEventDetails
                    props={props}
                    matchTimes={matchTimes}
                    prevStep={prevStep}
                    nextStep={nextStep}
                  />
                </Box>

                <Box mt={6}>
                  <EventFormPickType
                    props={props}
                    prevStep={prevStep}
                    setValues={props.setFieldValue}
                  />
                </Box>
              </Steps>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export { EventForm };
