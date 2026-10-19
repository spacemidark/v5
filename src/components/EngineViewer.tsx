import { useMemo, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Grid } from '@react-three/drei';
import { DoubleSide, Shape, ExtrudeGeometry } from 'three';
import { AirfoilDiagram } from './EngineeringWidgets';
import type { Lang } from '../types';

function Blade({ x, angle, rotor, pitch, highlighted }: { x:number; angle:number; rotor:boolean; pitch:number; highlighted:boolean }) {
  // Deliberately generic radial blade shape, not a reverse-engineered OEM model.
  const geom = useMemo(() => {
    const path = new Shape();
    path.moveTo(-.16, .91); path.bezierCurveTo(-.20, 1.24, -.06, 1.55, -.19, 1.83);
    path.quadraticCurveTo(-.09, 1.90, .02, 1.80);
    path.bezierCurveTo(.17, 1.54, .08, 1.23, .15, .92);
    path.closePath();
    return new ExtrudeGeometry(path, {depth:.055, bevelEnabled:true, bevelSegments:1, steps:1, bevelSize:.024, bevelThickness:.014, curveSegments:5});
  },[]);
  const color = highlighted ? '#e5ad6d' : rotor ? '#76a9c5' : '#3d8398';
  return <group position={[x,0,0]} rotation={[angle, 0, 0]}><mesh geometry={geom} rotation={[0, rotor ? .2 : pitch * Math.PI/180, 0]}>
    <meshStandardMaterial color={color} metalness={.75} roughness={.32} side={DoubleSide}/>
  </mesh></group>;
}

function Machine({ mode, angle }: { mode:'fixed'|'vsv'; angle:number }) {
  return <group rotation={[.28,.03,-.14]}>
    <ambientLight intensity={1.3}/>
    <directionalLight position={[4,7,8]} intensity={3} color="#ceeafd"/>
    <pointLight position={[-3,-2,6]} intensity={30} distance={13} color="#46a7d2"/>
    <mesh rotation={[0,0,Math.PI/2]} position={[0,0,0]}><cylinderGeometry args={[.81,.81,4.5,72]}/><meshStandardMaterial color="#2a485d" metalness={.82} roughness={.32}/></mesh>
    <mesh rotation={[0,0,Math.PI/2]} position={[0,0,0]}><cylinderGeometry args={[.73,.73,4.53,72]}/><meshStandardMaterial color="#20374a" metalness={.8} roughness={.3}/></mesh>
    {[-1.66,-.55,.55,1.66].map((x,i)=><group key={x}>
      <mesh rotation={[0,0,Math.PI/2]} position={[x,0,0]}><cylinderGeometry args={[.94,.94,.12,72]}/><meshStandardMaterial color={i%2 ? '#668ba5':'#4d6981'} metalness={.85} roughness={.32}/></mesh>
      {Array.from({length:20},(_,j)=><Blade key={j} x={x} angle={j*Math.PI*2/20} rotor={i%2===0} pitch={mode==='vsv' && i===1 ? angle : 0} highlighted={i%2===1}/>) }
    </group>)}
    {[-2.18,2.18].map(x=><mesh key={x} position={[x,0,0]} rotation={[0,Math.PI/2,0]}><torusGeometry args={[1.89,.055,10,96]}/><meshStandardMaterial color="#477286" metalness={.65} roughness={.33}/></mesh>)}
    {[-1.2,0,1.2].map(x=><mesh key={'r'+x} position={[x,0,0]} rotation={[0,Math.PI/2,0]}><torusGeometry args={[1.94,.019,8,92]}/><meshStandardMaterial color="#5c8396" transparent opacity={.55} /></mesh>)}
    <mesh rotation={[0,0,Math.PI/2]} position={[0,0,0]}><cylinderGeometry args={[1.99,1.99,4.48,72,1,true,0,Math.PI*1.2]}/><meshStandardMaterial color="#5c869a" transparent opacity={.09} side={DoubleSide} depthWrite={false}/></mesh>
    <Grid position={[0,-2.05,0]} args={[10,10]} cellSize={.65} cellThickness={.45} cellColor="#35627b" sectionColor="#35627b" sectionSize={1.3} sectionThickness={.7} fadeDistance={10} infiniteGrid={false} />
  </group>;
}

export function EngineViewer({ lang, isVsv }: {lang:Lang;isVsv:boolean}) {
  const [tab,setTab] = useState<'3d'|'diagram'>('3d');
  const [angle,setAngle] = useState(0);
  const [webglFailed,setWebglFailed] = useState(false);
  return <section className="visual-panel" aria-label="Interactive compressor model">
    <div className="visual-top"><div><span className="live-dot"/> {lang==='tr'?'İNTERAKTİF GÖRÜNTÜLEYİCİ':'INTERACTIVE VIEWER'} <span className="view-code">/ HPC SCHEMATIC</span></div><div className="segment-control"><button type="button" className={tab==='3d'?'selected':''} onClick={()=>setTab('3d')}>◈ 3D</button><button type="button" className={tab==='diagram'?'selected':''} onClick={()=>setTab('diagram')}>▧ {lang==='tr'?'Şema':'Diagram'}</button></div></div>
    <div className="visual-stage">
      {tab==='3d' && !webglFailed ? <Suspense fallback={<div className="loading-model">Loading model…</div>}>
        <Canvas camera={{position:[5.1,3.4,5.9],fov:42}} gl={{alpha:true,antialias:true}} onCreated={({gl})=>{gl.domElement.addEventListener('webglcontextlost',()=>setWebglFailed(true),{once:true});}}>
          <color attach="background" args={['#0e2031']}/><Float floatIntensity={.08} speed={1.1} rotationIntensity={0}><Machine mode={isVsv?'vsv':'fixed'} angle={angle}/></Float>
          <OrbitControls enablePan={false} minDistance={5} maxDistance={12} autoRotate={false} />
        </Canvas>
      </Suspense> : <div className="diagram-view"><AirfoilDiagram type={isVsv?'stage':'airfoil'}/></div>}
      <div className="view-tags"><span>{lang==='tr'?'ŞEMATİK MODEL':'SCHEMATIC MODEL'}</span><span>NOT TO SCALE</span></div>
      {tab==='3d' && <div className="viewer-hint">↻ {lang==='tr'?'Döndürmek için sürükle · Yakınlaştırmak için kaydır':'Drag to rotate · Scroll to zoom'}</div>}
    </div>
    <div className="viewer-footer">
      {isVsv ? <div className="angle-control"><div><strong>VSV {lang==='tr'?'gösterim açısı':'demo angle'}</strong><small>{lang==='tr'?'Temsili animasyon · gerçek kontrol programı değildir':'Conceptual motion · not an engine schedule'}</small></div><input aria-label="VSV demonstration angle" type="range" min="-30" max="30" step="1" value={angle} onChange={e=>setAngle(Number(e.target.value))}/><output>{angle>0?'+':''}{angle}°</output></div> : <div className="model-caption"><span className="caption-marker">◎</span><span>{lang==='tr'?'Sabit stator sırası turuncuyla vurgulanmıştır.':'Fixed stator row highlighted in amber.'}</span></div>}
      <span className="viewer-disclaimer">{lang==='tr'?'Öğretici geometri — sertifikalı tasarım verisi değildir.':'Educational geometry — not certified design data.'}</span>
    </div>
  </section>;
}
