import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Article from "../pages/Article";
import Modules from "../pages/Modules";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreateArticle from "../modules/CreateArticle";
import CreateCategory from "../modules/CreateCategory";
import CreateSubCategory from "../modules/CreateSubCategory";

function AppRoutes() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<Modules />} />
        <Route path="/createarticle" element={<CreateArticle />} />
        <Route path="/createcategory" element={<CreateCategory />} />
        <Route path="/createsubcategory" element={<CreateSubCategory />} />
        <Route path="/article/:title" element={<Article />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
