import { Box } from "@chakra-ui/react";
import React from "react";
import { useIsLoggedIn } from "../utils/useIsLoggedIn";
import { BaseContent } from "./BaseContent";
import { BaseNavbar } from "./BaseNavbar";
import { BaseSidebar } from "./BaseSidebar";

interface Props {}

const BaseLayout: React.FC<Props> = ({ children }) => {
  const isLoggedIn = useIsLoggedIn();
  return (
    <Box margin="auto">
      {isLoggedIn ? (
        <>
          <BaseSidebar />
          <BaseContent>{children}</BaseContent>
        </>
      ) : (
        <>
          <BaseNavbar />
          {children}
        </>
      )}
    </Box>
  );
};

export { BaseLayout };
