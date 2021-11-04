import { BoxProps } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import React from "react";

interface Props {}

const BaseTable: React.FC<Props> = (props) => {
  return <Table mt={4}>{props.children}</Table>;
};

const BaseThead: React.FC<Props> = ({ children }) => {
  return (
    <Thead bgColor="gray.50" border="1px solid" borderColor="gray.200">
      {children}
    </Thead>
  );
};
const BaseTbody: React.FC<Props> = ({ children }) => {
  return <Tbody mt={4}>{children}</Tbody>;
};

const BaseTh: React.FC<BoxProps> = ({ ...props }) => {
  return (
    <Th
      lineHeight="auto"
      border="none"
      fontSize="0.8rem"
      textTransform="uppercase"
      fontWeight="normal"
      px={4}
      py={3}
      height="auto"
      {...props}
    >
      {props.children}
    </Th>
  );
};
const BaseTr: React.FC<Props> = ({ children }) => {
  return <Tr>{children}</Tr>;
};
const BaseTd: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Td px={4} py={1} {...props}>
      {children}
    </Td>
  );
};

export { BaseTable, BaseThead, BaseTbody, BaseTh, BaseTr, BaseTd };
