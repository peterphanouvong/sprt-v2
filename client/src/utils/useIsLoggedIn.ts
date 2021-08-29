import { useMeQuery } from "../generated/graphql";

export const useIsLoggedIn = () => {
  const [{ data: userData, fetching }] = useMeQuery();

  if (!fetching && !userData) {
    return false;
  }

  return userData?.me !== null;
};
