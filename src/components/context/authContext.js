import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../user/firebase-config";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { UncontrolledAlert } from "reactstrap";
export const authContext = createContext();

const { Provider } = authContext;
const db = getFirestore();
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
  const SignUp = async (email, password, fullNameInput, userNameValue) => {
    const response = await createUserWithEmailAndPassword(
      authentication,
      email,
      password
    );
    sessionStorage.setItem("Auth Token", response._tokenResponse.refreshToken);
    setAuthToken(response._tokenResponse.refreshToken);
    const signUpData = {
      email: email,
      fullName: fullNameInput,
      userName: userNameValue,
    };
    try {
      const docRef = await addDoc(collection(db, "users"), signUpData);
      console.log("Document written with ID: ", docRef.id);
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }

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
