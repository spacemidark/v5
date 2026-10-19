import type { Lang } from '../types';

type Area = {id:string;tr:string;en:string;x:number;w:number;fill:string};
const AREAS:Area[]=[
  {id:'air-inlet',tr:'GİRİŞ',en:'INLET',x:24,w:76,fill:'#355970'},
  {id:'fan-system',tr:'FAN',en:'FAN',x:101,w:83,fill:'#70b4ce'},
  {id:'hpc-overview',tr:'HPC',en:'HPC',x:274,w:111,fill:'#4fa7b4'},
  {id:'combustor',tr:'YANMA',en:'COMB.',x:392,w:85,fill:'#e19c64'},
  {id:'hpt',tr:'HPT',en:'HPT',x:480,w:90,fill:'#d5a066'},
  {id:'lpt',tr:'LPT',en:'LPT',x:574,w:89,fill:'#7ca4c3'},
  {id:'exhaust-system',tr:'EGZOZ',en:'EXHAUST',x:670,w:78,fill:'#66869d'},
];
export function EngineSchematic({lang,selected,onPick}:{lang:Lang;selected:string;onPick:(id:string)=>void}){
  return <section className="visual-panel" aria-label="Turbofan architecture schematic">
    <div className="visual-top"><div><span className="live-dot"/> {lang==='tr'?'TÜM MOTOR HARİTASI':'FULL ENGINE MAP'} <span className="view-code">/ TURBOFAN</span></div><span style={{fontSize:10,color:'#85a9b9'}}>CLICK TO EXPLORE</span></div>
    <div className="full-engine-stage">
      <svg viewBox="0 0 775 305" role="img" aria-label={lang==='tr'?'Tıklanabilir şematik turbofan motoru':'Clickable schematic turbofan engine'}>
        <defs>
          <linearGradient id="casing-grad" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#698ba1"/><stop offset="1" stopColor="#263f55"/></linearGradient>
          <linearGradient id="air-grad" x1="0" x2="1"><stop stopColor="#42a6d2" stopOpacity=".28"/><stop offset="1" stopColor="#f2a75e" stopOpacity=".2"/></linearGradient>
        </defs>
        <g opacity=".38" stroke="#41637a" strokeWidth="1">{Array.from({length:12},(_,i)=><line key={i} x1={35+i*60} x2={35+i*60} y1="29" y2="265" strokeDasharray="2 5"/>)}<line x1="12" x2="758" y1="143" y2="143" strokeDasharray="4 4"/></g>
        <path d="M 24 52 Q 160 40 250 68 L 380 81 L 510 70 L 655 84 L 748 104 L 748 186 L 655 201 L 510 214 L 380 203 L 250 216 Q 155 244 24 229 Z" fill="url(#casing-grad)" fillOpacity=".45" stroke="#83a8b8" strokeWidth="2"/>
        <path d="M 184 93 L 355 109 L 457 108 L 555 115 L 663 118 L 745 120 L 745 165 L 663 174 L 555 183 L 457 180 L 355 181 L 184 197" fill="#1a2f41" stroke="#97b8c8" strokeWidth="1.5"/>
        <path d="M 186 94 L 370 106 L 477 108 L 477 180 L 370 180 L 186 198" fill="url(#air-grad)"/>
        <path d="M 180 147 L 661 147" stroke="#5a86a1" strokeWidth="20" opacity=".52"/>
        <path d="M 90 133 L 710 133" stroke="#bad0d9" strokeWidth="3" opacity=".45"/>
        <path d="M 386 108 L 398 86 L 438 87 L 470 106 L 470 183 L 439 203 L 399 205 L 386 180 Z" fill="#8c5637" stroke="#eba06e" strokeWidth="2"/>
        <path d="M 400 111 Q 421 91 445 111 L 460 143 L 444 179 Q 421 201 400 175 Z" fill="#f1b46e" opacity=".3"/>
        <g stroke="#79a9be" strokeWidth="1.1" opacity=".86">
          {Array.from({length:10},(_,i)=>{const x=195+i*18;const height=44-i*2.9;return <path key={i} d={`M ${x} ${143-height} l 7 0 l -6 ${height} l 6 ${height} l -7 0 Z`} fill={i>4?'#4bc0c4':'#8ab2c8'}/>})}
          {Array.from({length:4},(_,i)=>{const x=496+i*17;return <path key={i} d={`M ${x} 116 l 9 4 l -4 24 l 4 24 l -9 4 Z`} fill="#d49b73"/>})}
          {Array.from({length:6},(_,i)=>{const x=580+i*15;return <path key={i} d={`M ${x} 118 l 9 3 l -4 22 l 4 22 l -9 3 Z`} fill="#8aabc4"/>})}
        </g>
        <g transform="translate(137 145)">{Array.from({length:16},(_,i)=><path key={i} d="M -2 -4 Q 2 -33 6 -59 L 11 -60 L 7 -4 Z" fill="#86b6d2" stroke="#a3d4e5" strokeWidth=".5" transform={`rotate(${i*360/16})`}/>) }<circle r="18" fill="#456d83" stroke="#b8d2df" strokeWidth="2"/><circle r="7" fill="#172e41"/></g>
        <path d="M 80 143 C 110 126 117 133 137 143 C 117 153 110 160 80 143" fill="#a2bbc8" opacity=".65"/>
        {AREAS.map(a=><g key={a.id} className={`engine-hotspot ${selected===a.id?'selected':''}`} role="button" tabIndex={0} onClick={()=>onPick(a.id)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onPick(a.id)}}} aria-label={a[lang]}><rect className="hotspot-shape" x={a.x} y="39" width={a.w} height="212" rx="7" fill={a.fill} fillOpacity={selected === a.id ? 0.18 : 0.025} stroke={selected===a.id?'#f2c08a':'transparent'} strokeWidth="1.5"/><rect x={a.x+2} y="8" width={a.w-4} height="23" rx="4" fill={selected===a.id?'#725735':'#173244'} stroke="#41677a" strokeWidth="1"/><text x={a.x+a.w/2} y="23" textAnchor="middle" className="svg-part-label" style={{fontSize:a.w>90?11:10}}>{a[lang]}</text><path d={`M${a.x+a.w/2} 31 V39`} stroke="#648ca2" strokeWidth="1"/></g>)}
        <path d="M 22 283 L 744 283" stroke="#3a687e" strokeWidth="1"/><text x="30" y="278" fill="#65a6c9" fontSize="10">AIR IN</text><text x="674" y="278" fill="#e9b075" fontSize="10">HOT GAS OUT</text><path d="M 92 271 H 135" stroke="#54acd5" strokeWidth="2"/><path d="M 125 267 l10 4 l-10 4" fill="none" stroke="#54acd5" strokeWidth="2"/><path d="M 640 271 H 675" stroke="#e8b178" strokeWidth="2"/><path d="M 665 267 l10 4 l-10 4" fill="none" stroke="#e8b178" strokeWidth="2"/>
      </svg>
    </div>
    <div className="engine-schematic-key"><span><strong>◈</strong> {lang==='tr'?'Üst etiketlerden motor bölümünü seç.':'Select an engine section using the labels above.'}</span><span>NOT TO SCALE · GENERIC CONCEPT</span></div>
    <div className="schematic-caption"><b>ⓘ &nbsp;</b>{lang==='tr'?'Şema temsili iki-spool turbofan mimarisidir. Gerçek bir üretici motorunun CAD/kesit çizimi değildir.':'Generic two-spool turbofan architecture; not an OEM CAD or actual engine cross-section.'}</div>
  </section>;
}
