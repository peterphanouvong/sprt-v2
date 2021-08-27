import { useClubQuery } from "../generated/graphql";

export const useGetClubName = (clubId: number | undefined) => {
  if (!clubId) {
    return undefined;
  }
  const [{ data }] = useClubQuery({ variables: { clubId: clubId } });
  return data?.club.name;
};
