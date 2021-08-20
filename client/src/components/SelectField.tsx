import {
  FormControl,
  FormLabel,
  HStack,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";
import { InputHTMLAttributes } from "react";
import Select from "react-select";
import { SelectComponentsProps } from "react-select/src/Select";

type Props = InputHTMLAttributes<HTMLInputElement> &
  SelectComponentsProps & {
    name: string;
    label?: string;
    options: any[] | undefined;
  };
const SelectField: React.FC<Props> = ({ label, options, ...props }) => {
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
      <Select
        {...props}
        options={options}
        styles={{
          valueContainer: (provided) => ({
            ...provided,
            paddingLeft: "calc(1rem - 4px)",
            height: "calc(2.5rem -4px)",
          }),
        }}
        //@ts-ignore
        theme={(theme) => ({
          ...theme,
          borderRadius: "0.375rem",
          paddingLeft: "1rem",
          colors: {
            ...theme.colors,
            primary75: "#E2E8F0",
            primary50: "#E2E8F0",
            primary25: "#EDF2F7",
            primary: "#3182ce",
            // neutral0: "#E2E8F0",
            // neutral5: "red",
            neutral10: "#E2E8F0",
            neutral20: "#E2E8F0",
            neutral30: "#CBD5E0",
            neutral40: "#CBD5E0",
            // neutral50: "#A0AEC0",
            neutral60: "#CBD5E0",
            neutral70: "#CBD5E0",
            // neutral80: "#CBD5E0",
            // neutral90: "#CBD5E0",
          },
        })}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export { SelectField };
