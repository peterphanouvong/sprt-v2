import { ChakraProvider } from "@chakra-ui/react";
import { TemplateProvider } from "../context/templateContext";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <TemplateProvider>
        <Component {...pageProps} />
      </TemplateProvider>
    </ChakraProvider>
  );
}

export default MyApp;
