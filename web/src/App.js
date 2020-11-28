import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Dashboard, HomeView } from "./pages/Dashboard/Dashboard";
import StudentsView from "./pages/StudentsView/StudentsView";
import StudentsViewAdd from "./pages/StudentsViewAdd/StudentViewAdd";
import TeachersView from "./pages/TeachersView/TeachersView";
import CoursesView from "./pages/CoursesView/CoursesView";
import LecturesView from "./pages/LecturesView/LecturesView";
import Login from "./pages/Login/Login";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute exact path="/students">
          <Dashboard>
            <StudentsView />
          </Dashboard>
        </PrivateRoute>
        <PrivateRoute path="/students/add">
          <Dashboard>
            <StudentsViewAdd />
          </Dashboard>
        </PrivateRoute>
        <PrivateRoute path="/teachers">
          <Dashboard>
            <TeachersView />
          </Dashboard>
        </PrivateRoute>
        <PrivateRoute path="/courses">
          <Dashboard>
            <CoursesView />
          </Dashboard>
        </PrivateRoute>
        <PrivateRoute path="/lectures">
          <Dashboard>
            <LecturesView />
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
