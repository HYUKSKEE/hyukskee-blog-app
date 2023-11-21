import { Route, Routes, Navigate } from "react-router-dom";
import PostsPage from "../pages/posts/detail";
import Home from "../pages/home";
import Posts from "../pages/posts";
import PostsNew from "../pages/posts/new";
import PostsEdit from "../pages/posts/edit";
import ProfilePage from "../pages/profile";
import Login from "../pages/login";
import SignUp from "../pages/signup";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/posts/:id" element={<PostsPage />} />
      <Route path="/posts/new" element={<PostsNew />} />
      <Route path="/posts/edit" element={<PostsEdit />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}
