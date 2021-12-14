import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, Spinner, VStack } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { BaseCard } from "../../components/BaseCard";
import { BaseContent } from "../../components/BaseContent";
import { BaseLayout } from "../../components/BaseLayout";
import { BasePageHeader } from "../../components/BasePageHeader";
import { TemplateEventForm } from "../../components/TemplateEventForm";
import { EventTemplate, useEventTemplateQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useIsMobileScreen } from "../../utils/useIsMobileScreen";

export const TemplatePage = () => {
  const router = useRouter();

  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const [{ data }] = useEventTemplateQuery({
    variables: { eventTemplateId: intId },
  });

  const isMobile = useIsMobileScreen();

  const onClick = () => {
    router.push(`/new-event/from-template/${intId}`);
  };

  if (!data) {
    return <Spinner />;
  }

  return (
    <BaseLayout>
      <Head>
        <title>Templates | sprt</title>
      </Head>
      <BasePageHeader>
        {data?.eventTemplate.templateName as string}
      </BasePageHeader>

      <BaseContent>
        <Flex justifyContent="space-between">
          <Button
            size="sm"
            colorScheme="gray"
            mb={4}
            onClick={() => router.back()}
            leftIcon={<ChevronLeftIcon />}
          >
            Back
          </Button>

          <Button size="sm" mb={4} onClick={onClick}>
            Create event from template
          </Button>
        </Flex>
        <BaseCard padding={4}>
          <Heading variant="h6" as="h6">
            Template details
          </Heading>
          <TemplateEventForm template={data?.eventTemplate as EventTemplate} />
          <Button
            size={isMobile ? "sm" : "md"}
            colorScheme="gray"
            mt={2}
            width="100%"
            onClick={onClick}
          >
            Create event from template
          </Button>
        </BaseCard>
      </BaseContent>
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient)(TemplatePage);
