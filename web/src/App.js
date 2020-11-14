import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Dashboard, HomeView } from "./pages/Dashboard/Dashboard";
import StudentsView from "./pages/StudentsView/StudentsView";
import TeachersView from "./pages/TeachersView/TeachersView";
import Login from "./pages/Login/Login";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/students">
          <Dashboard>
            <StudentsView />
          </Dashboard>
        </PrivateRoute>
        <PrivateRoute path="/teachers">
          <Dashboard>
            <TeachersView />
          </Dashboard>
        </PrivateRoute>
        <PrivateRoute path="/">
          <Dashboard>
            <HomeView />
          </Dashboard>
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default App;
