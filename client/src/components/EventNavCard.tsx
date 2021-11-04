import { Text, VStack } from "@chakra-ui/react";
import React from "react";

interface Props {
  navItems: {
    title: string;
    link: string;
    disabled?: boolean;
  }[];
  setContent: (arg0: any) => void;
  content: string;
}

const EventNavCard: React.FC<Props> = ({ navItems, content, setContent }) => {
  return (
    <VStack spacing={2} alignItems="stretch">
      {navItems.map((n) => (
        <NavItem
          key={n.link}
          title={n.title}
          link={n.link}
          content={content}
          setContent={setContent}
          disabled={n.disabled ?? false}
        />
      ))}
    </VStack>
  );
};

const NavItem = ({ title, link, content, setContent, disabled }) => {
  return (
    <Text
      py={1}
      colorScheme="gray"
      height="auto"
      flexDirection="column"
      alignItems="start"
      fontWeight={content === link ? "medium" : "normal"}
      color={content === link ? "black" : "gray.500"}
      onClick={() => {
        if (!disabled) {
          setContent(link);
        }
      }}
      borderRadius="sm"
      disabled={disabled}
      transition="0.3s ease"
      _hover={
        disabled
          ? { cursor: "not-allowed" }
          : {
              color: "black",
              cursor: "pointer",
            }
      }
      variant="body-3"
    >
      {title}
    </Text>
  );
};

export { EventNavCard };
