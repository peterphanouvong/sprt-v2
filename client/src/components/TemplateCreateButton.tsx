import { Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { BsPlus } from "react-icons/bs";
import { TemplateCreateModal } from "./TemplateCreateModal";

interface Props {}

const TemplateCreateButton: React.FC<Props> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        minWidth="167px"
        flex={1}
        size="md"
        rightIcon={<BsPlus />}
        onClick={onOpen}
      >
        Create Template
      </Button>

      <TemplateCreateModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export { TemplateCreateButton };
