import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthorizationContext } from "../context/AuthorizationContext";

const ProgressTracker = () => {
  const {isLoggedIn} = useContext(AuthorizationContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === false)
      navigate("/");
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <h1>Your Meditation Progress</h1>
      <p>Track your meditation streaks and progress here.</p>
    </div>
  );
};

export default ProgressTracker;
