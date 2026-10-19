import { useState } from 'react';
import { EngineSchematic } from './EngineSchematic';
import { EngineViewer } from './EngineViewer';
import type { Lang } from '../types';

type Props = {lang:Lang; onPick:(id:string, chapter?:string)=>void};
const topics = [
  {id:'fan-system',name:'Fan',x:12,thumb:'fan-thumbnail.webp'},
  {id:'hpc-overview',name:'HPC',x:40,thumb:'hpc-thumbnail.webp'},
  {id:'combustor',name:'Combustor',x:57,thumb:'combustor-thumbnail.webp'},
  {id:'hpt',name:'HPT',x:73,thumb:'hpc-thumbnail.webp'},
  {id:'lpt',name:'LPT',x:84,thumb:'hpc-thumbnail.webp'},
  {id:'exhaust-system',name:'Nozzle',x:94,thumb:'combustor-thumbnail.webp'},
];
const hpcParts=[
  {name:'Rotor',tr:'Rotor',id:'hpc-rotor'},
  {name:'Stator Vane',tr:'Stator kanadı',id:'fixed-stator-vane'},
  {name:'VSV',tr:'VSV',id:'variable-stator-vane'},
  {name:'Shroud',tr:'Shroud',id:'stator-shroud'},
  {name:'Bushing',tr:'Bushing',id:'vsv-bushing'},
  {name:'Seal',tr:'Seal',id:'compressor-seal'},
];
const T=(lang:Lang,tr:string,en:string)=>lang==='tr'?tr:en;
export function Dashboard({lang,onPick}:Props){
 const [engineTab,setEngineTab]=useState<'cutaway'|'schematic'|'parts'>('cutaway');
 const [hpcTab,setHpcTab]=useState<'picture'|'model'|'parts'>('picture');
 const [focused,setFocused]=useState('hpc-overview');
 function navigate(id:string,chapter?:string){onPick(id,chapter)}
 return <div className="dashboard" aria-label="Turbofan engineering dashboard">
   <div className="dashboard-intro"><div><span className="eyebrow">INSIDE THE JET ENGINE / ENGINE ATLAS</span><h1>{T(lang,'Turbofan Motorunu Keşfet','Explore the Turbofan Engine')}</h1><p>{T(lang,'Motorun tamamını incele, bir sistem seç ve mühendislik detaylarına ulaş.','Explore the whole engine, select a system, and open its engineering knowledge page.')}</p></div><div className="dashboard-intro-badge">◉ &nbsp; {T(lang,'İNTERAKTİF MOTOR KÜTÜPHANESİ','INTERACTIVE ENGINE LIBRARY')}</div></div>
   <div className="dashboard-split">
     <section className="dashboard-panel engine-atlas">
       <div className="dashboard-panel-header"><div><span className="dash-kicker">ENGINE OVERVIEW</span><h2>{T(lang,'Turbofan Motoru','Turbofan Engine')} <small>— {T(lang,'Etkileşimli görünüm','Interactive explorer')}</small></h2></div><div className="dash-segments" role="group" aria-label="Engine view">
          <button type="button" className={engineTab==='cutaway'?'chosen':''} onClick={()=>setEngineTab('cutaway')}>{T(lang,'Kesit','Cutaway')}</button><button type="button" className={engineTab==='schematic'?'chosen':''} onClick={()=>setEngineTab('schematic')}>{T(lang,'Şema','Schematic')}</button><button type="button" className={engineTab==='parts'?'chosen':''} onClick={()=>setEngineTab('parts')}>{T(lang,'Sistemler','Systems')}</button>
       </div></div>
       {engineTab==='cutaway' ? <div className="atlas-stage">
         <img src="./images/engine-cutaway.webp" alt="Illustrative cutaway render of a turbofan engine" className="atlas-engine-image" />
         {topics.map((area,index)=><button type="button" key={area.id} className={`atlas-point ${focused===area.id?'atlas-point-active':''}`} style={{left:`${area.x}%`,top:`${index%2?27:12}%`}} onMouseEnter={()=>setFocused(area.id)} onFocus={()=>setFocused(area.id)} onClick={()=>navigate(area.id)} title={T(lang,'Detay sayfasını aç','Open detail page')+': '+area.name}><span>{area.name}</span><i/></button>)}
         <div className="atlas-label">CONCEPTUAL CUTAWAY · {T(lang,'GERÇEK CAD DEĞİLDİR','NOT OEM CAD')}</div>
       </div> : engineTab==='schematic' ? <div className="atlas-schematic"><EngineSchematic lang={lang} selected={focused} onPick={navigate}/></div> : <div className="atlas-systems">{topics.map(t=><button type="button" key={t.id} onClick={()=>navigate(t.id)}><img src={'./images/'+t.thumb} alt=""/><span>{t.name}</span><b>↗</b></button>)}</div>}
       <div className="atlas-thumb-row">{topics.map(t=><button type="button" key={t.id} onMouseEnter={()=>setFocused(t.id)} onFocus={()=>setFocused(t.id)} onClick={()=>navigate(t.id)} className={focused===t.id?'atlas-thumb selected':''}><img src={'./images/'+t.thumb} alt=""/><span>{t.name}</span></button>)}</div>
       <div className="atlas-footer-note">ⓘ {T(lang,'Konsept çizimi motor mimarisini anlatır; motor üreticisine ait ölçü veya geometri içermez.','Illustrative engine architecture, not manufacturer geometry or dimensional data.')}</div>
     </section>
     <section className="dashboard-panel hpc-highlight"><div className="hpc-breadcrumb">ENGINE OVERVIEW <span>›</span> HPC</div><h2>{T(lang,'Yüksek Basınç Kompresörü','High Pressure Compressor')}</h2><p>{T(lang,'Kompresör çekirdeğinde basınç yükselmesini sağlayan çok kademeli sistem.','A multi-stage system that raises core airflow pressure.')}</p><div className="dash-segments hpc-tabs" role="group" aria-label="HPC display"><button className={hpcTab==='picture'?'chosen':''} onClick={()=>setHpcTab('picture')}>{T(lang,'Görünüm','Overview')}</button><button className={hpcTab==='model'?'chosen':''} onClick={()=>setHpcTab('model')}>3D</button><button className={hpcTab==='parts'?'chosen':''} onClick={()=>setHpcTab('parts')}>{T(lang,'Parçalar','Parts')}</button></div>
        {hpcTab==='picture'?<div className="hpc-picture" role="img" aria-label="Illustrative compressor render"><img src="./images/hpc-assembly.webp" alt="Conceptual compressor assembly visualization"/><span>{T(lang,'TEMSİLİ GÖRSEL','ILLUSTRATIVE RENDER')}</span></div>:hpcTab==='model'?<div className="hpc-model"><EngineViewer lang={lang} isVsv={false}/></div>:<div className="hpc-part-list">{hpcParts.map(part=><button type="button" key={part.id} onClick={()=>navigate(part.id)}><span>◈</span>{lang==='tr'?part.tr:part.name}<b>↗</b></button>)}</div>}
        <div className="hpc-key-features"><span>◈ {T(lang,'Rotor + stator kademeleri','Rotor + stator stages')}</span><span>◈ {T(lang,'Akış yönlendirme / difüzyon','Flow turning / diffusion')}</span></div><button type="button" className="dash-primary" onClick={()=>navigate('hpc-overview')}>{T(lang,'HPC Teknik Sayfasına Git','Open HPC Engineering Chapter')} <span>↗</span></button>
     </section>
   </div>
   <div className="dashboard-card-grid">
     <article className="dashboard-feature"><div><span className="dash-kicker">COMPONENT SPOTLIGHT / 01</span><h3>{T(lang,'Stator Kanadı','Stator Vane')}</h3><p>{T(lang,'Akışı sonraki rotor kademesine uygun koşullarda yönlendiren kanatların geometrisini, malzemesini ve yüklerini incele.','Explore geometry, materials and loads of the vanes that redirect flow towards the next rotor stage.')}</p><button onClick={()=>navigate('fixed-stator-vane')}>{T(lang,'Detayları aç','Explore component')} ↗</button></div><img src="./images/stator-vane.webp" alt="Illustrative stator vane geometry"/></article>
     <article className="dashboard-feature"><div><span className="dash-kicker">ENGINEERING TOPICS / 02</span><h3>{T(lang,'Aerodinamik Tasarım','Aerodynamic Design')}</h3><p>{T(lang,'Velocity triangles, incidence, diffusion ve kayıp mekanizmalarıyla kompresör aerodinamiğini keşfet.','Learn about velocity triangles, incidence, diffusion and compressor losses.')}</p><button onClick={()=>navigate('fixed-stator-vane','aero')}>{T(lang,'Makaleye git','Read engineering article')} ↗</button></div><img src="./images/aerodynamics.webp" alt="Illustrative compressor flow lines"/></article>
     <article className="dashboard-feature"><div><span className="dash-kicker">PARTS & ASSEMBLIES / 03</span><h3>{T(lang,'Parçalar ve Montajlar','Parts & Assemblies')}</h3><p>{T(lang,'Rotor, stator, shroud, bushing ve seal gibi alt bileşenlerin tasarım ilişkilerine ulaş.','Open linked design pages for rotor, stator, shroud, bushing and seal assemblies.')}</p><button onClick={()=>navigate('hpc-overview','architecture')}>{T(lang,'Parça ağacını aç','Explore assemblies')} ↗</button></div><img src="./images/parts-assembly.webp" alt="Illustrative exploded compressor assembly"/></article>
   </div>
   <div className="dashboard-disclaimer">◈ {T(lang,'Görseller öğretici/temsili olup gerçek bir Rolls-Royce veya başka bir üretici motorunun onaylı çizimleri değildir. Teknik içerikler kaynaklara dayalı olarak ayrıca kontrol edilmelidir.','Visuals are illustrative, not approved drawings of a Rolls-Royce or other OEM engine. Verify technical information against cited engineering references.')}</div>
 </div>
}
