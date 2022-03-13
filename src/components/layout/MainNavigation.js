import { Link, useNavigate } from "react-router-dom";
import { authContext } from "./../context/authContext";
import classes from "./MainNavigation.module.css";
import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
function MainNavigation(props) {
  const { SignOut, authToken } = useContext(authContext);

  // const navigate = useNavigate();

  const signoutHandler = async () => {
    await SignOut();
  };
  return (
    <header className={classes.header}>
      <h1>Instagram</h1>
      {!authToken && <Link to="signup">Sign-up</Link>}
      {!authToken && (
        <Link to="login" style={{ marginLeft: "2em" }}>
          LogIn
        </Link>
      )}
      {authToken && <button onClick={signoutHandler}>Logout</button>}
    </header>
  );
}
export default MainNavigation;
