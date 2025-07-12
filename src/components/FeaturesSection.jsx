import React from "react";
import styles from "./FeaturesSection.module.css";

// Professional SVG icons
const LockIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4DD0E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);
const FlameIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C12 2 7 8.5 7 13a5 5 0 0 0 10 0c0-4.5-5-11-5-11z" />
    <path d="M12 22a3 3 0 0 1-3-3c0-2 3-6 3-6s3 4 3 6a3 3 0 0 1-3 3z" />
  </svg>
);
const ShieldIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);

const FeaturesSection = () => (
  <section id="features" className={styles.features}>
    <div className="container">
      <div className={styles.header}>
        <h2>Features</h2>
        <p>Secure, privacy-preserving infrastructure for decentralized voting and auctions</p>
      </div>
      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.cardIcon}><LockIcon /></div>
          <h3>Private Participation</h3>
          <p>Vote or bid without revealing your identity. Zero-knowledge proofs keep your actions private while proving they’re valid.</p>
        </div>
        <div className={styles.card}>
          <div className={styles.cardIcon}><FlameIcon /></div>
          <h3>Burn Commitment</h3>
          <p>Every action is backed by token burn—showing you're all in. It’s fair, tamper-proof, and sybil-resistant by design.</p>
        </div>
        <div className={styles.card}>
          <div className={styles.cardIcon}><ShieldIcon /></div>
          <h3>On-Chain Trust</h3>
          <p>No off-chain logic. Everything runs on smart contracts, fully transparent and verifiable by anyone, anytime.</p>
        </div>
      </div>
    </div>
  </section>
);

export default FeaturesSection; 