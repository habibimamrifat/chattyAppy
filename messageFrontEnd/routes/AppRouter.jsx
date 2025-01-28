import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Layout from "../layouts/layout";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;