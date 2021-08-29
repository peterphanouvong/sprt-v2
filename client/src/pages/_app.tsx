import { ChakraProvider } from "@chakra-ui/react";
import { ExploreProvider } from "../context/exploreContext";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <ExploreProvider>
        <Component {...pageProps} />
      </ExploreProvider>
    </ChakraProvider>
  );
}

export default MyApp;
