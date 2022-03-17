import React, { useRef, useContext } from "react";
import { authContext } from "./../context/authContext";

import classes from "./SignUp.module.css";

const LogIn = (props) => {
  const { SignIn } = useContext(authContext);

  const emailInputRef = useRef();
  const password = useRef();
  async function submitHandler(event) {
    try {
      event.preventDefault();
      const emailInput = emailInputRef.current.value;
      const passwordValue = password.current.value;
      await SignIn(emailInput, passwordValue);
    } catch (e) {
      alert(e);
    }
  }

  return (
    <div className={classes.SignUp}>
      <form className={classes.form_one} onSubmit={submitHandler}>
        <div className={classes.form_control}>
          <input
            type="email"
            required
            placeholder="Email"
            ref={emailInputRef}
          />
        </div>

        <div className={classes.form_control}>
          <input
            type="password"
            required
            placeholder="Password"
            ref={password}
          />
        </div>
        <div className={classes.form_control}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
export default LogIn;

// import { getAuth } from "firebase/auth";

// const auth = getAuth();
// const user = auth.currentUser;
