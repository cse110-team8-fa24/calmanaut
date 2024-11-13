import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import * as Util from "../lib/Util";
import { AuthorizationContext } from "../context/AuthorizationContext";

export const Logout = (props: any) => {
  const navigate = useNavigate();
  const {setIsLoggedIn} = useContext(AuthorizationContext);

  useEffect(() => {
    Util.request("logout", { method: "DELETE" })
      .then(async res => {
        if (res.status !== 200)
          throw new Error(res.status + ": " + await res.text());
  
        setIsLoggedIn(false);
        navigate("/");
      }).catch(console.error);
  }, [setIsLoggedIn, navigate]);
  
  return <p>Logging out...</p>;
};
