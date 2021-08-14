import {
  FormLabel,
  Input,
  FormErrorMessage,
  InputLeftElement,
  FormControl,
  InputGroup,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes, ReactElement } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  icon?: ReactElement<any, any>;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  icon,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error} isRequired={props.required}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputGroup>
        {icon && <InputLeftElement pointerEvents="none" children={icon} />}
        <Input
          {...field}
          {...props}
          id={field.name}
          placeholder={props.placeholder}
        />
      </InputGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export { InputField };
