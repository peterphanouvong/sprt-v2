import React from "react";
import { BaseSideNav } from "./BaseSideNav";

interface Props {
  id: string;
}

const EventPageSideNav: React.FC<Props> = ({ id }) => {
  return (
    <BaseSideNav
      navItems={[
        { title: "Description", link: `/events/${id}` },
        { title: "Sign up", link: `/events/${id}/sign-up` },
        { title: "See who's going", link: `/events/${id}/attendees` },
      ]}
    />
  );
};

export { EventPageSideNav };
