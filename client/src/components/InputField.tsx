import {
  FormLabel,
  Input,
  FormErrorMessage,
  InputLeftElement,
  FormControl,
  InputGroup,
  Text,
  HStack,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes, ReactElement } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  icon?: ReactElement<any, any>;
  isNumberInput?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  icon,
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
