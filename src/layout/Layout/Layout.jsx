import React from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import styles from "./Layout.module.css";

export const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{<Outlet />}</main>
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
