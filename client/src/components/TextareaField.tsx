import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type TextareaFieldProps = InputHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  label: string;
};

const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      {label && (
        <FormLabel htmlFor={field.name}>
          <HStack>
            <Text>{label}</Text>

            {!props.required && <Text variant="meta">(optional)</Text>}
          </HStack>
        </FormLabel>
      )}
      <Textarea
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export { TextareaField };
