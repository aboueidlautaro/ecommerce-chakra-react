import { Box } from "@chakra-ui/react";
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
    <Box paddingBottom={10}>
      <TitleHomeSliders content="ARTÍCULOS DESTACADOS" />
      <SlideArticles results={listOfRelevantArticles} />
      <TitleHomeSliders content="ARTÍCULOS NUEVOS" />
      <SlideArticles results={listOfNewArticles} />
    </Box>
  );
}
export default Home;
