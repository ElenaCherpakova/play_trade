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
    fontFamily: ibm.style.fontFamily
    // h1: {
    //   fontFamily: ""
    // },
    // h2: {
    //   fontFamily: ""
    // },
    // h3: {
    //   fontFamily: ""
    // },
    // h4: {
    //   fontFamily: ""
    // },
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
    borderRadius: 2
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
        color: "secondary"
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
