const domain = "http://localhost:3001";

const config = {
  //domain general
  domain,
  //user
  createUser: `${domain}/auth`,
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
