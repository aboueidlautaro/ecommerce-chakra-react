import React, { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "./assets/contexts/AuthContext";

import AppRoutes from "./assets/routes/AppRoutes";

import axios from "axios";
import config from "./assets/services/config";
import { BrowserRouter } from "react-router-dom";

function App() {
  // states
  const [authState, setAuthState] = useState({
    username: "",
    name: "",
    id: 0,
    status: false,
    user_role: "",
  });

  // config global
  const { checkToken } = config;
  const loggedUser = localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get(checkToken, { headers: { accessToken: loggedUser } })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            name: response.data.name,
            id: response.data.id,
            user_role: response.data.user_role,
            status: true,
          });
        }
      });
  }, [loggedUser]);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
