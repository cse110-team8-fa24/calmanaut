import { useContext, useEffect } from "react";
import { AuthorizationContext } from "../context/AuthorizationContext";
import { useNavigate } from "react-router-dom";

export const Profile = (props: any) => {
  const {isLoggedIn, id} = useContext(AuthorizationContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === false)
      navigate("/");

    if (isLoggedIn)
      navigate("/profile/" + id);
  }, [isLoggedIn, navigate]);

  

  return <></>;
};
