import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";

import CreateArticle from "../modules/CreateArticle";
import CreateCategory from "../modules/CreateCategory";
import CreateStaff from "../modules/CreateStaff";
import CreateSubCategory from "../modules/CreateSubCategory";
import LayoutRequireAuth from "../layouts/LayoutRequireAuth";
import Article from "../pages/Article";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Modules from "../pages/Modules";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import Register from "../pages/Register";

function AppRoutes() {
  const { authState } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />

      <Routes>
        // public routes
        <Route path="/" index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/article/:title" element={<Article />} />
        // private routes
        <Route
          path="/profile"
          element={
            <LayoutRequireAuth authState={authState.status}>
              <Profile />
            </LayoutRequireAuth>
          }
        />
        <Route
          path="/create"
          element={
            <LayoutRequireAuth authState={authState.status}>
              <Modules />
            </LayoutRequireAuth>
          }
        />
        <Route
          path="createarticle"
          element={
            <LayoutRequireAuth authState={authState.status}>
              <CreateArticle />
            </LayoutRequireAuth>
          }
        />
        <Route
          path="createcategory"
          element={
            <LayoutRequireAuth authState={authState.status}>
              <CreateCategory />
            </LayoutRequireAuth>
          }
        />
        <Route
          path="createsubcategory"
          element={
            <LayoutRequireAuth authState={authState.status}>
              <CreateSubCategory />
            </LayoutRequireAuth>
          }
        />
        <Route
          path="createstaff"
          element={
            <LayoutRequireAuth authState={authState.status}>
              <CreateStaff />
            </LayoutRequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
