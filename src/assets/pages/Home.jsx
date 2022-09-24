import { Center } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SlideArticles from "../components/SlideArticles";
import TitleHomeSliders from "../components/TitleHomeSliders";
import config from "../services/config";

function Home() {
  const { articleByTag } = config;
  let navigate = useNavigate();

  const [listOfRelevantArticles, setListOfRelevantArticles] = useState([]);
  const [listOfNewArticles, setListOfNewArticles] = useState([]);

  useEffect(() => {
    axios.get(`${articleByTag}/DESTACADO`).then((relevant) => {
      setListOfRelevantArticles(relevant.data);
    });
    axios.get(`${articleByTag}/NUEVO`).then((response) => {
      setListOfNewArticles(response.data);
    });
  }, []);

  return (
    <>
      <TitleHomeSliders content="ARTÍCULOS DESTACADOS" />
      <SlideArticles results={listOfRelevantArticles} />
      <TitleHomeSliders content="ARTÍCULOS NUEVOS" />
      <SlideArticles results={listOfNewArticles} />
    </>
  );
}
export default Home;
