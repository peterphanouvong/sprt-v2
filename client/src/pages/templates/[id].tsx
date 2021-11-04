import { Flex, Spacer, Button, Spinner, Heading } from "@chakra-ui/react";
import Head from "next/head";
import { withUrqlClient } from "next-urql";
import React from "react";
import { BaseContent } from "../../components/BaseContent";
import { BaseLayout } from "../../components/BaseLayout";
import { BasePageHeader } from "../../components/BasePageHeader";
import { BaseSection } from "../../components/BaseSection";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { EventTemplate, useEventTemplateQuery } from "../../generated/graphql";
import { TemplateEventForm } from "../../components/TemplateEventForm";
import { BaseCard } from "../../components/BaseCard";

export const TemplatePage = () => {
  const router = useRouter();

  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const [{ data }] = useEventTemplateQuery({
    variables: { eventTemplateId: intId }
  });

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
        <Button
          size="sm"
          colorScheme="gray"
          mb={4}
          // onClick={onClick}
        >
          Create event from template
        </Button>
        <BaseCard padding={4}>
          <Heading variant="h6" as="h6">
            Template details
          </Heading>
          <TemplateEventForm template={data?.eventTemplate as EventTemplate} />
        </BaseCard>
      </BaseContent>
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient)(TemplatePage);
