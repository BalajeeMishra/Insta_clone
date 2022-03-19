import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { App } from "./../user/firebase-config";
import {
  getAuth,
  updateProfile,
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
  doc,
  setDoc,
  query,
} from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
export const authContext = createContext();
const storage = getStorage(App);
const storageRef = ref(storage);
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
      _id: response._tokenResponse.localId,
    };

    // const docRef = await addDoc(collection(db, "users"), signUpData);

    // add with it too.
    await setDoc(doc(db, "cities", "LA"), {
      name: "Los Angeles",
      state: "CA",
      country: "USA",
      capital: true,
    });

    const q = query(collection(db, "cities"), where("capital", "==", true));

    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
    // console.log("Document written with ID: ", docRef.id);
    //   const querySnapshot = await getDocs(collection(db, "users"));
    //   querySnapshot.forEach((doc) => {
    //     console.log(`${doc.id} => ${doc.data()}`);
    //   });
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    // }

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
    if (!authToken) {
      sessionStorage.setItem(
        "Auth Token",
        response._tokenResponse.refreshToken
      );
      setAuthToken(response._tokenResponse.refreshToken);
    }

    //code to update user okay
    // updateProfile(authentication.currentUser, {
    //   displayName: "Jane Q. User",
    //   photoURL: "https://example.com/jane-q-user/profile.jpg",
    // })
    //   .then(() => {
    //     // Profile updated!
    //     // ...
    //     console.log("hello", authentication.currentUser);
    //   })
    //   .catch((error) => {
    //     // An error occurred
    //     // ...
    //     console.log("hello");
    //   });
    navigate("/home");
  };

  return (
    <Provider value={{ authToken, authentication, SignIn, SignOut, SignUp }}>
      {children}
    </Provider>
  );
};
