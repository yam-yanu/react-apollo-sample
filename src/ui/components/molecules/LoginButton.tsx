import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import {Button} from "@material-ui/core";
import {AuthContext} from "../../providers/AuthProvider";

export const LoginButton: React.FC = () => {

  const {isAuthenticated} = useContext(AuthContext);
  const text = isAuthenticated ? "ログアウト" : "ログイン";
  const redirectToLoginPage = () => {
    history.push('/login');
  }
  const handleClick = isAuthenticated
    ? () => {
      // TODO logout処理
      console.log('logout');
    }
    : () => redirectToLoginPage();

  const history = useHistory();

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      {text}
    </Button>
  );
};
