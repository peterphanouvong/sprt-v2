import { Box } from "@chakra-ui/react";
import React from "react";
import { useIsLoggedIn } from "../utils/useIsLoggedIn";
import { BasePage } from "./BasePage";
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
          <BasePage>{children}</BasePage>
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
