import { Club, useMeQuery } from "../generated/graphql";

export const useIsFollowing = (club: Club) => {
  const [{ data: userData }] = useMeQuery();
  return club.followers
    .map((user) => {
      return user.id;
    })
    .includes(userData?.me.id);
};
