import { Link } from "react-router-dom";
import { authContext } from "./../context/authContext";
import classes from "./MainNavigation.module.css";
import { useContext, useState } from "react";
import { GoDiffAdded } from "react-icons/go";
import ModalForUpload from "./modal";
function MainNavigation(props) {
  const { SignOut, authToken } = useContext(authContext);
  const [modal, setModal] = useState(false);
  const signoutHandler = async () => {
    await SignOut();
  };
  return (
    <header className={classes.header}>
      <h1>Instagram</h1>
      <ul>
        <li>{!authToken && <Link to="signup">Sign-up</Link>}</li>
        <li>
          {!authToken && (
            <Link to="login" style={{ marginLeft: "2em" }}>
              LogIn
            </Link>
          )}
        </li>
        {/* <li>
          <button
            onClick={() => {
              setModal(true);
            }}
          >
            <GoDiffAdded size={"30px"} />
          </button>
          {modal && <ModalForUpload />}
        </li> */}
      </ul>
      {authToken && <button onClick={signoutHandler}>Logout</button>}
    </header>
  );
}
export default MainNavigation;
