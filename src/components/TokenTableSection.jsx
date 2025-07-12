import React from "react";
import styles from "./TokenTableSection.module.css";

const TokenTableSection = () => (
  <section className={styles.tokenTable}>
    <div className="container">
      <div className={styles.header}>
        <h2>Voting vs Auction Features</h2>
        <p>Compare the capabilities of our privacy-preserving voting and auction systems</p>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Voting</th>
              <th>Auction</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Anonymous</td>
              <td>✅ Yes</td>
              <td>✅ Yes</td>
            </tr>
            <tr>
              <td>On-chain</td>
              <td>✅ Yes</td>
              <td>✅ Yes</td>
            </tr>
            <tr>
              <td>ZK Proofs</td>
              <td>✅ Yes</td>
              <td>✅ Yes</td>
            </tr>
            <tr>
              <td>Flexible Schemes</td>
              <td>Majority, Token-weighted, Quadratic, Ranked-choice, Open-content</td>
              <td>Reserve, English, Sealed-bid (placeholder)</td>
            </tr>
            <tr>
              <td>Rust CLI</td>
              <td>✅ Yes</td>
              <td>✅ Yes</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

export default TokenTableSection; 