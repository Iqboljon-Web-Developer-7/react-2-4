import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";

const Layout = () => {
  return (
    <section>
      <Header />
      <main>
        <Outlet />
      </main>
    </section>
  );
};

export default Layout;
