import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import RequireAuth from "../layouts/RequireAuth";

import CreateArticle from "../modules/CreateArticle";
import CreateCategory from "../modules/CreateCategory";
import CreateStaff from "../modules/CreateStaff";
import CreateSubCategory from "../modules/CreateSubCategory";
import Article from "../pages/Article";
import Home from "../pages/Home";
import ListArticles from "../pages/ListArticles";
import Login from "../pages/Login";
import Modules from "../pages/Modules";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Search from "../pages/Search";

function AppRoutes() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* public routes*/}
        <Route path="/" index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/articles" element={<ListArticles />} />
        <Route path="/article/:title" element={<Article />} />
        <Route path="/articles/search" element={<Search />} />
        <Route path="/user" element={<RequireAuth />}>
          <Route path="profile/:username" element={<Profile />} />
        </Route>
        <Route path="/create" element={<RequireAuth />}>
          <Route index element={<Modules />} />
          <Route path="article" element={<CreateArticle />} />
          <Route path="category" element={<CreateCategory />} />
          <Route path="subcategory" element={<CreateSubCategory />} />
          <Route path="staff" element={<CreateStaff />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
