const domain =
  "https://backend-ecommerce-chakra-jq5mmw9u0-aboueidlautaro.vercel.app";

const config = {
  domain,
  createUser: `${domain}/auth`,
  loginUser: `${domain}/auth/login`,
  allArticles: `${domain}/articles`,
  createArticle: `${domain}/articles/`,
  articleById: `${domain}/articles/byId/`,
  createCategory: `${domain}/categories/`,
  allCategories: `${domain}/categories`,
  createSubCategory: `${domain}/subcategories/`,
  allSubCategories: `${domain}/subcategories`,
};

export default config;
