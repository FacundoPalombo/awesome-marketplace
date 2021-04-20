import React from "react";
import { Helmet } from "react-helmet";
import styles from "./Search.module";

export function Search() {
  return (
    <>
      <Helmet>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
        <title>Busqueda de productos</title>
      </Helmet>
      <section id="search" className={styles.main}></section>
    </>
  );
}
