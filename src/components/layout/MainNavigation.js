import { Link } from "react-router-dom";
import { authContext } from "./../context/authContext";
import classes from "./MainNavigation.module.css";
import { useContext, useState } from "react";
import { GoDiffAdded } from "react-icons/go";
import { AiFillHome } from "react-icons/ai";
import { BiMessageRoundedDots } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { AiFillCompass } from "react-icons/ai";
import Avatar from "react-avatar";
import ModalForUpload from "./modal";
function MainNavigation(props) {
  const { SignOut, authToken } = useContext(authContext);
  const [modal, setModal] = useState(false);
  const signoutHandler = async () => {
    await SignOut();
  };
  return (
    <header className={classes.header}>
      <div className={classes.instagram}>
        <h1>Instagram</h1>
        <input type="text" placeholder="Search" />
        <div className={classes.rightparticons}>
          <AiFillHome size={"30px"} />
          <BiMessageRoundedDots size={"30px"} />
          <GoDiffAdded size={"30px"} />
          <AiFillCompass size={"30px"} />
          <AiOutlineHeart size={"30px"} />
          <CgProfile size={"30px"} />
        </div>
      </div>
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
      <Avatar
        src="https://www.whatsappimages.in/wp-content/uploads/2022/01/Girl-DP.jpg"
        size="100"
        round={true}
       
      />
      {authToken && <button onClick={signoutHandler}>Logout</button>}
    </header>
  );
}
export default MainNavigation;
