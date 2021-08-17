import React from "react";
import { useDeleteEventMutation } from "../generated/graphql";
import { EntityDeleteAlert } from "./EntityDeleteAlert";

interface Props {
  eventId: number;
}

const EventDeleteButton: React.FC<Props> = ({ eventId }) => {
  const [, deleteEvent] = useDeleteEventMutation();

  const handleDelete = async () => {
    const { error } = await deleteEvent({ id: eventId });

    if (error) {
      return error.message;
    }

    return null;
  };

  return <EntityDeleteAlert handleDelete={handleDelete} entityName={"Event"} />;
};

export { EventDeleteButton };
