import classes from "./SignUp.module.css";
import React, { useRef, useContext } from "react";
import { authContext } from "../context/authContext";
function SignUp() {
  const { SignUp } = useContext(authContext);
  const emailInputRef = useRef();
  const fullNameInputRef = useRef();
  const userName = useRef();
  const password = useRef();
  async function submitHandler(event) {
    try {
      event.preventDefault();
      const emailInput = emailInputRef.current.value;
      const fullNameInput = fullNameInputRef.current.value;
      const userNameValue = userName.current.value;
      const passwordValue = password.current.value;
      await SignUp(emailInput, passwordValue, fullNameInput, userNameValue);
    } catch (e) {
      alert(e);
    }
  }
  return (
    <div className={classes.SignUp}>
      <form className={classes.form} onSubmit={submitHandler}>
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
            type="text"
            required
            placeholder="Full Name"
            ref={fullNameInputRef}
          />
        </div>
        <div className={classes.form_control}>
          <input type="text" required placeholder="User Name" ref={userName} />
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
}

export default SignUp;
