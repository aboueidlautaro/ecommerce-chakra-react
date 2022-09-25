const domain = "https://backend-ecommerce-chakra-82ba.vercel.app";

const config = {
  //domain general
  domain,
  //user
  createUser: `${domain}/auth`,
  checkToken: `${domain}/auth/validate`,
  loginUser: `${domain}/auth/login`,
  //article
  createArticle: `${domain}/articles`,
  allArticles: `${domain}/articles`,
  articleByTitle: `${domain}/articles/byTitle`,
  articleByTag: `${domain}/articles/byTag`,
  searchArticle: `${domain}/search?search=`,
  //category
  createCategory: `${domain}/categories`,
  allCategories: `${domain}/categories`,
  //subcategory
  createSubCategory: `${domain}/subcategories`,
  allSubCategories: `${domain}/subcategories`,
};

export default config;
