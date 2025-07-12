import React, { useRef, useLayoutEffect, useState } from "react";

const nodeStyle = {
  background: 'var(--color-bg)', // match main background
  borderRadius: 16,
  boxShadow: '0 0 24px 0 #ffb80033, 0 0 0 2px #ffb80022',
  padding: '1.2rem 1.1rem',
  minWidth: 160,
  minHeight: 90,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontWeight: 600,
  fontSize: 16,
  gap: 6,
};

const iconStyle = {
  fontSize: 36,
  marginBottom: 6,
  filter: 'drop-shadow(0 0 8px #ffb80055)'
};

// SVG ICONS
const UserIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-3.3 2.7-6 6-6h4c3.3 0 6 2.7 6 6"/></svg>
);
const OrganizerIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-3.3 2.7-6 6-6h4c3.3 0 6 2.7 6 6"/></svg>
);
const FileIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 4v4a1 1 0 0 0 1 1h4"/></svg>
);
const ShieldIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);
const ChartIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><rect x="7" y="12" width="3" height="6"/><rect x="12" y="8" width="3" height="10"/><rect x="17" y="5" width="3" height="13"/></svg>
);
const BlockchainIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M7 7l10 10M17 7L7 17"/></svg>
);

const ArrowSVG = ({ x1, y1, x2, y2, label, labelX, labelY, vertical, curved, curveDir = 1 }) => (
  <svg style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
    {vertical ? (
      <g>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FFB800" strokeWidth="2.5" markerEnd="url(#arrowhead)" />
        {label && (
          <text x={x1 + 10} y={(y1 + y2) / 2} textAnchor="start" fill="#FFB800" fontWeight="600" fontSize="15" style={{ pointerEvents: 'none', background: '#181c20' }}>{label}</text>
        )}
      </g>
    ) : curved ? (
      <path
        d={`M${x1},${y1} Q${(x1 + x2) / 2},${y1 + curveDir * 60} ${x2},${y2}`}
        stroke="#FFB800"
        strokeWidth="2.5"
        fill="none"
        markerEnd="url(#arrowhead)"
      />
    ) : (
      <g>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FFB800" strokeWidth="2.5" markerEnd="url(#arrowhead)" />
        {label && (
          <text x={(x1 + x2) / 2} y={y1 - 10} textAnchor="middle" fill="#FFB800" fontWeight="600" fontSize="15" style={{ pointerEvents: 'none', background: '#181c20' }}>{label}</text>
        )}
      </g>
    )}
    <defs>
      <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,8 L8,4 Z" fill="#FFB800" />
      </marker>
    </defs>
  </svg>
);

// Helper for arrow number label
// Blended solid colors between cyan and orange
const badgeSolidColors = {
  1: '#4DD0E1', // cyan
  2: '#7ed6b6', // 75% cyan, 25% orange
  3: '#b0db8b', // 50% cyan, 50% orange
  4: '#e2e160', // 25% cyan, 75% orange
  5: '#FFB800', // orange
};
const ArrowNumber = ({ x, y, n }) => (
  <g>
    <circle cx={x} cy={y} r={14} fill={badgeSolidColors[n]} />
    <text x={x} y={y+5} textAnchor="middle" fontWeight="bold" fontSize="16" fill="#232E41">{n}</text>
  </g>
);

const GAP = 18; // px, gap between arrow and box edge
const ARROW_MARGIN = 12; // px, margin from box edge

// Helper to get edge points for arrows
function getEdgePoints(from, to, direction) {
  if (!from || !to) return { x1: 0, y1: 0, x2: 0, y2: 0 };
  if (direction === 'horizontal') {
    // left to right
    return {
      x1: from.x + from.width / 2 + ARROW_MARGIN,
      y1: from.y,
      x2: to.x - to.width / 2 - ARROW_MARGIN,
      y2: to.y,
    };
  } else if (direction === 'vertical') {
    // bottom to top, add extra margin so arrow doesn't touch the top box
    const extraMargin = ARROW_MARGIN + 6;
    return {
      x1: from.x,
      y1: from.y - from.height / 2 - ARROW_MARGIN,
      x2: to.x,
      y2: to.y + to.height / 2 + extraMargin,
    };
  }
  return { x1: from.x, y1: from.y, x2: to.x, y2: to.y };
}

// CSS gradients for step badges
const badgeCssGradients = {
  1: '#4DD0E1',
  2: 'linear-gradient(135deg, #4DD0E1 0%, #4DD0E1 75%, #FFB800 100%)',
  3: 'linear-gradient(135deg, #4DD0E1 0%, #4DD0E1 50%, #FFB800 100%)',
  4: 'linear-gradient(135deg, #4DD0E1 0%, #4DD0E1 25%, #FFB800 100%)',
  5: '#FFB800',
};

const badgeCssSolidColors = badgeSolidColors;

const OverviewSection = () => {
  // Refs for each node
  const organizerRef = useRef(null);
  const factoryRef = useRef(null);
  const votingRef = useRef(null);
  const tallyRef = useRef(null);
  const userRef = useRef(null);
  const blockchainRef = useRef(null);
  const gridRef = useRef(null);

  // State for node centers
  const [centers, setCenters] = useState(null);
  const [gridSize, setGridSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    function getCenter(ref) {
      if (!ref.current) return null;
      const rect = ref.current.getBoundingClientRect();
      const parentRect = gridRef.current?.getBoundingClientRect() || { left: 0, top: 0 };
      return {
        x: rect.left - parentRect.left + rect.width / 2,
        y: rect.top - parentRect.top + rect.height / 2,
        width: rect.width,
        height: rect.height,
      };
    }
    setCenters({
      organizer: getCenter(organizerRef),
      factory: getCenter(factoryRef),
      voting: getCenter(votingRef),
      tally: getCenter(tallyRef),
      user: getCenter(userRef),
      blockchain: getCenter(blockchainRef),
    });
    if (gridRef.current) {
      const gridRect = gridRef.current.getBoundingClientRect();
      setGridSize({ width: gridRect.width, height: gridRect.height });
    }
  }, []);

  return (
    <section style={{ padding: '4rem 0', background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', textAlign: 'center', position: 'relative' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '2.5rem', color: '#fff', letterSpacing: '-0.01em' }}>
          How Private Voting Works
        </h1>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: '120px 80px',
          justifyItems: 'center',
          alignItems: 'center',
          position: 'relative',
          minHeight: 420,
          background: 'none',
          margin: '0 auto',
          maxWidth: 1300,
        }} ref={gridRef}>
          {/* Top row */}
          <div style={{ gridColumn: 1, gridRow: 1, zIndex: 2 }} ref={organizerRef}>
            <div style={nodeStyle}>
              <span style={iconStyle}><OrganizerIcon /></span>
              Organizer
            </div>
          </div>
          <div style={{ gridColumn: 2, gridRow: 1, zIndex: 2 }} ref={factoryRef}>
            <div style={{ ...nodeStyle }}>
              <span style={iconStyle}><FileIcon /></span>
              Factory Contract
              <div style={{ color: '#b0b4c1', fontWeight: 400, fontSize: 13 }}></div>
            </div>
          </div>
          <div style={{ gridColumn: 3, gridRow: 1, zIndex: 2 }} ref={votingRef}>
            <div style={{ ...nodeStyle }}>
              <span style={iconStyle}><ShieldIcon /></span>
              <span style={{ fontSize: 15, fontWeight: 600 }}>Voting/Auction Contract</span>
              <div style={{ color: '#b0b4c1', fontWeight: 30, fontSize: 10 }}></div>
            </div>
          </div>
          <div style={{ gridColumn: 4, gridRow: 1, zIndex: 2 }} ref={tallyRef}>
            <div style={{ ...nodeStyle }}>
              <span style={iconStyle}><ChartIcon /></span>
              Tally
              <div style={{ color: '#b0b4c1', fontWeight: 400, fontSize: 13 }}></div>
            </div>
          </div>
          {/* Bottom row: User below Voting/Auction Contract, Blockchain to the right */}
          <div style={{ gridColumn: 3, gridRow: 2, zIndex: 2 }} ref={userRef}>
            <div style={nodeStyle}>
              <span style={iconStyle}><UserIcon /></span>
              User
            </div>
          </div>
          <div style={{ gridColumn: 4, gridRow: 2, zIndex: 2 }} ref={blockchainRef}>
            <div style={nodeStyle}>
              <span style={iconStyle}><BlockchainIcon /></span>
              Blockchain
            </div>
          </div>
          {/* SVG arrows overlay, only render if centers are measured */}
          {centers && centers.organizer && centers.factory && centers.voting && centers.tally && centers.user && centers.blockchain && (
            <svg style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none', width: gridSize.width, height: gridSize.height, zIndex: 1 }}>
              {/* 1. Organizer → Factory Contract */}
              {(() => { const p = getEdgePoints(centers.organizer, centers.factory, 'horizontal');
                const mx = (p.x1 + p.x2) / 2, my = (p.y1 + p.y2) / 2 - 38;
                return <g><ArrowSVG {...p} /><ArrowNumber x={mx} y={my} n={1} /></g>; })()}
              {/* 2. Factory Contract → Voting/Auction Contract */}
              {(() => { const p = getEdgePoints(centers.factory, centers.voting, 'horizontal');
                const mx = (p.x1 + p.x2) / 2, my = (p.y1 + p.y2) / 2 - 38;
                return <g><ArrowSVG {...p} /><ArrowNumber x={mx} y={my} n={2} /></g>; })()}
              {/* 3. Voting/Auction Contract → Tally (now 5) */}
              {(() => { const p = getEdgePoints(centers.voting, centers.tally, 'horizontal');
                const mx = (p.x1 + p.x2) / 2, my = (p.y1 + p.y2) / 2 - 38;
                return <g><ArrowSVG {...p} /><ArrowNumber x={mx} y={my} n={5} /></g>; })()}
              {/* 4. User → Voting/Auction Contract (vertical up) */}
              {(() => { const p = getEdgePoints(centers.user, centers.voting, 'vertical');
                const mx = (p.x1 + p.x2) / 2, my = (p.y1 + p.y2) / 2;
                return <g><ArrowSVG {...p} /><ArrowNumber x={mx - 32} y={my} n={4} /></g>; })()}
              {/* 5. User → Blockchain (now 3) */}
              {(() => { const p = getEdgePoints(centers.user, centers.blockchain, 'horizontal');
                const mx = (p.x1 + p.x2) / 2, my = (p.y1 + p.y2) / 2 - 38;
                return <g><ArrowSVG {...p} /><ArrowNumber x={mx} y={my} n={3} /></g>; })()}
            </svg>
          )}
        </div>
        {/* Steps below diagram - vertical stepper layout */}
        <div style={{ margin: '3.5rem auto 0 auto', maxWidth: 520, display: 'flex', flexDirection: 'column', gap: 36, alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <span style={{ background: badgeCssSolidColors[1], color: '#232E41', borderRadius: '50%', width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 20, flexShrink: 0, boxShadow: '0 2px 8px #4DD0E133', marginTop: 2 }}>1</span>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 2 }}>Initiate</span>
              <span style={{ color: '#b0b4c1', fontSize: 17, fontWeight: 400, marginTop: 2 }}>Organizer deploys a factory contract to start a new voting/auction event.</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <span style={{ background: badgeCssSolidColors[2], color: '#232E41', borderRadius: '50%', width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 20, flexShrink: 0, boxShadow: '0 2px 8px #4DD0E133', marginTop: 2 }}>2</span>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 2 }}>Burn & Vote/Bid</span>
              <span style={{ color: '#b0b4c1', fontSize: 17, fontWeight: 400, marginTop: 2 }}>User burns tokens and submits a vote or bid with a zero-knowledge proof.</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <span style={{ background: badgeCssSolidColors[3], color: '#232E41', borderRadius: '50%', width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 20, flexShrink: 0, boxShadow: '0 2px 8px #4DD0E133', marginTop: 2 }}>3</span>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 2 }}>Burn & Vote/Bid</span>
              <span style={{ color: '#b0b4c1', fontSize: 17, fontWeight: 400, marginTop: 2 }}>User burns tokens and submits a vote or bid with a zero-knowledge proof.</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <span style={{ background: badgeCssSolidColors[4], color: '#232E41', borderRadius: '50%', width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 20, flexShrink: 0, boxShadow: '0 2px 8px #4DD0E133', marginTop: 2 }}>4</span>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 2 }}>Submit Proof</span>
              <span style={{ color: '#b0b4c1', fontSize: 17, fontWeight: 400, marginTop: 2 }}>User submits a zero-knowledge proof to the Voting/Auction Contract.</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <span style={{ background: badgeCssSolidColors[5], color: '#232E41', borderRadius: '50%', width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 20, flexShrink: 0, boxShadow: '0 2px 8px #4DD0E133', marginTop: 2 }}>5</span>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 2 }}>Tally</span>
              <span style={{ color: '#b0b4c1', fontSize: 17, fontWeight: 400, marginTop: 2 }}>Results are tallied on-chain and are public, verifiable, and privacy-preserving.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection; 