import React from "react";
import { useDeleteClubMutation } from "../generated/graphql";
import { EntityDeleteAlert } from "./EntityDeleteAlert";

interface Props {
  clubId: number;
}

const ClubDeleteButton: React.FC<Props> = ({ clubId }) => {
  const [, deleteClub] = useDeleteClubMutation();

  const handleDelete = async (): Promise<string | null> => {
    const { error } = await deleteClub({ id: clubId });
    if (error) {
      console.log(error);
      return error.message;
    }
    return null;
  };

  return <EntityDeleteAlert handleDelete={handleDelete} entityName={"Club"} />;
};

export { ClubDeleteButton };
