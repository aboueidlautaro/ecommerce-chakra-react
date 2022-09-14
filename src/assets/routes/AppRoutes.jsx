import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Article from "../pages/Article";
import CreateArticle from "../pages/CreateArticle";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

function AppRoutes() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createarticle" element={<CreateArticle />} />
        <Route path="/article/:id" element={<Article />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
