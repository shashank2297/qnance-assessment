import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC<{ setLoggedIn: (loggedIn: boolean) => void }> = ({
  setLoggedIn,
}) => {
  const navigate = useNavigate();

  const loginHandle = () => {
    localStorage.setItem("loggedIn", "true");
    setLoggedIn(true);
    navigate("/order-book", { replace: true });
  };

  return (
    <div>
      <button onClick={loginHandle} style={{ cursor: "pointer" }}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;