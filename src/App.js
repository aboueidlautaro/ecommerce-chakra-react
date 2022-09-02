import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from "./services/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import "./services/config";

function App() {
  const fetchConfig = global.config.authState.url;
  const urlFetchLogin = fetchConfig;

  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
    user_role: "",
    favs: [],
  });
  useEffect(() => {
    axios
      .get(urlFetchLogin, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            user_role: response.data.user_role,
            status: true,
          });
        }
      });
  }, []);
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
          </Route>
          <Route path="/">
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
