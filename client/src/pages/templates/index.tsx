import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import React from "react";
import { BsPlus } from "react-icons/bs";
import { BaseContent } from "../../components/BaseContent";
import { BaseLayout } from "../../components/BaseLayout";
import { BasePageHeader } from "../../components/BasePageHeader";
import { TemplateCreateButton } from "../../components/TemplateCreateButton";
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

      <BaseContent bg="transparent">
        <Flex>
          <InputGroup flex={6}>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input bgColor="white" placeholder="Search" />
          </InputGroup>
          <Box mr={4} />
          <TemplateCreateButton />
        </Flex>
        <TemplateEventList />
      </BaseContent>
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Templates);
