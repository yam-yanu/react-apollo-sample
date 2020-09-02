import React from "react";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "../../theme";

interface Props {
  children: React.ReactNode;
}

const Provider: React.FC<Props> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Provider;
