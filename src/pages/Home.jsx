import React, { useState } from "react";
import CreateArticle from "./CreateArticle";
import axios from "axios";
import { useEffect } from "react";
import "../services/config";
import FetchArticles from "../modules/FetchArticles";

function Home() {
  const fetchConfig = global.config.auth.url;
  const urlFetchAuth = fetchConfig;

  const [authState, setAuthState] = useState({
    username: "",
    user_role: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get(urlFetchAuth, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            ...authState,
            username: response.data.username,
            user_role: response.data.user_role,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  return (
    <>
      <h1>Home</h1>
      {authState?.user_role === "admin" ? <span>ADMIN</span> : null}
      <FetchArticles status={authState?.status} />
    </>
  );
}

export default Home;
