import "./App.css";
import { useState, useEffect, useContext } from "react";
import { app } from "firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Router from "./components/Router";
import styled from "styled-components";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "context/ThemeContext";

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
  const context = useContext(ThemeContext);

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
      {context.theme === "light" ? (
        <White>
          {isUserInit ? (
            <>
              <ToastContainer />
              <Router isAuthenticated={isAuthenticated} />
            </>
          ) : (
            <Loading></Loading>
          )}
        </White>
      ) : (
        <Dark>
          {isUserInit ? (
            <>
              <ToastContainer />
              <Router isAuthenticated={isAuthenticated} />
            </>
          ) : (
            <Loading></Loading>
          )}
        </Dark>
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
  }
`;

const White = styled.div`
  background-color: white;
  transition: all 0.25s linear;
`;

const Dark = styled.div`
  background-color: #1e2937;
  min-height: 100vh;
  transition: all 0.25s linear;

  p {
    margin: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  a,
  label,
  p {
    color: white;
  }

  footer,
  header {
    background-color: #111827;
  }
`;
