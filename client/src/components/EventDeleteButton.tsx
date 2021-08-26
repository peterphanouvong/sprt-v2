import React from "react";
import { useDeleteEventMutation } from "../generated/graphql";
import { EntityDeleteAlert } from "./EntityDeleteAlert";

interface Props {
  eventId: number;
  as: "modalItem" | "button";
}

const EventDeleteButton: React.FC<Props> = ({ eventId, as }) => {
  const [, deleteEvent] = useDeleteEventMutation();

  const handleDelete = async () => {
    const { error } = await deleteEvent({ id: eventId });

    if (error) {
      return error.message;
    }

    return null;
  };

  return (
    <EntityDeleteAlert
      as={as}
      handleDelete={handleDelete}
      entityName={"Event"}
    />
  );
};

export { EventDeleteButton };
