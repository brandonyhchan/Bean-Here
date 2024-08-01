import { createTheme } from '@mui/material/styles';

const mainTheme = createTheme({
  palette: {
    primary: { // tan colours
      main: "#a1887f",
      light: "#a1887fa4",
      dark: "#8b7972"
    },
    secondary: { // blue colours
      main: "#3f51b5",
      light: "#bec8ff",
      dark: "#344397"
    },
    warning: {
      main: "rgb(255, 32, 32)",
    },
  },
  typography: {
    fontFamily: "Figtree-Regular",
    fontSize: 14,
    h1: {
      fontSize: "3.2rem",
      lineHeight: "1.1",
    },
    h2: {
      fontSize: "3.75rem",
    },
    h3: {
      fontSize: "2.3rem",
    },
    h4: {
      fontSize: "2.125rem",
    },
    h5: {
      fontSize: "20px", // This is the "large font" from old spire coffee
    },
    h6: {
      fontSize: "18px", // This is the "medium font" from old spire coffee
    },
    button: {
      fontSize: "1em",
      fontWeight: 500,
      fontFamily: "Figtree-Regular",
    },
  },
});

export default mainTheme;