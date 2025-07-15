import React from "react";
import styles from "./RoadmapSection.module.css";

const RoadmapSection = () => (
  <section id="roadmap" className={styles.roadmap}>
    <div className="container">
      <div className={styles.header}>
        <h2>Roadmap</h2>
      </div>
      <div className={styles.timelineContainer}>
        <ul className={styles.timeline}>
          <li className={styles.timelineItem}>
            <div className={styles.milestone}>
              <div className={`${styles.dot} ${styles.doneDot}`}></div>
              <h3>Published the anonymous voting protocol in the whitepaper</h3>
              <span className={`${styles.status} ${styles.done}`}>Done</span>
            </div>
          </li>
          <li className={styles.timelineItem}>
            <div className={styles.milestone}>
              <div className={`${styles.dot} ${styles.doneDot}`}></div>
              <h3>Developed a scalable ZKP-based voting system</h3>
              <span className={`${styles.status} ${styles.done}`}>Done</span>
            </div>
          </li>
          <li className={styles.timelineItem}>
            <div className={styles.milestone}>
              <div className={`${styles.dot} ${styles.inprogressDot}`}></div>
              <h3>Building an anonymous auction mechanism</h3>
              <span className={`${styles.status} ${styles.inprogress}`}>In progress</span>
            </div>
          </li>
          <li className={styles.timelineItem}>
            <div className={styles.milestone}>
              <div className={`${styles.dot} ${styles.inprogressDot}`}></div>
              <h3>Testing all systems on the blockchain testnet</h3>
              <span className={`${styles.status} ${styles.inprogress}`}>In progress</span>
            </div>
          </li>
          <li className={styles.timelineItem}>
            <div className={styles.milestone}>
              <div className={`${styles.dot} ${styles.todoDot}`}></div>
              <h3>Launching the voting and auction systems on mainnet</h3>
              <span className={`${styles.status} ${styles.todo}`}>TO Do</span>
            </div>
          </li>
          <li className={styles.timelineItem}>
            <div className={styles.milestone}>
            <div className={`${styles.dot} ${styles.todoDot}`}></div>
              <h3>Creating dApps and driving user adoption</h3>
              <span className={`${styles.status} ${styles.todo}`}>TO Do</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
);

export default RoadmapSection; 