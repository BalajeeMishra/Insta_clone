import classes from "./SignUp.module.css";
import React, { useRef } from "react";
// import { app } from "./firebase-config";
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
// } from "firebase/auth";

function SignUp() {
  const emailInputRef = useRef();
  const fullNameInputRef = useRef();
  const userName = useRef();
  const password = useRef();
  async function submitHandler(event) {
    event.preventDefault();
    const emailInput = emailInputRef.current.value;
    const fullNameInput = fullNameInputRef.current.value;
    const userNameValue = userName.current.value;
    const passwordValue = password.current.value;
    const signUpData = {
      email: emailInput,
      fullName: fullNameInput,
      userName: userNameValue,
      password: passwordValue,
    };
    // const authentication = getAuth();
    const response = await createUserWithEmailAndPassword(
      authentication,
      email,
      password
    );
    sessionStorage.setItem("Auth Token", response._tokenResponse.refreshToken);

    // props.onAddMeetup(signUpData);
  }
  return (
    <div className="SignUp">
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
// const navigate = useNavigate();
// navigate('/home')
// import {
//     BrowserRouter as Router,
//     Routes,
//     Route,
//     useNavigate
//   } from "react-router-dom";
{
  /* <React.StrictMode></React.StrictMode> */
}
// useEffect(() => {
//     let authToken = sessionStorage.getItem('Auth Token')

//     if (authToken) {
//         navigate('/home')
//     }

//     if (!authToken) {
//         navigate('/login')
//     }
// }, [])
