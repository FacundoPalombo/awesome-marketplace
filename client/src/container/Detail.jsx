import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useItem } from "services/hooks/useItem";
import styles from "./Detail.module";
import { Breadcrumbs } from "common/Breadcrumbs/Breadcrumbs";
import { Detail as DetailWrapper } from "components/Detail/Detail";
import { Helmet } from "react-helmet";
import Spinner from "react-spinners/BounceLoader";

export function Detail() {
  const { id } = useParams();
  const [item, loading, error] = useItem(id);

  return (
    <section className={styles.container}>
      <div className={styles.breadcrumbsContainer}>
        <nav className={styles.breadcrumbs}>
          {item?.categories?.length !== 0 && !error && (
            <Breadcrumbs categories={item.categories} />
          )}
          {/* TODO: improve this xD */}
        </nav>
      </div>
      {loading && <Spinner size="100" color="#666" />}
      {error && (
        <pre>
          Error {error.code} - {error.message}
        </pre>
      )}
      {Object.entries(item).length !== 0 ? (
        <div className={styles.contentContainer}>
          <Helmet>
            <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
            <title>Detalle del producto</title>
          </Helmet>
          <main className={styles.content} id="detail">
            <DetailWrapper
              id={item.id}
              title={item.title}
              price={item.price}
              condition={item.condition}
              soldQuantity={item.sold_quantity}
              categories={item.categories}
              description={item.description}
              thumbnail={item.thumbnail}
            />
          </main>
        </div>
      ) : null}
    </section>
  );
}
