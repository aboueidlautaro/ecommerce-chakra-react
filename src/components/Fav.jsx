import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../services/AuthContext";
import "../services/config";

function Fav({ id }) {
  const fetchConfig = global.config.fav.url;
  const urlFetchFav = fetchConfig;

  let navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  const status = authState.status;
  const idArticle = id;

  const handleClick = (status, data) => {
    if (!status) {
      navigate("/login");
    } else {
      axios
        .post(urlFetchFav, data, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          navigate("/");
        });
    }
  };
  return (
    <button onClick={handleClick}>
      <span role="img" aria-label="fav article">
        ❤️
      </span>
    </button>
  );
}

export default Fav;
