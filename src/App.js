import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import MainNavigation from "./components/layout/MainNavigation";
import SignUp from "./components/user/SignUp";
import Login from "./components/user/LogIn";

function App() {
  return (
    <Router>
      {/* Static component */}
      <MainNavigation />
      {/* Routing component */}
      <Routes>
        <Route exact path="/signup" > <SignUp /> </Route>
      </Routes>
    </Router>
  );
}

export default App;
