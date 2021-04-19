import React from "react";
import styles from "./Result.module";
import { useHistory, Link } from "react-router-dom";

import iconFreeShipping from "assets/icon-shipping.png";
import iconFreeShipping2x from "assets/icon-shipping@2x.png";

export function Result({
  id,
  thumbnail,
  shipping: { free_shipping: freeShipping },
  title,
  price,
  address: { city_name: sellerLocation },
}) {
  return (
    <Link to={`/items/:${id}`} className={styles.link}>
      <div className={styles.result}>
        <div className={styles.imageContainer}>
          <img src={thumbnail} className={styles.image} alt={title} />
        </div>
        <div className={styles.description}>
          <h3 className={styles.price}>
            $ {price}{" "}
            {freeShipping && (
              <img
                className={styles.freeShipping}
                srcSet={`${iconFreeShipping} 1x, ${iconFreeShipping2x} 2x`}
              />
            )}
          </h3>
          <h4 className={styles.title}>{title}</h4>
        </div>
        <h4 className={styles.location}>{sellerLocation}</h4>
      </div>
    </Link>
  );
}
