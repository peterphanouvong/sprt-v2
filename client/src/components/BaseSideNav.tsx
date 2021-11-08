import { VStack, Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

interface Props {
  navItems: {
    title: string;
    link: string;
    disabled?: boolean;
  }[];
}

const BaseSideNav: React.FC<Props> = ({ navItems }) => {
  return (
    <VStack spacing={2} alignItems='stretch'>
      {navItems.map((n) => (
        <NavItem
          key={n.link}
          title={n.title}
          link={n.link}
          disabled={n.disabled ?? false}
        />
      ))}
    </VStack>
  );
};

const NavItem = ({ title, link, disabled }) => {
  const router = useRouter();
  // console.log(router);
  return (
    <NextLink href={link}>
      <Text
        py={1}
        colorScheme='gray'
        height='auto'
        flexDirection='column'
        alignItems='start'
        fontWeight={router.asPath === link ? "medium" : "normal"}
        color={router.asPath === link ? "black" : "gray.500"}
        borderRadius='sm'
        disabled={disabled}
        transition='0.3s ease'
        _hover={
          disabled
            ? { cursor: "not-allowed" }
            : {
                color: "black",
                cursor: "pointer",
              }
        }
        variant='body-3'
      >
        {title}
      </Text>
    </NextLink>
  );
};

export { BaseSideNav };
