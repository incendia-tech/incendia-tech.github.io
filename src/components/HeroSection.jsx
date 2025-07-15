import React from "react";
import styles from "./HeroSection.module.css";

const HeroSection = () => (
  <section className={styles.hero}>
    <div className={styles.fireGlow}></div>
    <div className={styles.glowLayer1}></div>
    <div className={styles.glowLayer2}></div>
    <div className="container">
      <div className={styles.content}>
        <h1 className={`${styles.heroTitle} ${styles.fadeInUp}`}>Incendia</h1>
        <p className={`${styles.subtitle} ${styles.fadeInUp}`} style={{ animationDelay: '0.2s' }}>
          Anonymous, privacy-preserving voting & auctions using proof-of-burn and zk-SNARKs.
        </p>
        <div className={styles.actions}>
          <button className={`btn btn-primary ${styles.fadeInUp}`} style={{ animationDelay: '0.4s' }}>Create Ceremony</button>
          <button className={`btn btn-secondary ${styles.fadeInUp}`} style={{ animationDelay: '0.6s' }}>Join Ceremony</button>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection; 