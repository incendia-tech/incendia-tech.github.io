import React, { useState, useEffect } from "react";
import styles from "./HeroSection.module.css";

const COMING_SOON = "COMING SOON ... ";

const HeroSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [waveIndex, setWaveIndex] = useState(0);
  const [progress, setProgress] = useState(76); // Example static progress

  useEffect(() => {
    if (!showModal) return;
    const interval = setInterval(() => {
      setWaveIndex((prev) => (prev + 1) % COMING_SOON.length);
    }, 120);
    return () => clearInterval(interval);
  }, [showModal]);

  // Optionally animate progress (for demo)
  useEffect(() => {
    if (!showModal) return;
    let prog = 60;
    setProgress(prog);
    const interval = setInterval(() => {
      prog = prog < 99 ? prog + 1 : 76;
      setProgress(prog);
    }, 80);
    return () => clearInterval(interval);
  }, [showModal]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <section className={styles.hero}>
      {showModal && (
        <div className={styles.comingSoonOverlay} onClick={handleCloseModal}>
          <div className={styles.comingSoonBox} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={handleCloseModal}>&times;</button>
            <span className={styles.comingSoonText}>
              {COMING_SOON.split("").map((char, i) => (
                <span
                  key={i}
                  className={
                    styles.comingSoonLetter +
                    (char !== " " && (waveIndex % COMING_SOON.length === i ? " " + styles.active : ""))
                  }
                  style={{
                    animationDelay: `${i * 0.08}s`
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          </div>
        </div>
      )}
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
            <button className={`btn btn-primary ${styles.fadeInUp}`} style={{ animationDelay: '0.4s' }} onClick={handleOpenModal}>Create Ceremony</button>
            <button className={`btn btn-secondary ${styles.fadeInUp}`} style={{ animationDelay: '0.6s' }} onClick={handleOpenModal}>Join Ceremony</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 