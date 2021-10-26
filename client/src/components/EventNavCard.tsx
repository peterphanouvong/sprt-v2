import { Button, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { BaseCard } from "./BaseCard";

interface Props {
  navItems: {
    title: string;
    description: string;
    link: string;
    disabled?: boolean;
  }[];
  setContent: (arg0: any) => void;
  content: string;
}

const EventNavCard: React.FC<Props> = ({ navItems, content, setContent }) => {
  return (
    <BaseCard>
      <VStack spacing={2} alignItems="stretch">
        {navItems.map((n) => (
          <NavItem
            key={n.link}
            title={n.title}
            description={n.description}
            link={n.link}
            content={content}
            setContent={setContent}
            disabled={n.disabled ?? false}
          />
        ))}
      </VStack>
    </BaseCard>
  );
};

const NavItem = ({
  title,
  description,
  link,
  content,
  setContent,
  disabled,
}) => {
  return (
    <Button
      py={2}
      colorScheme="gray"
      variant="ghost"
      height="auto"
      flexDirection="column"
      alignItems="start"
      isActive={content === link}
      onClick={() => setContent(link)}
      borderRadius="sm"
      disabled={disabled}
    >
      <Text mb={1} variant="body-2" fontWeight="semibold">
        {title}
      </Text>
      <Text variant="label" fontWeight="normal">
        {description}
      </Text>
    </Button>
  );
};

export { EventNavCard };
