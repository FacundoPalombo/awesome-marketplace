import React from "react";
import { useLocation } from "react-router-dom";
import { useItems } from "services/hooks/useItems";
import { Breadcrumbs } from "common/Breadcrumbs/Breadcrumbs";
import { Result } from "components/Result/Result";
import styles from "./Results.module";

export function Results() {
  const query = new URLSearchParams(useLocation().search).get("q");
  const [items, loading, error] = useItems(query);

  return (
    <section className={styles.container}>
      <div className={styles.breadcrumbsContainer}>
        <nav className={styles.breadcrumbs}>
          {items?.categories?.length !== 0 && !error && (
            <Breadcrumbs categories={items.categories} />
          )}
          {/* TODO: improve this xD */}
          {loading && "loading..."}
          {error && (
            <pre>
              Error {error.code} - {error.message}
            </pre>
          )}
        </nav>
      </div>

      <div className={styles.contentContainer}>
        <main className={styles.content} id="results">
          {items?.items?.map((item, index) => (
            <div key={item.id} className={styles.resultContainer}>
              <Result
                id={item.id}
                thumbnail={item.thumbnail}
                shipping={item.shipping}
                title={item.title}
                price={item.price}
                address={item.address}
              />
              {items?.items?.length - 1 !== index && (
                <hr className={styles.divider} />
              )}
            </div>
          ))}
        </main>
      </div>
    </section>
  );
}
