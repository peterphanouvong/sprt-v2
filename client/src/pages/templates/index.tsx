import { Button, Flex, Spacer } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import React from "react";
import { BaseContent } from "../../components/BaseContent";
import { BaseLayout } from "../../components/BaseLayout";
import { BasePageHeader } from "../../components/BasePageHeader";
import { BaseSection } from "../../components/BaseSection";
import { TemplateEventList } from "../../components/TemplateEventList";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useIsAuth } from "../../utils/useIsAuth";

interface Props {}

const Templates: React.FC<Props> = ({}) => {
  useIsAuth();

  const onClick = () => {
    console.log("click");
  };

  return (
    <BaseLayout>
      <Head>
        <title>Templates | sprt</title>
      </Head>
      <BasePageHeader>Templates</BasePageHeader>

      <BaseContent>
        {/* <Grid templateColumns='1fr 3fr' gridGap={4} alignItems='start'>
          <EventListSideNav />
        </Grid> */}
        <Flex>
          <BaseSection title='Templates'></BaseSection>
          <Spacer />
          <Button
            size='sm'
            colorScheme='gray'
            variant='outline'
            onClick={onClick}
          >
            Create Template
          </Button>
        </Flex>
        <TemplateEventList />
      </BaseContent>
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Templates);
