// import { getAuth, signOut } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { app } from "./firebase-config";
// import { async } from "@firebase/util";

// const LogOut = async () => {
//   console.log("outside authtoken");
//   const navigate = useNavigate();
//   const [authToken, setOuthToken] = useState(
//     sessionStorage.getItem("Auth Token")
//   );
//   console.log(authToken, "jay baba ki");
//   try {
//     var authentication = getAuth();
//     // sessionStorage.clear("Auth Token");
//     sessionStorage.removeItem("Auth Token");
//     const hi = sessionStorage.getItem("Auth Token");
//     console.log(hi, "lalajee");
//     setOuthToken(sessionStorage.getItem("Auth Token"));
//   } catch (e) {
//     console.log(e);
//     alert(e);
//   }
//   useEffect(async () => {
//     await signOut(authentication);
//     console.log(authToken, "useEffect");
//     if (authToken) {
//       console.log("inside authtoken");
//       navigate("/home");
//     } else {
//       console.log("inside if block");
//       navigate("/login");
//     }
//     // console.log(authToken);
//   }, [authToken]);

//   return <div>Logged out successfully.</div>;
// };
// export default LogOut;
