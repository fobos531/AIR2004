import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Index } from "./layout/index";
import StudentView from "./layout/StudentsView/index";
import AdministratorView from "./layout/AdministratorView/index";
const App = () => {
  return (
    <Router>
      <Index />
      <Route path="/students" component={StudentView} />
      <Route path="/teachers" component={AdministratorView} />
    </Router>
  );
};

export default App;