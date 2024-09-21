// theme.js
import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    // Unique color palette
    brand: {
      50: "#f5f0ff",
      100: "#e0d7ff",
      200: "#c4baff",
      300: "#a39fff",
      400: "#857bff",
      500: "#5b47ff", // Primary brand color
      600: "#4736cc",
      700: "#352999",
      800: "#251c66",
      900: "#160f33",
    },
    accent: {
      50: "#e4f5ff",
      100: "#b8e4ff",
      200: "#89d3ff",
      300: "#59c1ff",
      400: "#2ab0ff",
      500: "#0099e6", // Accent color
      600: "#007ab4",
      700: "#005c82",
      800: "#003d51",
      900: "#001e21",
    },
  },
  fonts: {
    // Custom fonts
    heading: `'Poppins', sans-serif`,
    body: `'Roboto', sans-serif`,
  },
  styles: {
    global: {
      "html, body": {
        backgroundColor: "#f0f4f8", // Light background color
        color: "#333", // Text color
      },
      a: {
        color: "brand.500", // Links will use the primary brand color
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
  components: {
    Button: {
      // Custom styles for the Button component
      baseStyle: {
        fontWeight: "bold", // Make the button text bold
      },
      sizes: {
        lg: {
          px: 6, // Custom padding for large buttons
          py: 3,
        },
      },
      variants: {
        solid: {
          bg: "brand.500",
          color: "white",
          _hover: {
            bg: "brand.600",
          },
        },
        outline: {
          borderColor: "brand.500",
          color: "brand.500",
          _hover: {
            bg: "brand.50",
          },
        },
      },
    },
  },
});

export default customTheme;
