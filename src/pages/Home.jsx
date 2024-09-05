import Products from "@/components/products/Products";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";
import { useSelector } from "react-redux";

const Home = () => {
  const refresh = useSelector((state) => state.refreshProducts);

  const navigate = useNavigate();
  const throwToForm = () => {
    navigate("/form");
  };

  const { data, error } = useFetch("/blogs", { limit: 16 }, [refresh]);

  useEffect(() => {
    if (localStorage.getItem("userToken") == null || error?.status == 401) {
      throwToForm();
    }
  }, []);

  return (
    <>
      <Products data={data?.payload} />
    </>
  );
};

export default Home;
