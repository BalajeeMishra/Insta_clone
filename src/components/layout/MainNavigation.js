import { Link } from "react-router-dom";
import { authContext } from "./../context/authContext";
import classes from "./MainNavigation.module.css";
import { useContext } from "react";

function MainNavigation(props) {
  const { SignOut, authToken } = useContext(authContext);
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
