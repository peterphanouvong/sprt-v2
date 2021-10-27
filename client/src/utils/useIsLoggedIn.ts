import { useMeQuery } from "../generated/graphql";

export const useIsLoggedIn = () => {
  const [{ data: userData, fetching }] = useMeQuery();

  if (!userData) {
    return false;
  }

  if (!fetching && userData === undefined) {
    return false;
  }

  return userData?.me !== null;
};
