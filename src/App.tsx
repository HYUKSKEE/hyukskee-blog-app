import "./App.css";
import { useState, useEffect } from "react";
import { app } from "firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Router from "./components/Router";

function App() {
  const auth = getAuth(app);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (auth.currentUser) {
      return true;
    } else {
      return false;
    }
  });
  const [isUserInit, setIsUserInit] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setIsUserInit(true);
      } else {
        setIsAuthenticated(false);
        setIsUserInit(false);
      }
    });
  });

  return (
    <>
      <Router isAuthenticated={isAuthenticated} />
    </>
  );
}

export default App;
