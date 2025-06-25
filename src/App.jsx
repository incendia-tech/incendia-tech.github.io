import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function TopBar() {
  return (
    <header className="top-bar">
      <div className="top-left">Incendia</div>
      <div className="top-right"><ConnectButton className="rk-connect-button" /></div>
    </header>
  );
}

function Home() {
  const navigate = useNavigate();
  return (
    <main className="center-content">
      <div className="explanation">
        <h1>Private Voting DApp</h1>
        <p>
          Incendia enables privacy-preserving, decentralized voting ceremonies. Create or join a ceremony to participate securely and anonymously.
        </p>
      </div>
      <div className="button-row">
        <button onClick={() => navigate('/create')}>Create a Ceremony</button>
        <button onClick={() => navigate('/join')}>Join a Ceremony</button>
      </div>
    </main>
  );
}

function CreateCeremony() {
  return <div className="page-placeholder">Create Ceremony Page (to be designed)</div>;
}

function JoinCeremony() {
  return <div className="page-placeholder">Join Ceremony Page (to be designed)</div>;
}

function BottomBar() {
  return (
    <footer className="bottom-bar">
      <a href="https://x.com/burn2vote" target="_blank" rel="noopener noreferrer">X</a>
      <a href="https://www.linkedin.com/company/107884107" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a href="https://github.com/zero-savvy/burn-to-vote" target="_blank" rel="noopener noreferrer">GitHub</a>
    </footer>
  );
}

export default function App() {
  return (
    <div className="app-container">
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateCeremony />} />
        <Route path="/join" element={<JoinCeremony />} />
      </Routes>
      <BottomBar />
    </div>
  );
}
