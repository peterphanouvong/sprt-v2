import { withUrqlClient } from "next-urql";
import Head from "next/head";
import React, { useState } from "react";
import { BaseLayout } from "../components/BaseLayout";
import { BasePageHeader } from "../components/BasePageHeader";
import { EventChoosePathContent } from "../components/EventChoosePathContent";
import { EventChooseTemplateContent } from "../components/EventChooseTemplateContent";
import { EventEditTemplateContent } from "../components/EventEditTemplateContent";
import { EventFreshContent } from "../components/EventFreshContent";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

interface Props {}

const NewEvent: React.FC<Props> = ({}) => {
  useIsAuth();

  const [content, setContent] = useState<
    "choosePath" | "fresh" | "chooseTemplate" | "editTemplate"
  >("choosePath");

  return (
    <BaseLayout>
      <Head>
        <title>New Event | sprt</title>
      </Head>
      <BasePageHeader>Create new event</BasePageHeader>

      {content === "choosePath" && (
        <EventChoosePathContent setContent={setContent} content={content} />
      )}

      {content === "fresh" && (
        <EventFreshContent setContent={setContent} content={content} />
      )}

      {content === "chooseTemplate" && (
        <EventChooseTemplateContent setContent={setContent} content={content} />
      )}

      {content === "editTemplate" && (
        <EventEditTemplateContent setContent={setContent} content={content} />
      )}
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(NewEvent);
