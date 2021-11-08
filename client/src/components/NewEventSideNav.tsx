import React, { useContext } from "react";
import { TemplateContext } from "../context/templateContext";
import { BaseSideNav } from "./BaseSideNav";

interface Props {
  isFromTemplate: boolean;
}

const NewEventSideNav: React.FC<Props> = ({ isFromTemplate }) => {
  // console.log(data);

  const { selectedTemplateId } = useContext(TemplateContext);

  console.log(selectedTemplateId);

  return (
    <BaseSideNav
      navItems={
        isFromTemplate
          ? [
              { title: "1. Choose path", link: `/new-event` },
              {
                title: "2. Choose template",
                link: `/new-event/choose-template`,
              },
              {
                title: "3. Event details",
                link: `/new-event/from-template/${selectedTemplateId}`,
                disabled: false,
              },
            ]
          : [
              { title: "1. Choose path", link: `/new-event` },
              {
                title: "2. Event details",
                link: `/new-event/event-details/`,
              },
            ]
      }
    />
  );
};

export { NewEventSideNav };
