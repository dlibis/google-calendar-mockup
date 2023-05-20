import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          body1: {
            fontSize: 14,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: "unset", p: 1 },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "48px",
          textTransform: "unset",
          backgroundColor: "transparent",
          color: "#222",
        },
      },
    },
  },
});

export default theme;
