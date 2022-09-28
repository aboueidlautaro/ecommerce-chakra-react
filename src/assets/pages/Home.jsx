import axios from "axios";
import { useEffect, useState } from "react";
import SlideArticles from "../components/SlideArticles";
import TitleHomeSliders from "../components/TitleHomeSliders";
import config from "../services/config";

function Home() {
  const { articleByTag } = config;

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

  if (!listOfRelevantArticles || !listOfNewArticles) {
    return null;
  }

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
