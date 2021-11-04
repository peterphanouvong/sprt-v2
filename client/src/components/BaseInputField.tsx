import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes, ReactElement } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  icon?: ReactElement<any, any>;
  isNumberInput?: boolean;
  touched: boolean;
};

const BaseInputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  icon,
  touched,
  min,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error && touched}>
      {label && (
        <FormLabel mb={1} htmlFor={field.name}>
          <HStack>
            <Text variant="body-3">{label}</Text>

            {!props.required && <Text variant="meta">(optional)</Text>}
          </HStack>
        </FormLabel>
      )}
      <InputGroup>
        {icon && <InputLeftElement pointerEvents="none" children={icon} />}

        <Input
          borderRadius="3px"
          {...field}
          {...props}
          id={field.name}
          placeholder={props.placeholder}
        />
      </InputGroup>
      {touched && (
        <FormErrorMessage data-testid={`${field.name}-register-form-error`}>
          {error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export { BaseInputField };
