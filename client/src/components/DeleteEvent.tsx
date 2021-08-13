import React from "react";
import { useDeleteEventMutation } from "../generated/graphql";
import { DeleteEntity } from "./DeleteEntity";

interface Props {
  eventId: number;
}

const DeleteEvent: React.FC<Props> = ({ eventId }) => {
  const [, deleteEvent] = useDeleteEventMutation();

  const handleDelete = async () => {
    const success = await deleteEvent({ id: eventId });
    if (!success) {
      console.log("event doesn't exist");
    }
  };

  return <DeleteEntity handleDelete={handleDelete} entityName={"Event"} />;
};

export { DeleteEvent };
