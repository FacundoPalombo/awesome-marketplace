import React from "react";
import styles from "./Breadcrumbs.module";

export function Breadcrumbs({ categories }) {
  return (
    <nav className={styles.breadcrumbs}>
      {categories.length &&
        categories.map((category, index) => (
          <span key={category.id} className={styles.container}>
            <a className={styles.breadcrumb}>{category.name}</a>
            {categories.length - 1 !== index && " > "}
          </span>
        ))}
    </nav>
  );
}
