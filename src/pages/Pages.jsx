import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Home from "./Home";
import FormPage from "@/components/form/Form";

const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
      </Route>
      <Route path="/form" element={<FormPage />} />
    </Routes>
  );
};

export default Pages;
