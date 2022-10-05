const domain = "https://oyster-app-te4xn.ondigitalocean.app";

const config = {
  //domain general
  domain,
  //user
  createUser: `${domain}/auth`,
  checkToken: `${domain}/auth/validate`,
  loginUser: `${domain}/auth/login`,
  getUserInfo: `${domain}/auth/info`,
  getUserProfileInfo: `${domain}/auth/profile`,
  updateAccountInfo: `${domain}/auth/update`,
  //article
  createArticle: `${domain}/articles/`,
  allArticles: `${domain}/articles`,
  articleByTitle: `${domain}/articles/byTitle`,
  articleByTag: `${domain}/articles/byTag`,
  searchArticle: `${domain}/articles/search?q=`,
  searchIdx: "/articles/search?q=",
  articlesByCategory: `${domain}/articles/byCategory`,
  //category
  createCategory: `${domain}/categories`,
  allCategories: `${domain}/categories`,
  //subcategory
  createSubCategory: `${domain}/subcategories`,
  allSubCategories: `${domain}/subcategories`,
  //brand
  createBrand: `${domain}/brands`,
  allBrands: `${domain}/brands`,
  //roles
  createRole: `${domain}/roles`,
  allRoles: `${domain}/roles`,
  //staff
  createStaff: `${domain}/auth/staff`,
  allStaff: `${domain}/staff`,
  usersList: `${domain}/auth/usernamespv`,
  //tags
  createTag: `${domain}/tags`,
  allTags: `${domain}/tags`,
};

export default config;
