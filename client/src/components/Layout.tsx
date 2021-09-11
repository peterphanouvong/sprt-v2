import { Container } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useIsMobileScreen } from "../utils/useIsMobileScreen";
import { MobileNavbar } from "./MobileNavbar";
import { Navbar } from "./Navbar";
import { TopMobileNavbar } from "./TopMobileNavbar";

const homePages = [
  "/feed",
  "/explore",
  "/events",
  "/clubs",
  "/[username]",
  "/my-club/[id]",
  "/",
];

interface Props {
  title?: string;
}

const Layout: React.FC<Props> = ({ children, title }) => {
  const router = useRouter();
  const isMobile = useIsMobileScreen();
  return (
    <>
      {isMobile ? (
        <>
          <TopMobileNavbar
            variant={homePages.includes(router.pathname) ? "home" : "page"}
            title={title}
          />
          <MobileNavbar />
        </>
      ) : (
        <Navbar />
      )}
      <Container paddingX={4} maxW='container.xl' paddingY={isMobile ? 16 : 0}>
        {children}
      </Container>
    </>
  );
};

export { Layout };
