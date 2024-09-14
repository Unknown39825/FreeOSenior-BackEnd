// theme.js
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1C3B6B",
    },
    secondary: {
      main: "#E8F0FE",
    },
    background: {
      default: "#ffffff",
      paper: "#f4f6fb",
    },
    text: {
      primary: "#000000",
      secondary: "#48434F",
    },
    shadow: "#000000",
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontWeight: 500,
      fontSize: "2.5rem",
      textAlign: "center",
    },
  },
  light: true,
  background: "#ffffff",
  backgroundPrimary: "#ffffff",
  backgroundSecondary: "#ffffff",
  text: "#000000",
  textLight: "#ffffff",
  textDark: "#000000",
  shadow: "#000000",
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1C3B6B",
    },
    secondary: {
      main: "#82b3c9",
    },
    background: {
      default: "#000000",
      paper: "#1a1a1a",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b8b8b8",
    },
    shadow: "#b8b8b8",
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontWeight: 500,
      fontSize: "2.5rem",
      textAlign: "center",
    },
  },
  light: false,
  background: "#000000",
  backgroundPrimary: "#1a1a1a",
  backgroundSecondary: "#454545",
  text: "#ffffff",
  textLight: "#ffffff",
  textDark: "#000000",
  shadow: "#b8b8b8",
});
