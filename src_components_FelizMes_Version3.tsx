import React from "react";
import styles from "./FelizMes.module.css";
import pareja from "../images/pareja.jpg";

export default function FelizMes(): JSX.Element {
  return (
    <main className={styles.card} role="article" aria-label="Tarjeta de felicitación — Feliz mes">
      <h1 className={styles.title}>Feliz mes, mi amor 💕</h1>

      <figure className={styles.figure}>
        <img
          src={pareja}
          alt="Pareja mirándose mientras se toman de las manos"
          className={styles.photo}
          loading="lazy"
        />
        <figcaption className={styles.figcaption} aria-hidden="true">
          Un mes más juntos
        </figcaption>
      </figure>

      <div className={styles.heart} aria-hidden="true">❤️</div>

      <p className={styles.paragraph}>
        Un mes más a tu lado,
        <br />
        un mes más de risas, abrazos
        <br />
        y momentos que quiero guardar para siempre.
      </p>

      <p className={styles.paragraph}>
        Gracias por hacerme tan feliz.
        <br />
        Te amo 💖
      </p>
    </main>
  );
}