const domain = "https://oyster-app-te4xn.ondigitalocean.app";

const config = {
  //domain general
  domain,
  //user
  createUser: `${domain}/auth`,
  checkToken: `${domain}/auth/validate`,
  loginUser: `${domain}/auth/login`,
  getUserInfo: `${domain}/auth/info`,
  getProfilePicture: `${domain}/auth/profile`,
  //article
  createArticle: `${domain}/articles/`,
  allArticles: `${domain}/articles`,
  articleByTitle: `${domain}/articles/byTitle`,
  articleByTag: `${domain}/articles/byTag`,
  searchArticle: `${domain}/articles/search?q=`,
  searchIdx: "/articles/search?q=",
  //category
  createCategory: `${domain}/categories`,
  allCategories: `${domain}/categories`,
  //subcategory
  createSubCategory: `${domain}/subcategories`,
  allSubCategories: `${domain}/subcategories`,
};

export default config;
