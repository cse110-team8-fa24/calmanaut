import "../styles/Login.css";

import { useContext, useEffect, useState } from "react";
import { AuthorizationContext } from "../context/AuthorizationContext";
import { Link, useNavigate } from "react-router-dom";

import * as Util from "../lib/Util";

export const Signup = (props: any) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const {isLoggedIn} = useContext(AuthorizationContext);
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
    const confirmPassword = data.get("confirm-password");

    setError("");
    setSuccess("");

    if (password !== confirmPassword)
    {
      setError("Password fields do not match");
      return;
    }

    Util.post("users", { username, password }).then(async res => {
      if (res.status !== 201 && res.status < 500) {
        setError(await res.text());
        return;
      }

      if (res.status >= 500)
        throw new Error(res.status + ": " + await res.text());

      setSuccess("Signed up successfully!");
    }).catch(console.error);
  }

  const errorElem = error !== ""
    ? <div className="error">
        {error}
      </div>
    : <></>;

  const successElem = success !== ""
    ? <div className="success">
      {success}
    </div>
    : <></>;
  
  return <div className="login">
    <h1>Sign Up</h1>
    {errorElem}
    {successElem}
    <form onSubmit={onSubmit}>
      <div>
        <label>Username (8&ndash;16 bytes)</label>
        <input name="username" />
      </div>
      <div>
        <label>Password (8&ndash;72 bytes)</label>
        <input name="password" type="password" />
      </div>
      <div>
        <label>Confirm Password</label>
        <input name="confirm-password" type="password" />
      </div>
      <button type="submit">Sign Up</button>
    </form>
    <p>Already have an account? <Link to="/login">Log In</Link></p>
  </div>;
};
