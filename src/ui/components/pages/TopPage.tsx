import React from "react";
import {Header} from "../organisms";
import {Button, Box, useTheme} from "@material-ui/core";
import {useHistory} from "react-router-dom";

export const TopPage: React.FC = () => {
  const theme = useTheme();
  const history = useHistory();

  return (
    <div>
      <Header/>
      <Box>
        <Box
          width="100%"
          height="100%"
          textAlign="center"
          bgcolor={theme.palette.secondary.main}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box/>
          <Box py={3} width="100%" display="flex" justifyContent="center">
            <Button
              size="large"
              variant="contained"
              onClick={() => {
                history.push("/users");
              }}
            >
              ユーザー一覧
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
