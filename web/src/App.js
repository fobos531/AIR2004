import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Index } from "./layout/index";
const App = () => {
  return (
    <Router>
      <Index />
    </Router>
  );
};

export default App;
