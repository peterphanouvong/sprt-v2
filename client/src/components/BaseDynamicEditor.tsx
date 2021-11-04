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

const RichTextEditor = dynamic(() => import("./RichTextEditor"), {
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

const BaseDynamicEditor: React.FC<Props> = ({
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
  ...props
}) => {
  const setFormValue = (value) => {
    setFieldValue(props.name, value);
  };

  return (
    <Box hidden={hidden}>
      {label && (
        <FormLabel mb={1} htmlFor={props.name}>
          <HStack>
            <Text variant="body-3">{label}</Text>

            {!props.required && (
              <Text hidden={readOnly} variant="meta">
                (optional)
              </Text>
            )}
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

export { BaseDynamicEditor };
