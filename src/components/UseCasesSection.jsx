import React from "react";
import styles from "./UseCasesSection.module.css";

const UseCasesSection = () => (
  <section id="use-cases" className={styles.usecases}>
    <div className="container">
      <div className={styles.header}>
        <h2>Use Cases</h2>
        <p>Privacy-preserving solutions for a wide range of decentralized applications</p>
      </div>
      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.cardIcon}>🗳️</div>
          <h3>Anonymous Voting</h3>
          <p>Cast votes on-chain with full privacy and verifiability.</p>
        </div>
        <div className={styles.card}>
          <div className={styles.cardIcon}>🛡️</div>
          <h3>Coercion-Resistant Elections</h3>
          <p>Override coerced votes with multiple unlinkable burns and commitments.</p>
        </div>
        <div className={styles.card}>
          <div className={styles.cardIcon}>⚡</div>
          <h3>On-chain Auctions</h3>
          <p>Participate in private, verifiable auctions using the same privacy-preserving protocol.</p>
        </div>
        <div className={styles.card}>
          <div className={styles.cardIcon}>📊</div>
          <h3>Flexible Ballots</h3>
          <p>Support for majority, token-weighted, quadratic, ranked-choice, and open-content voting schemes.</p>
        </div>
      </div>
    </div>
  </section>
);

export default UseCasesSection; 