import { createTheme } from "@mui/material/styles";
import shadows from "@mui/material/styles/shadows";

export const theme = createTheme({
  // shadows: shadows.map(() => "none"),
  palette: {
    primary: {
      main: "#5eff66",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
});
