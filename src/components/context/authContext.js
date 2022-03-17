import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../user/firebase-config";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  where,
} from "firebase/firestore";
import { UncontrolledAlert } from "reactstrap";
export const authContext = createContext();

const { Provider } = authContext;
const db = getFirestore();
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const navigate = useNavigate();

  const authentication = getAuth();

  useEffect(() => setAuthToken(sessionStorage.getItem("Auth Token")), []);
  // useEffect(() => {
  //   const firestoreRef = firebase.firestore().collection('users');
  //   // Create a query against the collection where we can match the formId
  //   const queryRef = firestoreRef.where('formMetaData.formId', '==', ID_HERE);

  // }, []);

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
      _id: response._tokenResponse.localId,
    };
    try {
      const docRef = await addDoc(collection(db, "users"), signUpData);
      console.log("Document written with ID: ", docRef.id);
      const querySnapshot = await getDocs(collection(db, "users"));
      console.log(querySnapshot);
      console.log(querySnapshot.length);
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
    console.log(response);
    console.log(response._tokenResponse.localId);
    // const user = firebase.auth().currentUser;
    // authentication.currentUser
    //   .updateProfile({
    //     displayName: "Jane Q. User",
    //     photoURL: "https://example.com/jane-q-user/profile.jpg",
    //   })
    //   .then(function () {
    //     console.log("added");
    //     console.log(authentication.currentUser);
    //   })
    //   .catch(function (error) {
    //     console.log("An error occurd");
    //   });

    if (!authToken) {
      sessionStorage.setItem(
        "Auth Token",
        response._tokenResponse.refreshToken
      );
      setAuthToken(response._tokenResponse.refreshToken);
    }
    navigate("/home");
  };

  return (
    <Provider value={{ authToken, authentication, SignIn, SignOut, SignUp }}>
      {children}
    </Provider>
  );
};
