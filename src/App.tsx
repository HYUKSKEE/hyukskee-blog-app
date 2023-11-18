import "./App.css";
import { Routes, Route, Navigate, Link } from "react-router-dom";

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
      <Routes>
        <Route path="/" element={<h1>Hyukskee blog</h1>} />
        <Route path="/posts" element={<h1>Posts page</h1>} />
        <Route path="/posts/:id" element={<h1>Posts detail page</h1>} />
        <Route path="/posts/new" element={<h1>Posts new page</h1>} />
        <Route path="/posts/edit" element={<h1>Posts edit page</h1>} />
        <Route path="/profile" element={<h1>Profile page</h1>} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
}

export default App;
