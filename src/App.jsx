import React, { useEffect, useState } from "react";
import { AuthContext } from "./assets/contexts/AuthContext";

import AppRoutes from "./assets/routes/AppRoutes";

import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import config from "./assets/services/config";
import Cookie from "./assets/components/Cookie";

function App() {
  // states
  const [authState, setAuthState] = useState({
    username: "",
    name: "",
    id: 0,
    status: false,
    user_role: "",
    email: "",
    dni: 0,
    phone: 0,
  });

  // config global
  const { checkToken } = config;
  const loggedUser = window.localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get(checkToken, { headers: { accessToken: loggedUser } })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({ ...authState, status: true, ...response.data });
        }
      });
  }, [loggedUser]);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <BrowserRouter>
        <AppRoutes />
        <Cookie />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
