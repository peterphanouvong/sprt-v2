import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
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
  ...props
}) => {
  const setFormValue = (value) => {
    setFieldValue(props.name, value);
  };

  return (
    <Box>
      {label && <FormLabel htmlFor={props.name}>{label}</FormLabel>}
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
