import { useState, type ReactNode } from 'react';

export function EngineeringNote({ children }: { children: ReactNode }) {
  return <aside className="engineering-note"><div className="note-title"><span>◈</span> ENGINEERING INSIGHT</div><div>{children}</div></aside>;
}

export function ThermalCalculator() {
  const [length, setLength] = useState(100);
  const [cte, setCte] = useState(12);
  const [deltaT, setDeltaT] = useState(150);
  const expansion = length * cte * 1e-6 * deltaT;
  return <div className="tool-card">
    <div className="tool-head"><span className="mini-eyebrow">INTERACTIVE TOOL 01</span><strong>Free thermal expansion / Serbest genleşme</strong></div>
    <div className="calc-grid">
      <label>Length · L₀ (mm)<input type="number" min="0" step="1" value={length} onChange={e=>setLength(Number(e.target.value))}/></label>
      <label>CTE · α (×10⁻⁶/K)<input type="number" min="0" step="0.1" value={cte} onChange={e=>setCte(Number(e.target.value))}/></label>
      <label>ΔT (K)<input type="number" step="10" value={deltaT} onChange={e=>setDeltaT(Number(e.target.value))}/></label>
      <div className="calc-result"><small>ESTIMATED ΔL</small><strong>{expansion.toFixed(3)} <span>mm</span></strong></div>
    </div>
    <p className="tool-warning">Educational 1D free-expansion estimate only. Not a real compressor clearance prediction; gradients and constraints are excluded.</p>
  </div>;
}

export function VsvGuide() {
  return <div className="mini-feature"><span className="mini-feature-symbol">↗</span><div><strong>Explore the VSV model above</strong><p>Change the demonstration stagger setting in the 3D view and compare the conceptual vane orientation. This is not an engine control schedule.</p></div></div>;
}

export function AirfoilDiagram({ type }: { type: 'airfoil' | 'stage' }) {
  if(type === 'stage') return <svg viewBox="0 0 650 320" className="engineering-svg" role="img" aria-label="Simplified compressor rotor and stator stage">
    <defs><linearGradient id="d-stage" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#193954"/><stop offset="1" stopColor="#0b1f33"/></linearGradient></defs>
    <rect width="650" height="320" rx="16" fill="url(#d-stage)"/><g stroke="#24475d" strokeWidth=".7" opacity=".65">{Array.from({length:16},(_,i)=><path key={i} d={`M${i*42} 0v320`}/>)}</g>
    <rect x="65" y="65" width="520" height="190" rx="13" fill="#14354d" stroke="#417187"/>
    <rect x="65" y="214" width="520" height="41" fill="#24445c"/><path d="M65 100h520" stroke="#426a80" strokeDasharray="4 6"/>
    {Array.from({length:5},(_,i)=><path key={`r${i}`} d={`M${155+i*13} 212 Q${116+i*13} 155 ${171+i*13} 111 L${180+i*13} 111 Q${144+i*13} 163 ${169+i*13} 212Z`} fill="#47b8ca" stroke="#8fe8e5" opacity=".9"/>)}
    {Array.from({length:5},(_,i)=><path key={`s${i}`} d={`M${370+i*13} 212 Q${399+i*13} 162 ${354+i*13} 112 L${346+i*13} 112 Q${385+i*13} 165 ${358+i*13} 212Z`} fill="#e9a75f" stroke="#ffd19c" opacity=".9"/>)}
    <path d="M78 154H132m-10-10 10 10-10 10M297 154h42m-10-10 10 10-10 10M470 154h93m-10-10 10 10-10 10" stroke="#c5e9e8" strokeWidth="3" fill="none"/>
    <g fontFamily="monospace" fontSize="15" fill="#d8eef4"><text x="160" y="55">ROTOR</text><text x="367" y="55">STATOR</text><text x="72" y="285">INLET</text><text x="535" y="285">OUTLET</text></g>
    <g stroke="#82adb9"><path d="M175 60l0 40M385 60l0 40"/></g>
  </svg>;
  return <svg viewBox="0 0 650 320" className="engineering-svg" role="img" aria-label="Conceptual stator vane airfoil geometry with chord and flow arrows">
    <rect width="650" height="320" rx="16" fill="#0c2234"/><g opacity=".65" stroke="#254657" strokeWidth=".8">{Array.from({length:18},(_,i)=><path key={i} d={`M${i*38} 0v320`}/>)}{Array.from({length:9},(_,i)=><path key={`h${i}`} d={`M0 ${i*40}h650`}/>)}</g>
    <path d="M105 215 Q260 109 542 115 Q350 158 105 215Z" fill="#45b0be" fillOpacity=".25" stroke="#80d7dc" strokeWidth="2.5"/>
    <path d="M105 215L542 115" stroke="#f0b46c" strokeWidth="2" strokeDasharray="8 7"/><path d="M105 215Q286 161 542 115" fill="none" stroke="#5db5be" strokeDasharray="4 5" strokeWidth="1.5"/>
    <circle cx="105" cy="215" r="6" fill="#a0e9d6"/><circle cx="542" cy="115" r="6" fill="#ffc078"/>
    <path d="M48 171h81m-12-9 12 9-12 9M551 117l59-27m-13-3 13 3-6 12" stroke="#c3e6ec" fill="none" strokeWidth="3"/>
    <g fontFamily="monospace" fontSize="13" fill="#d9eff3"><text x="68" y="260">LEADING EDGE</text><text x="483" y="76">TRAILING EDGE</text><text x="323" y="196">CHORD</text><text x="40" y="148">V₁</text><text x="589" y="74">V₂</text></g>
  </svg>;
}
