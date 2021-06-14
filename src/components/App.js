import React, { useEffect, useState } from "react";
import "./App.css";
import AppRouter from "components/Router";
import {authService} from "fbase";

function App() {
  const [ init, setInit ] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user){
        setUserObj(user);
      } 
      setInit(true);
    });
  }, [])
  console.log(authService.currentUser); 
  setInterval(() => {
    console.log(authService.currentUser);
  }, 2000)
  return (
    <>
    {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "Initializing..."}
    <footer>&copy; e.twitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
