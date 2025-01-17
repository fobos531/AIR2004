import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Dashboard, HomeView } from "./pages/Dashboard/Dashboard";
import StudentsView from "./pages/StudentsView/StudentsView";
import StudentsViewAdd from "./pages/StudentsViewAdd/StudentViewAdd";
import TeachersView from "./pages/TeachersView/TeachersView";
import TeachersViewAdd from "./pages/TeachersViewAdd/TeachersViewAdd";
import CoursesView from "./pages/CoursesView/CoursesView";
import CoursesViewAdd from "./pages/CoursesViewAdd/CoursesViewAdd";
import LecturesView from "./pages/LecturesView/LecturesView";
import LecturesViewAdd from "./pages/LecturesViewAdd/LecturesViewAdd";
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
        <PrivateRoute exact path="/teachers">
          <Dashboard>
            <TeachersView />
          </Dashboard>
        </PrivateRoute>
        <PrivateRoute path="/teachers/add">
          <Dashboard>
            <TeachersViewAdd />
          </Dashboard>
        </PrivateRoute>
        <PrivateRoute exact path="/courses">
          <Dashboard>
            <CoursesView />
          </Dashboard>
        </PrivateRoute>
        <PrivateRoute path="/courses/add">
          <Dashboard>
            <CoursesViewAdd />
          </Dashboard>
        </PrivateRoute>
        <PrivateRoute exact path="/lectures">
          <Dashboard>
            <LecturesView />
          </Dashboard>
        </PrivateRoute>
        <PrivateRoute path="/lectures/add">
          <Dashboard>
            <LecturesViewAdd />
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
