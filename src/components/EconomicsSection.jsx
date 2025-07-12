import React from "react";
import styles from "./EconomicsSection.module.css";

const EconomicsSection = () => (
  <section id="economics" className={styles.economics}>
    <div className="container">
      <div className={styles.header}>
        <h2>Proof-of-Burn Mechanism</h2>
        <p>Incendia uses Proof-of-Burn to enable anonymous, verifiable participation in both voting and auctions. Burned tokens are sent to unspendable addresses, and a zero-knowledge proof is generated for privacy and security.</p>
      </div>
      <div className={styles.content}>
        <div className={styles.exampleBlock}>
          <h3>How it works</h3>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h4>Burn Tokens</h4>
                <p>Voter or bidder burns tokens to unspendable addresses</p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h4>Generate ZK Proof</h4>
                <p>Zero-knowledge proof is created for privacy and verification</p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h4>Cast Vote/Bid</h4>
                <p>Submit private, verifiable vote or bid on-chain</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default EconomicsSection; 