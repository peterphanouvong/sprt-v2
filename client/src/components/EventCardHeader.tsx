import { Heading, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

interface Props {
  id: number;
  title: string;
}

const EventCardHeader: React.FC<Props> = ({ id, title }) => {
  return (
    <Heading variant="h3" as="h3">
      <NextLink href={`/event/${id}`}>
        <Link>{title}</Link>
      </NextLink>
    </Heading>
  );
};

export { EventCardHeader };
