import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context";

const Profile = () => {
  const [user, setUser] = useState({});
  const [isUpdate, setIsupdate] = useState(false);
  const [result, setResult] = useState("");
  const [validations, setValidations] = useState([]);

  const auth = useContext(AuthContext);

  useEffect(() => {
    async function fetchUser() {
      const id = localStorage.getItem("userId");
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "GET",

        headers: {
          "Content-type": "application/json",
          Authorization: `bearer ${auth.token}`,
        },
      });
      const result = await response.json();
      setUser(result.user);
    }
    fetchUser();
  }, [auth.token]);

  async function handleUpdate(formData) {
    const name = formData.get("fullname");
    const password = formData.get("password");
    const repeatPassword = formData.get("repeat_password");

    if (password !== repeatPassword) {
      setValidations([
        ...validations,
        "Repeat password does not match password",
      ]);
      return;
    } else {
      setValidations([]);
    }

    const response = await fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PUT",
      body: JSON.stringify({ name, password }),
      headers: {
        "Content-type": "application/json",
        Authorization: `bearer ${auth.token}`,
      },
    });
    if (response.ok) {
      setIsupdate(false);
      setResult("You updated successfully!");
    }
  }

  function handleEdit() {
    if (!isUpdate) setIsupdate(true);
    else setIsupdate(false);
  }

  if (auth.token) {
    return (
      <>
        <h1 className="text-center text-white">Your profile</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3">
          <form
            action={handleUpdate}
            className="flex flex-col bg-white p-8 sm:col-start-2"
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
                defaultValue={user.username}
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
                defaultValue=""
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
                defaultValue=""
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
                defaultValue={user.name}
              />
            </div>

            <div className="flex gap-2.5">
              {isUpdate ? (
                <button
                  type="submit"
                  className="mt-5 bg-blue-700 text-white flex-1"
                >
                  Update
                </button>
              ) : (
                <button
                  type="submit"
                  className="mt-5 text-white flex-1 bg-gray-500"
                  disabled
                >
                  Update
                </button>
              )}
              {isUpdate ? (
                <button
                  type="button"
                  className={"mt-5 bg-blue-700 text-white flex-1"}
                  onClick={handleEdit}
                >
                  Cancel
                </button>
              ) : (
                <button
                  type="button"
                  className={"mt-5 bg-blue-700 text-white flex-1"}
                  onClick={handleEdit}
                >
                  Edit
                </button>
              )}
            </div>
            {validations.length > 0 && (
              <ul>
                {validations.map((validation, index) => {
                  return (
                    <li key={index} className="text-red-500 ">
                      {validation}
                    </li>
                  );
                })}
              </ul>
            )}
            {result ? <p>{result}</p> : ""}
          </form>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1>You don't have permission to access this page</h1>
      </>
    );
  }
};

export default Profile;
