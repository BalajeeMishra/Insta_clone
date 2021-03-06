import React, { useContext } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import { AuthProvider } from "./components/context/authContext";
import MainNavigation from "./components/layout/MainNavigation";
import SignUp from "./components/user/SignUp";
import LogIn from "./components/user/LogIn";
import Home from "./components/layout/Home";
import ModalForUpload from "./components/layout/modal";
import "bootstrap/dist/css/bootstrap.min.css";
const App = () => {
  return (
    <Router>
      <AuthProvider>
        {/* Static component */}
        <MainNavigation />
        <ModalForUpload />
        {/* Routing component */}
        <Routes>
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/login" element={<LogIn />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};
export default App;
