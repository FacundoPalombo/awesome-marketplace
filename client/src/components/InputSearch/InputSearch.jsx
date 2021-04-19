import React from "react";
import styles from "./InputSearch.module";
import { useFormik } from "formik";
import { useHistory, Link } from "react-router-dom";

import iconSearch from "assets/icon-search.png";
import iconSearch2x from "assets/icon-search@2x.png";

import logoMl from "assets/logo-ml.png";
import logoMl2x from "assets/logo-ml@2x.png";

export function InputSearch() {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      history.push({ pathname: "/items", search: `?q=${values.search}` });
    },
  });

  return (
    <nav className={styles.navigation}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div className={styles.box}>
          <Link className={styles.link} to="/">
            <img
              className={styles.brand}
              src={logoMl}
              alt="Mercado Libre"
              srcSet={`${logoMl} 1x, ${logoMl2x} 2x`}
              role="link"
            />
          </Link>
          <input
            className={styles.input}
            placeholder="Nunca dejes de buscar"
            id="search_input"
            type="search"
            name="search"
            value={formik.values.search}
            onChange={formik.handleChange}
          />
          <button className={styles.button} type="submit">
            <img
              className={styles.button}
              src={iconSearch}
              alt="browse for items"
              srcSet={`${iconSearch} 1x, ${iconSearch2x} 2x`}
            />
          </button>
        </div>
      </form>
    </nav>
  );
}
