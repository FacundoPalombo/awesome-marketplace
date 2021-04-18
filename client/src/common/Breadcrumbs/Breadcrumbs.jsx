import React from "react";
import styles from "./Breadcrumbs.module";
import { Breadcrumb } from "./Breadcrumb/Breadcrumb";

import { ReactComponent as Chevron } from "assets/chevron-right.svg";

export function Breadcrumbs({ categories = [] }) {
  return (
    <nav className={styles.breadcrumbs}>
      {categories.map((category, index) => (
        <span key={category.id} className={styles.container}>
          <Breadcrumb category={category.name} />
          {categories.length - 1 !== index && (
            <Chevron className={styles.chevron} />
          )}
        </span>
      ))}
    </nav>
  );
}
