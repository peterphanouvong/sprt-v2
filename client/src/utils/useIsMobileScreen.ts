import { useBreakpointValue } from "@chakra-ui/react";

export function useIsMobileScreen() {
  return useBreakpointValue({ base: true, md: false });
}
