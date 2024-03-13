import { extendTheme } from "@chakra-ui/react";
export const theme = extendTheme({
  button: {
    primary: {
      color: "#FFF",
      background: "#3182CE",
    },
    secondary: {
      color: "#3182CE",
      background: "#FFF",
    },
  },
  colors: {
    primary: "#2A73F3",
    pending: "#EA8536",
    inputs: "rgba(0, 0, 0, 0.04)",
    disabled: "rgba(0, 0, 0, 0.08)",
    error: "#E53E3E",
    success: "#48BB78",
    tags: "#8A94A6",
    gray: {
      gray50: "#F7FAFC",
      gray100: "#EDF2F7",
      gray200: "#E2E8F0",
      gray300: "#CBD5E0",
      gray400: "#A0AEC0",
      gray500: "#2D3748",
      gray600: "#4A5568",
      gray700: "#2D3748",
      gray800: "#A0AEC0",
      gray900: "#718096",
    },
  },
  shadows: {
    sm: "0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)",
    xs: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
  },
  fontWeights: {
    normal: 400,
    bold: 700,
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "30px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "60px",
    "7xl": "72px",
  },
  breakpoints: {
    base: "0px",
    sm: "480px",
    md: "768px",
    lg: "992px",
    xl: "1280px",
    "2xl": "1536px",
  },
  fonts: {
    body: "Rubik, sans-serif",
    heading: "Rubik, sans-serif",
  },

  components: {
    Progress: {
      baseStyle: {
        filledTrack: {
          bg: "#48BB78",
        },
      },
    },
    Switch: {
      baseStyle: {
        track: {
          bg: "gray.100",
          _checked: {
            bg: "#2A73F3",
          },
        },
      },
    },
  },
});
