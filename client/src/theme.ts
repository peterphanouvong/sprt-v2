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
        "50": "#EAEAF9",
        "100": "#C0C0EB",
        "200": "#9997DC",
        "300": "#7670CC",
        "400": "#554ABA",
        "500": "#3626A7",
        "600": "#2F1D8A",
        "700": "#27156C",
        "800": "#1E0E4D",
        "900": "#13082E",
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
    colorScheme: "gray",
    components: ["Tabs", "Checkbox", "Radio"],
  })
);

export default theme;
