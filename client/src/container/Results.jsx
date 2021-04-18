import React from "react";
import { useLocation } from "react-router-dom";
import { useItems } from "services/hooks/useItems";
import { Breadcrumbs } from "common/Breadcrumbs/Breadcrumbs";
import styles from "./Results.module";

export function Results() {
  const query = new URLSearchParams(useLocation().search).get("q");
  const [items, loading, error] = useItems(query);

  return (
    <>
      <section className={styles.breadcrumbs}>
        {items?.categories?.length && (
          <Breadcrumbs categories={items.categories} />
        )}
        {loading && "loading..."}
      </section>
      <section className={styles.content} id="results"></section>
    </>
  );
}
