import React from "react";
import { Box, IconButton, Typography } from "@material-ui/core";
import { LoginButton } from "../molecules";

export const Header: React.FC = () => {
  return (
    <Box display="flex" justifyContent="space-between" px={3}>
      <IconButton href="/" component="a">
        <Typography variant="h5">LOGO</Typography>
      </IconButton>
      <Box display="flex" flexDirection="column" justifyContent="center">
        <LoginButton />
      </Box>
    </Box>
  );
};
