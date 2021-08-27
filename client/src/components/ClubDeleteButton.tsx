import { useRouter } from "next/router";
import React from "react";
import { useDeleteClubMutation } from "../generated/graphql";
import { EntityDeleteAlert } from "./EntityDeleteAlert";

interface Props {
  clubId: number;
  as?: "button" | "modalItem";
}

const ClubDeleteButton: React.FC<Props> = ({ clubId, as = "button" }) => {
  const [, deleteClub] = useDeleteClubMutation();

  const handleDelete = async (): Promise<string | null> => {
    const { error } = await deleteClub({ id: clubId });
    if (error) {
      console.log(error);
      return error.message;
    }
    return null;
  };

  return (
    <EntityDeleteAlert
      as={as}
      handleDelete={handleDelete}
      entityName={"Club"}
    />
  );
};

export { ClubDeleteButton };
