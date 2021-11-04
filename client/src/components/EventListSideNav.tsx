import React from "react";
import { BaseSideNav } from "./BaseSideNav";

interface Props {}

const EventListSideNav: React.FC<Props> = ({}) => {
  return (
    <BaseSideNav
      navItems={[
        { title: "Live events", link: "/live-events" },
        { title: "Past events", link: "/past-events" },
      ]}
    />
  );
};

export { EventListSideNav };
