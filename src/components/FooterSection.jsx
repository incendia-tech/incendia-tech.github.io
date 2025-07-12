import React from "react";
import styles from "./FooterSection.module.css";
import IncendiaLogo from '../assets/incendia-logo.png';

const FooterSection = () => (
  <footer className={styles.footer} id="contacts">
    <div className="container">
      <div className={styles.footerGrid}>
        <div className={styles.brandCol}>
          <div className={styles.logoRow}>
            <img src={IncendiaLogo} alt="Incendia logo" style={{ width: 38, height: 38, verticalAlign: 'middle' }} />
            <span className={styles.logoText}>Incendia</span>
          </div>
          <p className={styles.description}>
            Privacy-preserving voting and auctions using proof-of-burn and zk-SNARKs.
          </p>
        </div>
        <div className={styles.linksCol}>
          <h4>Protocol</h4>
          <a href="#protocol">Architecture</a>
          <a href="#privacy">Privacy</a>
          <a href="#economics">Economics</a>
        </div>
        <div className={styles.linksCol}>
          <h4>Resources</h4>
          <a href="https://github.com/zero-savvy/burn-to-vote" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="#">Documentation</a>
          <a href="#">Whitepaper</a>
        </div>
        <div className={styles.linksCol}>
          <h4>Community</h4>
          <a href="https://x.com/burn2vote" target="_blank" rel="noopener noreferrer">X (Twitter)</a>
          <a href="https://www.linkedin.com/company/107884107" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="#">Discord</a>
        </div>
      </div>
      <div className={styles.copyrightRow}>
        <span>© 2025 Incendia Protocol. MIT License</span>
      </div>
    </div>
  </footer>
);

export default FooterSection; 