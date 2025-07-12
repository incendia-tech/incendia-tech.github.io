import React from "react";
import styles from "./HeroSection.module.css";

const HeroSection = () => (
  <section className={styles.hero}>
    <div className={styles.fireGlow}></div>
    {/* Background glow layers */}
    <div className={styles.glowLayer1}></div>
    <div className={styles.glowLayer2}></div>
    
    <div className="container">
      <div className={styles.content}>
        <span className={styles.badge}>PRIVATE VOTING</span>
        <h1 className={styles.heroTitle}>Incendia</h1>
        <p className={styles.tagline}>
          Anonymous voting & auctions using proof-of-burn and zk-SNARKs. 
        </p>
        <p className={styles.tagline}>
          Create or join secure, privacy-preserving voting ceremonies.
        </p>
        <div className={styles.actions}>
          <button className="btn btn-primary">Create Ceremony</button>
          <button className="btn btn-secondary">Join Ceremony</button>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection; 