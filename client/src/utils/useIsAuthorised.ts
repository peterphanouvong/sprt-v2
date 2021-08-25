import { Club, useMeQuery } from "../generated/graphql";

export const useIsAuthorised = (club: Club) => {
  const [{ data: userData }] = useMeQuery();

  if (!userData) {
    return false;
  }
  return club.admins
    .map((admin) => admin.username)
    .includes(userData.me!.username);
};
