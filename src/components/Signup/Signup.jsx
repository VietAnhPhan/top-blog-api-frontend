import "./Signup.css";
import loginImage from "../../assets/password_223128.png";
import { ErrorBoundary } from "react-error-boundary";
import { useState } from "react";

function Signup(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setrepeatPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [authResults, setAuthResults] = useState([]);

  function typingUsername(e) {
    setUsername(e.target.value);
  }

  function typingPassword(e) {
    setPassword(e.target.value);
  }

  function typingrepeatPassword(e) {
    setrepeatPassword(e.target.value);
  }

  function typingFullname(e) {
    setFullname(e.target.value);
  }

  function typingEmail(e) {
    setEmail(e.target.value);
  }

  async function handleSignup(formData) {
    const username = formData.get("username");
    const password = formData.get("password");
    const repeatPassword = formData.get("repeat_password");
    const fullname = formData.get("fullname");
    const email = formData.get("email");

    try {
      const response = await fetch("http://localhost:3000/auth/sign-up", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
          repeat_password: repeatPassword,
          name: fullname,
          email: email,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });

      const result = await response.json();
      if (result.errors && result.errors.length > 0) {
        setAuthResults(result);
      }

      localStorage.setItem("access_token", result.token);
    } catch (e) {
      throw new Error(`Sign up error: ${e.message}`);
    }
  }

  return (
    <ErrorBoundary
      fallback={<p>There was an error while submitting the form</p>}
    >
      <title>{`Signup | ${props.sitename}`}</title>
      <div className="flex sm:justify-center items-center h-full">
        <div className="grid grid-cols-1 xl:grid-cols-4">
          <div className="bg-white p-6 rounded-md xl:col-span-1 xl:col-start-3">
            <div className="mb-8 flex flex-col gap-2.5">
              <img
                src={loginImage}
                alt="signup icon"
                className="size-20 mx-auto"
              />
              <p className="uppercase text-blue-700 text-center font-bold">
                Sign up today to let others know your thoughts
              </p>
            </div>
            <form
              action={(formData) => handleSignup(formData)}
              className="flex flex-col"
            >
              <div className="flex flex-col">
                <label htmlFor="username" className="text-zinc-500">
                  Username:
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="p-1.5 w-full"
                  onChange={typingUsername}
                  value={username}
                  required
                />
              </div>
              <div className="flex flex-col mt-3">
                <label htmlFor="password" className="text-zinc-500">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="p-1.5 w-full"
                  required
                  minLength={8}
                  maxLength={30}
                  onChange={typingPassword}
                  value={password}
                />
              </div>
              <div className="flex flex-col mt-3">
                <label htmlFor="password" className="text-zinc-500">
                  Repeat Password:
                </label>
                <input
                  type="password"
                  name="repeat_password"
                  id="repeat_password"
                  className="p-1.5 w-full"
                  required
                  minLength={8}
                  maxLength={30}
                  onChange={typingrepeatPassword}
                  value={repeatPassword}
                />
              </div>

              <div className="flex flex-col mt-3">
                <label htmlFor="password" className="text-zinc-500">
                  Fullname:
                </label>

                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  className="p-1.5 w-full"
                  required
                  onChange={typingFullname}
                  value={fullname}
                />
              </div>

              <div className="flex flex-col mt-3">
                <label htmlFor="email" className="text-zinc-500">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="p-1.5 w-full"
                  required
                  onChange={typingEmail}
                  value={email}
                />
              </div>

              {authResults.errors && (
                <div>
                  <p className="text-red-500">{authResults.title}</p>
                  <ul className="text-red-500 list-disc pl-4">
                    {authResults.errors.map((rs, i) => {
                      return <li key={i}>{rs.msg}</li>;
                    })}
                  </ul>
                </div>
              )}
              <button type="submit" className="mt-5 bg-blue-700 text-white">
                Sign up now
              </button>
              <p className="text-black text-center">
                Have an account? <a href="/login">Login now</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default Signup;
