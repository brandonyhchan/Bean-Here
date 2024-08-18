import { createTheme } from "@mui/material/styles";

const mainTheme = createTheme({
  palette: {
    primary: {
      main: "#a1887f",
      light: "#a1887fa4",
      dark: "#8b7972",
    },
    secondary: {
      main: "#3f51b5",
      light: "#bec8ff",
      dark: "#344397",
      contrastText: "#ffffff",
    },
    warning: {
      main: "rgb(255, 0, 0)",
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
      fontSize: "25px",
    },
    h4: {
      fontSize: "20px",
    },
    h5: {
      fontSize: "20px",
      color: "#4e576e",
      fontFamily: "Figtree-SemiBold",
    },
    h6: {
      fontSize: "16px",
      color: "#4e576e",
      fontFamily: "Figtree-SemiBold",
    },
    body1: {
      fontSize: "11px",
      color: "#4e576e", //dark grey
    },
    body2: {
      color: "#4e576e", //dark grey
    },
    button: {
      fontSize: "18px",
      fontWeight: 500,
      fontFamily: "Figtree-Regular",
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#4c698b",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "none",
            color: "#8b7972",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#4c698b",
          fontSize: "20px",
          "&:hover": {
            color: "#8b7972",
          },
        },
      },
    },
    MuiTextField: {
      // input field text
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            fontSize: "14px",
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          "&.Mui-expanded": {
            margin: "0px 0", // Remove the default margin
          },
          "&:before": {
            display: "none", // Remove the default border
          },
          "&:first-of-type": {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          },
          "&:last-of-type": {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            border: "none",
            boxShadow: "none",
          },
        },
      },
    },
  },
});

export default mainTheme;
