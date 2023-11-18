import "./App.css";
import { Link } from "react-router-dom";
import Router from "./components/Router";

function App() {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/posts">Post List</Link>
        </li>
        <li>
          <Link to="/posts/:id">Post Detail</Link>
        </li>
        <li>
          <Link to="/posts/new">Post New</Link>
        </li>
        <li>
          <Link to="/posts/edit">Post Edit</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
      <Router />
    </>
  );
}

export default App;
