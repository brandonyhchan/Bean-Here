import { createTheme } from '@mui/material/styles';

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
      fontSize: "2.3rem",
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
      color: "#4c698b",
    },
    body2: {
      color: "#4c698b",
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
          '&:hover': {
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
          fontSize: "2rem",
          '&:hover': {
            color: "#8b7972",
          },
        },
      },
    },
  },
});

export default mainTheme;
