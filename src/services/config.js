const domain = "https://backend-ecommerce-chakra.herokuapp.com/";

module.exports = global.config = {
  all_articles: {
    url: `${domain}articles`,
  },
  article_by_id: {
    url: `${domain}articles/byId/`,
  },
  auth: {
    url: `${domain}auth/auth/`,
  },
  login: {
    url: `${domain}auth/login/`,
  },
  register: {
    url: `${domain}auth/`,
  },
  createArticle: {
    url: `${domain}articles/`,
  },
  authState: {
    url: `${domain}auth/auth/`,
  },
};
