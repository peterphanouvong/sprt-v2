import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import "../components/RichTextEditor.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
