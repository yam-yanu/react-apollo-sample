import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {
  TopPage,
  LoginPage,
  UsersPage,
} from "./ui/components/pages";
import { Providers } from "./ui/providers";

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={TopPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/users" component={UsersPage} />
        </Switch>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
