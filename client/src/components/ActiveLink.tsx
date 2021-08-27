import React from "react";
import NextLink from "next/link";
import { Box } from "@chakra-ui/layout";
import { useRouter } from "next/router";

interface Props {
  href: string;
}

const ActiveLink: React.FC<Props> = ({ children, href }) => {
  const router = useRouter();
  const isActive = router.pathname === href;
  return (
    <Box
      _hover={{ borderBottom: "1px solid", borderColor: "gray.300" }}
      borderBottom={isActive ? "1px solid" : ""}
      borderColor={isActive ? "gray.300" : ""}
    >
      <NextLink href={href}>
        <a>{children}</a>
      </NextLink>
    </Box>
  );
};

export { ActiveLink };
