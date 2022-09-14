const domain = "http://localhost:3001";

const config = {
  domain,
  allArticles: `${domain}/articles`,
  createArticle: `${domain}/articles/`,
  articleById: `${domain}/articles/byId/`,
};

export default config;
