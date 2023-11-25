import "./App.css";
import { useState, useEffect } from "react";
import { app } from "firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Router from "./components/Router";
import styled from "styled-components";

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
      } else {
        setIsAuthenticated(false);
      }

      setIsUserInit(true);
    });
  });

  return (
    <>
      {isUserInit ? (
        <Router isAuthenticated={isAuthenticated} />
      ) : (
        <Loading></Loading>
      )}
    </>
  );
}

export default App;

const Loading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 48px;
  height: 48px;
  border: 5px solid black;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;


  @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;
