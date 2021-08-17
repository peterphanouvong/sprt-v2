import {
  FormLabel,
  InputGroup,
  // InputLeftElement,
  // Input,
  // FormErrorMessage,
} from "@chakra-ui/react";
import { Field, Form, Formik, useField } from "formik";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const RichTextEditor = dynamic(() => import("../components/RichTextEditor"), {
  ssr: false,
});

interface Props {
  placeholder?: string;
  label?: string;
  name: string;
  required?: boolean;
  content: string;
  setContent: (string) => void;
}

const DynamicEditor: React.FC<Props> = ({
  content,
  setContent,
  label,
  ...props
}) => {
  return (
    <>
      {label && <FormLabel htmlFor={props.name}>{label}</FormLabel>}
      <InputGroup>
        <RichTextEditor
          placeholder={props.placeholder}
          content={content}
          setContent={setContent}
        />
      </InputGroup>
    </>
  );
};

export { DynamicEditor };
