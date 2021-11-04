import { Flex, Spacer, Button, Spinner } from "@chakra-ui/react";
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

export const TemplatePage = () => {
  const router = useRouter();

  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const [{ data }] = useEventTemplateQuery({
    variables: { eventTemplateId: intId },
  });

  if (!data) {
    return <Spinner />;
  }

  return (
    <BaseLayout>
      <Head>
        <title>Templates | sprt</title>
      </Head>
      <BasePageHeader>Templates</BasePageHeader>

      <BaseContent>
        <Flex>
          <BaseSection
            title={data?.eventTemplate.templateName as string}
          ></BaseSection>
          <Spacer />
          <Button
            size='sm'
            colorScheme='gray'
            variant='outline'
            // onClick={onClick}
          >
            Create Event From Template
          </Button>
        </Flex>
        <TemplateEventForm template={data?.eventTemplate as EventTemplate} />
      </BaseContent>
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient)(TemplatePage);
