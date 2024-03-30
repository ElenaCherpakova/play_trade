"use client";

import { createTheme } from "@mui/material/styles";
import { IBM_Plex_Sans } from "next/font/google";

const ibm = IBM_Plex_Sans({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap"
});

export const theme = createTheme({
  typography: {
    fontFamily: ibm.style.fontFamily,
    h1: {
      fontSize: 24
    },
    h2: {
      fontSize: 20
    },
    h3: {
      fontSize: 18
    },
    h4: {
      fontSize: 14
    }
    // h5: {
    //   fontFamily: ""
    // },
    // h6: {
    //   fontFamily: ""
    // }
  },

  palette: {
    primary: {
      main: "#14213D"
    },
    secondary: {
      main: "#D9D9D9"
    },
    background: {
      paper: "#FFFFFF",
      default: "#FAFAFA"
    },
    accent: {
      main: "#DD7F11"
    },
    error: {
      main: "#FF3131"
    }
  },
  shape: {
    borderRadius: 16
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 4
      }
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
        color: "secondary",
        sx: {
          "&:hover": {
            opacity: 0.8
          }
        }
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          boxShadow: "none"
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small"
      }
    },

    MuiIconButton: {
      defaultProps: {
        size: "small"
      }
    }
  }
});
