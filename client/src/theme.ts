// theme.ts
// 1. import `extendTheme` function
import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { Button } from "./theme/Button";
import { Heading } from "./theme/Heading";
import { Text } from "./theme/Text";
// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};
// 3. extend the theme
const theme = extendTheme({
  config,
  components: {
    Text: Text,
    Heading: Heading,
    Button: Button,
    Modal: {
      defaultProps: {
        closeOnOverlayClick: false,
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
