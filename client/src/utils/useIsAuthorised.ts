import { Club, useClubQuery, useMeQuery } from "../generated/graphql";

export const useIsAuthorised = (clubId: number) => {
  const [{ data: userData }] = useMeQuery();
  const [{ data: clubData }] = useClubQuery({
    variables: {
      clubId: clubId,
    },
  });

  if (!userData || !clubData) {
    return false;
  }
  return clubData.club.admins
    .map((admin) => admin.username)
    .includes(userData.me!.username);
};
