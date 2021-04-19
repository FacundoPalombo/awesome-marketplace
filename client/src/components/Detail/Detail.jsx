import PropTypes from "prop-types";
import React from "react";
import styles from "./Detail.module";

export function Detail({
  id,
  title,
  price,
  condition,
  soldQuantity,
  categories,
  description,
  thumbnail,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img src={thumbnail} className={styles.thumbnail} />
        </div>
        <h4 className={styles.descriptionTitle}>Descripción del producto</h4>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.heading}>
        <p className={styles.condition}>
          {condition === "new" ? "Nuevo" : "Usado"} - {soldQuantity} vendidos
        </p>

        <h4 className={styles.title}>{title}</h4>
        <h3 className={styles.price}>{price}</h3>
        <button className={styles.cta}>Comprar</button>
      </div>
    </div>
  );
}

Detail.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.string,
  condition: PropTypes.string,
  sold_quantity: PropTypes.number,
  categories: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, id: PropTypes.string })
  ),
  description: PropTypes.string,
  thumbnail: PropTypes.string,
};
