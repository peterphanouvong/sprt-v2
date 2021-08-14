import React from "react";
import { useDeleteEventMutation } from "../generated/graphql";
import { DeleteEntity } from "./DeleteEntity";

interface Props {
  eventId: number;
}

const DeleteEvent: React.FC<Props> = ({ eventId }) => {
  const [, deleteEvent] = useDeleteEventMutation();

  const handleDelete = async () => {
    const { error } = await deleteEvent({ id: eventId });

    if (error) {
      return error.message;
    }

    return null;
  };

  return <DeleteEntity handleDelete={handleDelete} entityName={"Event"} />;
};

export { DeleteEvent };
