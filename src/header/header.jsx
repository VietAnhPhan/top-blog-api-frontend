import "./header.css";
import { redirect } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Context";

export const Header = () => {
  const authContext = useContext(AuthContext);

  function logout() {
    authContext.setToken("");
    localStorage.removeItem("access_token");
    localStorage.removeItem("userId");
    redirect("/");
  }

  return (
    <header>
      <ul className="flex justify-center gap-20">
        <li>
          <a href="/">Home</a>
        </li>
        {authContext.token ? (
          ""
        ) : (
          <li>
            <a href="/login">Login</a>
          </li>
        )}

        {authContext.token ? (
          ""
        ) : (
          <li>
            <a href="/signup">Sign up</a>
          </li>
        )}

        {authContext.token ? (
          <>
            <li>
              <a href="/your-posts">My blog</a>
            </li>
            <li>
              <a href="/new-post">New post</a>
            </li>
            <li>
              <button type="button" className="p-0" onClick={() => logout()}>
                Log out
              </button>
            </li>
          </>
        ) : (
          ""
        )}
      </ul>
    </header>
  );
};
