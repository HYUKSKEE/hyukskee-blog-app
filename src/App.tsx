import "./App.css";
import { useState } from "react";
import { app } from "firebaseApp";
import { getAuth } from "firebase/auth";
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

  return (
    <>
      <Router isAuthenticated={isAuthenticated} />
    </>
  );
}

export default App;
