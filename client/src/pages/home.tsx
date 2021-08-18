import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import { Text } from "@chakra-ui/react";
import { useIsAuth } from "../utils/useIsAuth";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { Card } from "../components/Card";
import { EventFormPickType } from "../components/EventFormPickType";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { PrevNextButtons } from "../components/StepComponents";
import { EventForm } from "../components/EventForm";
import { useCreateEventMutation } from "../generated/graphql";
import { formatDateForPostgres } from "../utils/parseDate";

interface Props {}

const Home: React.FC<Props> = ({}) => {
  useIsAuth();
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const [, createEvent] = useCreateEventMutation();

  const onSubmit = async (values) => {
    const { error } = await createEvent({
      input: {
        ...values,
        startTime: formatDateForPostgres(values.startTime),
        endTime: formatDateForPostgres(values.endTime),
        capacity: values.capacity === "" ? null : parseInt(values.capacity),
      },
    });
  };

  return (
    <Layout>
      <Text as="h1" fontSize="large">
        Home page
      </Text>
      <Card>
        <Steps colorScheme="orange" activeStep={activeStep}>
          <Step label="Event type">
            <EventFormPickType nextStep={nextStep} />
          </Step>
          <Step label="Basic details">
            <EventForm
              submitMessage={"Create"}
              onSubmit={onSubmit}
              onClose={() => {}}
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
      </Card>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
