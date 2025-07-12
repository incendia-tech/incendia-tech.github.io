import React, { useRef, useEffect, useState } from "react";
import styles from "./OverviewSection.module.css";

// Modern animated icons with motion
const AnimatedIcon = ({ children, delay = 0, isVisible }) => (
  <div 
    className={`${styles.iconContainer} ${isVisible ? styles.iconVisible : ''}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

const UserIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-3.3 2.7-6 6-6h4c3.3 0 6 2.7 6 6"/>
  </svg>
);

const OrganizerIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const FileIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14,2 14,8 20,8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10,9 9,9 8,9"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const ChartIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18"/>
    <rect x="7" y="12" width="3" height="6"/>
    <rect x="12" y="8" width="3" height="10"/>
    <rect x="17" y="5" width="3" height="13"/>
  </svg>
);

const BlockchainIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
    <path d="M7 7l10 10M17 7L7 17"/>
  </svg>
);

const FlowStep = ({ step, title, description, icon: Icon, isVisible, delay = 0 }) => {
  return (
    <div 
      className={`${styles.flowStep} ${isVisible ? styles.stepVisible : ''}`}
      style={{ animationDelay: `${delay}ms` }}
      data-step={step}
    >
      <div className={styles.stepNumber}>{step}</div>
      <div className={styles.stepContent}>
        <AnimatedIcon delay={delay + 200} isVisible={isVisible}>
          <Icon />
        </AnimatedIcon>
        <h3 className={styles.stepTitle}>{title}</h3>
        <p className={styles.stepDescription}>{description}</p>
      </div>
      {step < 5 && (
        <div className={`${styles.flowArrow} ${isVisible ? styles.arrowVisible : ''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5"/>
            <path d="M7 6l5 5 5-5"/>
          </svg>
        </div>
      )}
    </div>
  );
};

const OverviewSection = () => {
  const [visibleSteps, setVisibleSteps] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const step = parseInt(entry.target.dataset.step);
            setVisibleSteps(prev => [...new Set([...prev, step])]);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-50px 0px'
      }
    );

    const stepElements = document.querySelectorAll(`.${styles.flowStep}`);
    stepElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      step: 1,
      title: "Organizer Initiates",
      description: "Organizer deploys a factory contract to start a new voting/auction event with custom parameters and rules.",
      icon: OrganizerIcon
    },
    {
      step: 2,
      title: "Factory Contract Created",
      description: "The factory contract generates voting/auction contracts with zero-knowledge proof verification capabilities.",
      icon: FileIcon
    },
    {
      step: 3,
      title: "User Participation",
      description: "Users burn tokens and submit votes or bids with zero-knowledge proofs to maintain complete privacy.",
      icon: UserIcon
    },
    {
      step: 4,
      title: "Proof Verification",
      description: "Voting/auction contracts verify zero-knowledge proofs on-chain while preserving user anonymity.",
      icon: ShieldIcon
    },
    {
      step: 5,
      title: "Results Tally",
      description: "Final results are tallied and published on-chain, verifiable and privacy-preserving for all participants.",
      icon: ChartIcon
    }
  ];

  return (
    <section ref={sectionRef} className={styles.overviewSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>How It Works ?</h1>
          <p className={styles.subtitle}>
            A seamless flow from initiation to results, all while preserving complete privacy
          </p>
        </div>
        
        <div className={styles.flowContainer}>
          {steps.map((stepData, index) => (
            <FlowStep
              key={stepData.step}
              {...stepData}
              isVisible={visibleSteps.includes(stepData.step)}
              delay={index * 300}
            />
          ))}
        </div>


      </div>
    </section>
  );
};

export default OverviewSection; 