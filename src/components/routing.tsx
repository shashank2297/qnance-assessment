import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./loginpage.tsx";
import OrderPage from "./orderpage.tsx";

const isLoggedIn = (): boolean => {
  const status = localStorage.getItem("loggedIn");
  return status === "true";
};

const Routing: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage setLoggedIn={setLoggedIn} />}
        />
        <Route
          path="/order-book"
          element={
            loggedIn ? <OrderPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="*"
          element={
            <Navigate to={loggedIn ? "/order-book" : "/login"} replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;