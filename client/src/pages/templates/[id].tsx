import { Button, Heading, Spinner } from "@chakra-ui/react";
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

export const TemplatePage = () => {
  const router = useRouter();

  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const [{ data }] = useEventTemplateQuery({
    variables: { eventTemplateId: intId },
  });

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
        <Button size='sm' colorScheme='gray' mb={4} onClick={onClick}>
          Create event from template
        </Button>
        <BaseCard padding={4}>
          <Heading variant='h6' as='h6'>
            Template details
          </Heading>
          <TemplateEventForm template={data?.eventTemplate as EventTemplate} />
        </BaseCard>
      </BaseContent>
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient)(TemplatePage);
