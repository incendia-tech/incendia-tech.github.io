import React, { useState } from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from "./NavBar.module.css";
import IncendiaLogo from '../assets/incendia-logo.png';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className="container">
        <div className={styles.navContent}>
          <div className={styles.logo} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src={IncendiaLogo} alt="Incendia logo" style={{ width: 38, height: 38, verticalAlign: 'middle' }} />
            <span>Incendia</span>
          </div>
          {/* Desktop Navigation */}
          <div className={`${styles.links} ${styles.desktopLinks}`}>
            <a href="#features" className={styles.link}>Features</a>
            <a href="#roadmap" className={styles.link}>Roadmap</a>
            <a href="#docs" className={styles.link}>Docs</a>
            <a href="#contacts" className={styles.link}>Contacts</a>
          </div>
          <div className={styles.walletContainer}>
            <ConnectButton.Custom>
              {({ account, chain, openConnectModal, openAccountModal, openChainModal, mounted, authenticationStatus }) => {
                const ready = mounted && authenticationStatus !== 'loading';
                const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');
                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      style: { opacity: 0, pointerEvents: 'none', userSelect: 'none' },
                    })}
                  >
                    {!connected ? (
                      <button
                        className={styles.walletBtn}
                        onClick={openConnectModal}
                        type="button"
                      >
                        Connect Wallet
                      </button>
                    ) : (
                      <button
                        className={styles.walletBtn}
                        onClick={openAccountModal}
                        type="button"
                      >
                        {account.displayName}
                      </button>
                    )}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
          {/* Mobile Burger Menu */}
          <button 
            className={`${styles.burgerMenu} ${isMenuOpen ? styles.active : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        {/* Mobile Navigation */}
        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.active : ''}`}>
          <a href="#features" className={styles.mobileLink} onClick={toggleMenu}>Features</a>
          <a href="#roadmap" className={styles.mobileLink} onClick={toggleMenu}>Roadmap</a>
          <a href="#docs" className={styles.mobileLink} onClick={toggleMenu}>Docs</a>
          <a href="#contacts" className={styles.mobileLink} onClick={toggleMenu}>Contacts</a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 