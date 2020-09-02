import React from "react";
import { AuthProvider } from "./AuthProvider";
import ThemeProvider from "./ThemeProvider";
import {GraphQLProvider} from "./GraphqlProvider";

interface Props {
  children: React.ReactNode;
}

export const Providers: React.FC<Props> = ({ children }) => {
  return (
    <GraphQLProvider>
      <AuthProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
    </GraphQLProvider>
  );
};
