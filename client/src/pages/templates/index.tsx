import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import React from "react";
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

  const [filterString, setFilterString] = React.useState<string>("");

  const onChange = (event) => {
    setFilterString(event.target.value);
    // console.log(event.target.value);
  };

  return (
    <BaseLayout>
      <Head>
        <title>Templates | sprt</title>
      </Head>
      <BasePageHeader>Templates</BasePageHeader>

      <BaseContent bg='transparent'>
        <Flex>
          <InputGroup flex={6}>
            <InputLeftElement
              pointerEvents='none'
              children={<SearchIcon color='gray.300' />}
            />
            <Input bgColor='white' placeholder='Search' onChange={onChange} />
          </InputGroup>
          <Box mr={4} />
          <TemplateCreateButton />
        </Flex>
        <TemplateEventList filterString={filterString} />
      </BaseContent>
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Templates);
