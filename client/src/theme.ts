// theme.ts
// 1. import `extendTheme` function
import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";
// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};
// 3. extend the theme
const theme = extendTheme({
  config,
  components: {
    Steps,
    Text: {
      variants: {
        meta: {
          color: "gray.500",
          fontSize: "sm",
        },
      },
    },
  },
  colors: {
    brand: {
      100: "#f7fafc",
      // ...
      900: "#1a202c",
    },
  },
});
export default theme;
