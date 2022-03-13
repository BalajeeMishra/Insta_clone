import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../user/firebase-config";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export const authContext = createContext();
const { Provider } = authContext;

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const navigate = useNavigate();

  const authentication = getAuth();

  useEffect(() => setAuthToken(sessionStorage.getItem("Auth Token")), []);

  const SignOut = async () => {
    console.log("Sign Out from AuthContext");
    await signOut(authentication);
    sessionStorage.removeItem("Auth Token");
    setAuthToken(null);
    navigate("/");
  };
  const SignUp = async (email, password) => {
    const response = await createUserWithEmailAndPassword(
      authentication,
      email,
      password
    );
    sessionStorage.setItem("Auth Token", response._tokenResponse.refreshToken);
    setAuthToken(response._tokenResponse.refreshToken);
    navigate("/home");
  };

  const SignIn = async (email, password) => {
    const response = await signInWithEmailAndPassword(
      authentication,
      email,
      password
    );

    if (!authToken) {
      sessionStorage.setItem(
        "Auth Token",
        response._tokenResponse.refreshToken
      );
      setAuthToken(response._tokenResponse.refreshToken);
    }
    console.log(email, password);
    navigate("/home");
  };

  return (
    <Provider value={{ authToken, authentication, SignIn, SignOut, SignUp }}>
      {children}
    </Provider>
  );
};
