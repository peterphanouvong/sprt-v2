import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import theme from "../theme";
export default class Document extends NextDocument {
  render() {
    return (
      <Html
        style={{ width: "100%", height: "100%", overflowX: "hidden" }}
        lang="en"
      >
        <Head></Head>
        <body style={{ width: "100%", height: "100%", overflowX: "hidden" }}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
