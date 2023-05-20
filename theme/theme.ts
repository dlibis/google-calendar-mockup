import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        body1: {
          fontSize: 14,
          fontWeight: "500",
          color: "var(--on-surface)",
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
          textTransform: "unset",
        },
      },
    },
  },
});

export default theme;
