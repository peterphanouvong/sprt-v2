import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React from "react";
import { Descendant } from "slate";

const RichTextEditor = dynamic(() => import("../components/RichTextEditor"), {
  ssr: false,
});

interface Props {
  placeholder?: string;
  label?: string;
  name: string;
  required?: boolean;
  setFieldValue?: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  readOnly?: boolean;
  initialValue?: Descendant[];
  hidden?: boolean;
}

const DynamicEditor: React.FC<Props> = ({
  label = true,
  readOnly = false,
  setFieldValue = (_field: string, _value: any) => {},
  initialValue = [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ],
  hidden = false,
  required = true,
  ...props
}) => {
  const setFormValue = (value) => {
    setFieldValue(props.name, value);
  };

  return (
    <Box hidden={hidden}>
      {label && (
        <FormLabel hidden={hidden} htmlFor={props.name}>
          <HStack>
            <Text>{label}</Text>

            {!required && <Text variant="meta">(optional)</Text>}
          </HStack>
        </FormLabel>
      )}
      <FormControl hidden={true}>
        <Input name={props.name} hidden={true} />
      </FormControl>
      <RichTextEditor
        readOnly={readOnly}
        setFormValue={setFormValue}
        initialValue={initialValue}
      />
    </Box>
  );
};

export { DynamicEditor };
