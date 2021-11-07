import React from "react";
import { BaseSideNav } from "./BaseSideNav";

interface Props {
  isFromTemplate: boolean;
  hasChosenTemplate?: boolean;
}

const NewEventSideNav: React.FC<Props> = ({
  isFromTemplate,
  hasChosenTemplate = false,
}) => {
  return (
    <BaseSideNav
      navItems={
        isFromTemplate
          ? [
              { title: "Choose path", link: `/new-event` },
              { title: "Choose template", link: `/new-event/choose-template` },
              {
                title: "Event details",
                link: `/new-event/from-template`,
                disabled: !hasChosenTemplate,
              },
            ]
          : [
              { title: "Choose path", link: `/new-event` },
              { title: "Event details", link: `/new-event/event-details` },
            ]
      }
    />
  );
};

export { NewEventSideNav };
