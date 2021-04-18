import React from "react";
import styles from "./Breadcrumb.module";

export function Breadcrumb({ category = "" }) {
  return <a className={styles.breadcrumb}>{category}</a>;
}
