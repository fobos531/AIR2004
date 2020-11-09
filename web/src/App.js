import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Dashboard, HomeView } from "./pages/Dashboard/Dashboard";
import StudentsView from "./pages/StudentsView/StudentsView";
import TeachersView from "./pages/TeachersView/TeachersView";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/students">
          <Dashboard>
            <StudentsView />
          </Dashboard>
        </Route>
        <Route path="/teachers">
          <Dashboard>
            <TeachersView />
          </Dashboard>
        </Route>
        <Route path="/dashboard">
          <Dashboard>
            <HomeView />
          </Dashboard>
        </Route>
      </Switch>
      <Dashboard />
    </Router>
  );
};

export default App;
