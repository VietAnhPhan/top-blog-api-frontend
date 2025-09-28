import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { useState } from "react";

import { Header } from "./header/header.jsx";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Profile from "./components/Profile/Profile";
import NewPost from "./components/NewPost/NewPost.jsx";
import { AuthContext } from "./Context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home sitename="ReactJS template" />,
  },
  {
    path: "/login",
    element: <Login sitename="ReactJS template" />,
  },
  {
    path: "/signup",
    element: <Signup sitename="ReactJS template" />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/your-posts",
  },
  {
    path: "/new-post",
    element: <NewPost></NewPost>,
  },
]);

function App() {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const userId = localStorage.getItem("userId");
  return (
    <>
      <AuthContext value={{ token, setToken, userId }}>
        <Header />
        <RouterProvider router={router}></RouterProvider>
      </AuthContext>
    </>
  );
}

export default App;
