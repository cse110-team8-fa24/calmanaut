import "../styles/Login.css";

import { useContext, useEffect, useState } from "react";
import * as Util from "../lib/Util"
import { useNavigate } from "react-router-dom";
import { AuthorizationContext } from "../context/AuthorizationContext";
import { Link } from "react-router-dom";

export const Login = (props: any) => {
  const [error, setError] = useState("");
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthorizationContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn)
      navigate("/");
  }, [isLoggedIn, navigate]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const username = data.get("username");
    const password = data.get("password");

    setError("");

    Util.post("login", { username, password }).then(async res => {
      if (res.status !== 200 && res.status < 500) {
        setError(await res.text());
        return;
      }

      if (res.status >= 500)
        throw new Error(res.status + ": " + await res.text());

      setIsLoggedIn(true);
    }).catch(console.error);
  }

  const errorElem = error !== ""
    ? <div className="error">
        {error}
      </div>
    : <></>;
  
  return <div className="login">
    <h1>Log In</h1>
    {errorElem}
    <form onSubmit={onSubmit}>
      <div>
        <label>Username (8&ndash;16 bytes)</label>
        <input name="username" />
      </div>
      <div>
        <label>Password (8&ndash;72 bytes)</label>
        <input name="password" type="password" />
      </div>
      <button type="submit">Log In</button>
    </form>
    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
  </div>;
};
