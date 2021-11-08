import { Box, Button, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { TemplateContext } from "../context/templateContext";
import { useEventTemplatesQuery } from "../generated/graphql";

interface Props {}

const TemplateChooseList: React.FC<Props> = () => {
  const { setSelectedTemplateId, selectedTemplateId } =
    useContext(TemplateContext);

  const router = useRouter();
  const [{ data, fetching }] = useEventTemplatesQuery();

  const onClick = () => {
    router.push(`/new-event/from-template/${selectedTemplateId}`);
  };

  if (fetching) {
    return <div>Loading...</div>;
  }

  if (!fetching && !data) {
    <div>No data</div>;
  }

  return (
    <Box>
      <RadioGroup
        colorScheme='brand'
        onChange={setSelectedTemplateId}
        // defaultValue={data?.eventTemplates[0].id.toString()}
        value={selectedTemplateId?.toString()}
      >
        <Stack direction='column'>
          <Radio value={"-1"}>Blank Template</Radio>
          {data?.eventTemplates.map((template) => (
            <Radio key={template.id} value={template.id.toString()}>
              {template.templateName}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>

      <Button onClick={onClick} mt={4}>
        Confirm template selection
      </Button>
    </Box>
  );
};

export { TemplateChooseList };
