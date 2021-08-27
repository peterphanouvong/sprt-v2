// theme.ts
// 1. import `extendTheme` function
import {
  extendTheme,
  ThemeConfig,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import { Button } from "./theme/Button";
import { Heading } from "./theme/Heading";
import { Text } from "./theme/Text";
// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};
// 3. extend the theme
const theme = extendTheme(
  {
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
      Th: {
        baseStyle: {
          padding: 0,
        },
      },
    },
    colors: {
      brand: {
        "50": "#FDF2E8",
        "100": "#F9DCBE",
        "200": "#F5C594",
        "300": "#F1AE6A",
        "400": "#ED9740",
        "500": "#E98116",
        "600": "#BA6712",
        "700": "#8C4D0D",
        "800": "#5D3309",
        "900": "#2F1A04",
      },
      secondary: {
        "50": "#FDE8F3",
        "100": "#F9BEDC",
        "200": "#F594C6",
        "300": "#F16AAF",
        "400": "#ED4099",
        "500": "#E91783",
        "600": "#BA1269",
        "700": "#8B0E4E",
        "800": "#5D0934",
        "900": "#2F041A",
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: "brand",
    components: ["Button"],
  })
);

export default theme;
