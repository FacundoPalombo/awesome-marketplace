import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module";

export function NotFound() {
  return (
    <div className={styles.container}>
      <img
        className={styles.hero}
        src="https://image.freepik.com/vector-gratis/concepto-error-404-robot-azul_23-2147738004.jpg"
        alt="Error404"
      />
      <h1 className={styles.title}>¡Whoops! ¡Aqui no hay nada!</h1>
      <Link data-testid="link-back" to="/">
        <span>Volver</span>
      </Link>
    </div>
  );
}
