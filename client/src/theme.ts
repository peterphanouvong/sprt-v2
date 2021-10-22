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
        "50": "#E0E7F4",
        "100": "#C5D3EA",
        "200": "#ABBFE0",
        "300": "#91ACD6",
        "400": "#7799CC",
        "500": "#5D86C2",
        "600": "#4B6AA8",
        "700": "#3A4F8D",
        "800": "#2A3770",
        "900": "#1C2251",
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
    components: ["Button", "Progress", "Spinner"],
  }),
  withDefaultColorScheme({
    colorScheme: "yellow",
    components: ["Tabs", "Checkbox", "Radio"],
  })
);

export default theme;
