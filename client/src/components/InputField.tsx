import {
  FormLabel,
  Input,
  FormErrorMessage,
  InputLeftElement,
  FormControl,
  InputGroup,
  Text,
  HStack,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
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

const InputField: React.FC<InputFieldProps> = ({
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
        <FormLabel htmlFor={field.name}>
          <HStack>
            <Text>{label}</Text>

            {!props.required && <Text variant="meta">(optional)</Text>}
          </HStack>
        </FormLabel>
      )}
      <InputGroup>
        {icon && <InputLeftElement pointerEvents="none" children={icon} />}
        {props.type === "number" ? (
          <NumberInput min={min as number | undefined}>
            <NumberInputField
              {...field}
              {...props}
              id={field.name}
              placeholder={props.placeholder}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        ) : (
          <Input
            {...field}
            {...props}
            id={field.name}
            placeholder={props.placeholder}
          />
        )}
      </InputGroup>
      {touched && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export { InputField };
