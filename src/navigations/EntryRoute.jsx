//===================================================
// Date         : 04 Nov 2021
// Author       : I Gusti Kade Sugiantara
// Description  : Entry point router
//===================================================
// Revision History:
// Name             Date            Description
//
//===================================================
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "../pages/main/Dashboard";
import Detail from "../pages/main/Detail";

const EntryRoute = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/detail" component={Detail} />
        </Switch>
      </Router>
    </>
  );
};

export default EntryRoute;
