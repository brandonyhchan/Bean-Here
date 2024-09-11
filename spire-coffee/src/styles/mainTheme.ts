import { createTheme, PaletteColor, PaletteColorOptions } from "@mui/material/styles";

import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    primaryOpposite: PaletteColor;
  }
  interface PaletteOptions {
    primaryOpposite?: PaletteColorOptions;
  }
}

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
    primaryOpposite: {
      main: "rgba(255, 255, 255, 0.616)"
    }
  },
  typography: {
    fontFamily: "Figtree-Regular",
    fontSize: 14,
    h1: {
      fontFamily: "Figtree-Regular",
      fontSize: "30px",
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
      fontSize: "14px",
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
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
        },
        // we can also add widths here if we pick on a width for the button
        sizeSmall: {
          fontSize: "15px",
        },
        sizeMedium: {
        },
        sizeLarge: {
          fontSize: "18px", // Override large size font
        },
      },
    },
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
