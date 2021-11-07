import { Box, Button, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { TemplateContext } from "../context/templateContext";
import { BaseCard } from "./BaseCard";

interface Props {}

const EventTemplateList: React.FC<Props> = () => {
  const { setSelectedTemplateId, selectedTemplateId } =
    useContext(TemplateContext);

  return (
    <Box>
      <BaseCard>
        <RadioGroup
          colorScheme="brand"
          onChange={setSelectedTemplateId}
          value={selectedTemplateId}
        >
          <Stack direction="column">
            <Radio value="1">First template</Radio>
            <Radio value="2">Second template</Radio>
            <Radio value="3">Third template</Radio>
          </Stack>
        </RadioGroup>
      </BaseCard>

      <Button onClick={() => {}} mt={4}>
        Confirm template selection
      </Button>
    </Box>
  );
};

export { EventTemplateList };
