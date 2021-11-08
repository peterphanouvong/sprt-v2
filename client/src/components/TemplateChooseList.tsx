import { Box, Button, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { TemplateContext } from "../context/templateContext";
import { useEventTemplatesQuery } from "../generated/graphql";

interface Props {}

const TemplateChooseList: React.FC<Props> = () => {
  const { setSelectedTemplateId, selectedTemplateId } = useContext(
    TemplateContext
  );

  const [{ data, fetching }] = useEventTemplatesQuery();

  if (fetching) {
    return <div>Loading...</div>;
  }

  if (!fetching && !data) {
    <div>No data</div>;
  }

  return (
    <Box>
      <RadioGroup
        colorScheme="brand"
        onChange={setSelectedTemplateId}
        defaultValue={"1"}
        value={selectedTemplateId?.toString()}
      >
        <Stack direction="column">
          {data?.eventTemplates.map((template) => (
            <Radio key={template.id} value={template.id.toString()}>
              {template.templateName}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>

      <Button onClick={() => {}} mt={4}>
        Confirm template selection
      </Button>
    </Box>
  );
};

export { TemplateChooseList };
