import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { Text } from "@chakra-ui/layout";

interface Props {
  crumbs: {
    title: string;
    href: string;
  }[];
}

const BaseBreadcrumbs: React.FC<Props> = ({ crumbs }) => {
  return (
    <Breadcrumb
      mb={4}
      spacing="8px"
      separator={<ChevronRightIcon color="gray.500" />}
    >
      {crumbs.map((crumb, index) => (
        <BreadcrumbItem key={index}>
          <BreadcrumbLink>
            <NextLink href={crumb.href}>
              <Text variant="body-3">{crumb.title}</Text>
            </NextLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export { BaseBreadcrumbs };
