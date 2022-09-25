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

  useEffect(() => {
    axios
      .get(checkToken, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({
            ...authState,
            status: false,
          });
        } else {
          setAuthState({
            username: response.data.username,
            name: response.data.name,
            id: response.data.id,
            status: true,
            user_role: response.data.user_role,
          });
        }
      });
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <AppRoutes />
    </AuthContext.Provider>
  );
}

export default App;
