"use client";
import { useState, useEffect, useCallback } from "react";
import { EVENTS, LEADS, TIER_CONFIG, SVC_COLORS } from "../data/leads";

export default function Home() {
  const [logs, setLogs] = useState({});
  const [view, setView] = useState("home");
  const [activeEvent, setActiveEvent] = useState(null);
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState(0);
  const [statusFilter, setStatusFilter] = useState("all");
  const [svcFilter, setSvcFilter] = useState("");
  const [selected, setSelected] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [interest, setInterest] = useState(3);
  const [nextStep, setNextStep] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userName, setUserName] = useState("");
  const [nameMode, setNameMode] = useState(false);
  const [tmpName, setTmpName] = useState("");
  const [showStrategy, setShowStrategy] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("lawi-crm-user") : null;
    if (stored) setUserName(stored); else setNameMode(true);
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch("/api/logs");
      if (res.ok) { const d = await res.json(); if (d && Object.keys(d).length) setLogs(d); }
    } catch { try { const l = localStorage.getItem("lawi-crm-logs"); if (l) setLogs(JSON.parse(l)); } catch {} }
    setLoading(false);
  };

  const saveLogs = useCallback(async (n) => {
    setSaving(true);
    try { localStorage.setItem("lawi-crm-logs", JSON.stringify(n)); } catch {}
    try { await fetch("/api/logs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(n) }); } catch {}
    setSaving(false);
  }, []);

  const doName = () => { if (!tmpName.trim()) return; setUserName(tmpName.trim()); setNameMode(false); localStorage.setItem("lawi-crm-user", tmpName.trim()); };
  const doLog = () => {
    if (!selected || !noteText.trim()) return;
    const entry = { by: userName, time: new Date().toISOString(), note: noteText, interest, nextStep };
    const upd = { ...logs, [selected.id]: [...(logs[selected.id] || []), entry] };
    setLogs(upd); saveLogs(upd);
    setNoteText(""); setInterest(3); setNextStep(""); setSelected(null); setView("event");
  };
  const openEvent = (ev) => { setActiveEvent(ev); setView("event"); setSearch(""); setTierFilter(0); setStatusFilter("all"); setSvcFilter(""); };

  const now = new Date();
  const upcoming = EVENTS.filter(e => new Date(e.endDate) >= now).sort((a, b) => new Date(a.date) - new Date(b.date));
  const past = EVENTS.filter(e => new Date(e.endDate) < now).sort((a, b) => new Date(b.date) - new Date(a.date));
  const getStats = (evId) => { const ld = LEADS[evId] || []; return { total: ld.length, done: ld.filter(l => logs[l.id]?.length > 0).length }; };
  const fmtD = (d) => new Date(d + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });

  if (loading) return <Ctr>Carregando...</Ctr>;
  if (nameMode) return (
    <Ctr><div style={{background:"white",borderRadius:20,padding:32,maxWidth:340,width:"100%",boxShadow:"0 8px 30px rgba(0,0,0,0.08)"}}>
      <div style={{fontSize:26,fontWeight:800,color:"#003366"}}>lawi<span style={{color:"#00B8A9"}}> eventos</span></div>
      <div style={{fontSize:12,color:"#888",marginTop:4,marginBottom:24}}>CRM de eventos</div>
      <input value={tmpName} onChange={e=>setTmpName(e.target.value)} placeholder="Seu nome" onKeyDown={e=>e.key==="Enter"&&doName()} style={{width:"100%",padding:14,border:"2px solid #eee",borderRadius:12,fontSize:16,outline:"none",boxSizing:"border-box"}} autoFocus />
      <button onClick={doName} disabled={!tmpName.trim()} style={{width:"100%",marginTop:14,padding:14,background:tmpName.trim()?"#003366":"#ddd",color:"white",border:"none",borderRadius:12,fontSize:16,fontWeight:700,cursor:"pointer"}}>Entrar</button>
    </div></Ctr>
  );

  // HOME
  if (view === "home") return (
    <Sh>
      <div style={{background:"#003366",color:"white",padding:"20px 16px 24px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><span style={{fontSize:24,fontWeight:800}}>lawi</span><span style={{fontSize:13,color:"#00B8A9",marginLeft:6,fontWeight:700}}>eventos</span></div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <button onClick={fetchLogs} style={sBtn}>↻</button>
            <span style={{fontSize:12,opacity:.7}}>{userName}</span>
          </div>
        </div>
        <div style={{marginTop:14,fontSize:13,opacity:.8}}>Gerencie leads e conversas em cada evento.</div>
      </div>
      <div style={{padding:"14px 14px"}}>
        {upcoming.length > 0 && <><ST>Próximos eventos</ST>{upcoming.map(e=><EvCard key={e.id} ev={e} stats={getStats(e.id)} onOpen={()=>openEvent(e)} fmt={fmtD} />)}</>}
        {past.length > 0 && <><ST>Eventos anteriores</ST>{past.map(e=><EvCard key={e.id} ev={e} stats={getStats(e.id)} onOpen={()=>openEvent(e)} fmt={fmtD} past />)}</>}
      </div>
    </Sh>
  );

  // DETAIL
  if (view === "detail" && selected) {
    const l = selected, ex = logs[l.id] || [], tc = TIER_CONFIG[l.tier];
    return (
      <Sh>
        <div style={{background:activeEvent?.color||"#003366",color:"white",padding:"14px 16px",display:"flex",alignItems:"center",gap:12,position:"sticky",top:0,zIndex:10}}>
          <button onClick={()=>{setSelected(null);setView("event");}} style={{background:"none",border:"none",color:"white",fontSize:24,padding:0,lineHeight:1,cursor:"pointer"}}>‹</button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:17,fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{l.name}</div>
            <div style={{fontSize:12,opacity:.8,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{l.role} · {l.company}</div>
          </div>
          <span style={{background:tc.color,padding:"4px 10px",borderRadius:20,fontSize:10,fontWeight:700}}>{tc.label}</span>
        </div>
        <div style={{padding:14,display:"flex",flexDirection:"column",gap:10}}>
          <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{l.services.map(s=><SvT key={s} s={s}/>)}</div>
          <Cd t="POR QUE ABORDAR" c="#00897B">{l.why}</Cd>
          <Cd t="PITCH" c={activeEvent?.color||"#E65100"}><i>&ldquo;{l.pitch}&rdquo;</i></Cd>
          <Cd t="QUEBRA-GELO" c="#1565C0"><i>&ldquo;{l.icebreaker}&rdquo;</i></Cd>
          {ex.length>0&&<Cd t={`REGISTROS (${ex.length})`} c="#2E7D32">{ex.map((g,i)=><div key={i} style={{borderLeft:"3px solid #2E7D32",paddingLeft:10,marginBottom:i<ex.length-1?10:0}}>
            <div style={{fontSize:11,color:"#888"}}><b>{g.by}</b> · {new Date(g.time).toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"})}</div>
            <div style={{fontSize:13,color:"#333",marginTop:2}}>{g.note}</div>
            <div style={{display:"flex",gap:10,marginTop:3,fontSize:11}}><span style={{color:"#E65100"}}>{"★".repeat(g.interest)}{"☆".repeat(5-g.interest)}</span>{g.nextStep&&<span style={{color:"#1565C0"}}>→ {g.nextStep}</span>}</div>
          </div>)}</Cd>}
          <div style={{background:"white",borderRadius:14,padding:14,boxShadow:"0 1px 4px rgba(0,0,0,0.05)"}}>
            <div style={{fontSize:11,fontWeight:700,color:"#C62828",textTransform:"uppercase",letterSpacing:.5,marginBottom:10}}>Registrar conversa</div>
            <textarea value={noteText} onChange={e=>setNoteText(e.target.value)} placeholder="O que conversaram?..." style={{width:"100%",padding:12,border:"2px solid #f0f0f0",borderRadius:12,fontSize:14,minHeight:70,resize:"vertical",outline:"none",fontFamily:"inherit",boxSizing:"border-box"}} />
            <div style={{marginTop:10}}><div style={{fontSize:11,color:"#888",marginBottom:6}}>Interesse:</div>
              <div style={{display:"flex",gap:6}}>{[1,2,3,4,5].map(n=><button key={n} onClick={()=>setInterest(n)} style={{flex:1,height:40,borderRadius:10,border:interest===n?"2px solid #003366":"2px solid #f0f0f0",background:interest===n?"#003366":"white",color:interest===n?"white":"#333",fontSize:15,fontWeight:700,cursor:"pointer"}}>{n}</button>)}</div></div>
            <div style={{marginTop:10}}><div style={{fontSize:11,color:"#888",marginBottom:6}}>Próximo passo:</div>
              <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{["Reunião","WhatsApp","Draper House","Proposta","Sem interesse"].map(s=><button key={s} onClick={()=>setNextStep(nextStep===s?"":s)} style={{padding:"7px 12px",borderRadius:20,border:nextStep===s?"2px solid #003366":"2px solid #f0f0f0",background:nextStep===s?"#003366":"white",color:nextStep===s?"white":"#444",fontSize:12,fontWeight:600,cursor:"pointer"}}>{s}</button>)}</div></div>
            <button onClick={doLog} disabled={!noteText.trim()} style={{width:"100%",marginTop:14,padding:14,background:noteText.trim()?"#00B8A9":"#ddd",color:"white",border:"none",borderRadius:12,fontSize:16,fontWeight:700,cursor:"pointer"}}>Salvar ✓</button>
          </div>
        </div><div style={{height:30}}/>
      </Sh>
    );
  }

  // EVENT LIST
  if (view === "event" && activeEvent) {
    const evL = LEADS[activeEvent.id] || [];
    const fil = evL.filter(l=>{const q=search.toLowerCase();return(!q||l.name.toLowerCase().includes(q)||l.company.toLowerCase().includes(q)||l.segment.toLowerCase().includes(q))&&(tierFilter===0||l.tier===tierFilter)&&(statusFilter==="all"||(statusFilter==="done"&&logs[l.id]?.length>0)||(statusFilter==="pending"&&!logs[l.id]?.length))&&(!svcFilter||l.services.includes(svcFilter));});
    const s={total:evL.length,done:evL.filter(l=>logs[l.id]?.length>0).length,t1:evL.filter(l=>l.tier===1).length,t1d:evL.filter(l=>l.tier===1&&logs[l.id]?.length>0).length,t2:evL.filter(l=>l.tier===2).length,t2d:evL.filter(l=>l.tier===2&&logs[l.id]?.length>0).length,t3:evL.filter(l=>l.tier===3).length,t3d:evL.filter(l=>l.tier===3&&logs[l.id]?.length>0).length};
    return (
      <Sh>
        <div style={{background:activeEvent.color,color:"white",padding:"14px 16px",position:"sticky",top:0,zIndex:10}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <button onClick={()=>setView("home")} style={{background:"none",border:"none",color:"white",fontSize:22,padding:0,cursor:"pointer",lineHeight:1}}>‹</button>
              <div><div style={{fontSize:16,fontWeight:700}}>{activeEvent.name}</div><div style={{fontSize:11,opacity:.8}}>{fmtD(activeEvent.date)} — {fmtD(activeEvent.endDate)}</div></div>
            </div>
            <button onClick={fetchLogs} style={sBtn}>↻</button>
          </div>
          <button onClick={()=>setShowStrategy(!showStrategy)} style={{marginTop:8,background:"rgba(255,255,255,0.15)",border:"none",color:"white",borderRadius:8,padding:"6px 12px",fontSize:11,fontWeight:600,cursor:"pointer",width:"100%"}}>{showStrategy?"▲ Esconder":"▼ Estratégia"}</button>
          {showStrategy&&<div style={{marginTop:8,background:"rgba(255,255,255,0.1)",borderRadius:10,padding:12,fontSize:12,lineHeight:1.5}}>{activeEvent.strategy}</div>}
          <div style={{display:"flex",gap:6,marginTop:10}}>{[{l:"TOTAL",v:`${s.done}/${s.total}`,b:"rgba(255,255,255,0.1)"},{l:"T1",v:`${s.t1d}/${s.t1}`,b:"rgba(46,125,50,0.25)"},{l:"T2",v:`${s.t2d}/${s.t2}`,b:"rgba(230,81,0,0.25)"},{l:"T3",v:`${s.t3d}/${s.t3}`,b:"rgba(21,101,192,0.25)"}].map(x=><div key={x.l} style={{flex:1,background:x.b,borderRadius:10,padding:"6px 8px",textAlign:"center"}}><div style={{fontSize:16,fontWeight:800}}>{x.v}</div><div style={{fontSize:9,opacity:.7,fontWeight:600}}>{x.l}</div></div>)}</div>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Buscar..." style={{width:"100%",padding:10,border:"none",borderRadius:12,fontSize:14,marginTop:10,outline:"none",background:"rgba(255,255,255,0.95)",boxSizing:"border-box"}} />
          <div style={{display:"flex",gap:5,marginTop:8,overflowX:"auto",paddingBottom:2}}>{[{v:0,l:"Todos"},{v:1,l:"Tier 1"},{v:2,l:"Tier 2"},{v:3,l:"Tier 3"}].map(f=><Pl key={f.v} a={tierFilter===f.v} o={()=>setTierFilter(f.v)} c="#00B8A9">{f.l}</Pl>)}<div style={{width:1,background:"rgba(255,255,255,0.2)",flexShrink:0}}/>{[{v:"all",l:"Todos"},{v:"pending",l:"⏳"},{v:"done",l:"✅"}].map(f=><Pl key={f.v} a={statusFilter===f.v} o={()=>setStatusFilter(f.v)} c="#FFD700" d>{f.l}</Pl>)}</div>
          <div style={{display:"flex",gap:4,marginTop:6,overflowX:"auto",paddingBottom:4}}>{["","LDFS","SL-IN","SL-OUT","IP","W3","DH"].map(x=><Pl key={x} a={svcFilter===x} o={()=>setSvcFilter(svcFilter===x?"":x)} c={SVC_COLORS[x]||"rgba(255,255,255,0.3)"}>{x||"Serviço"}</Pl>)}</div>
        </div>
        <div style={{padding:"8px 12px"}}>
          <div style={{fontSize:11,color:"#888",marginBottom:6,fontWeight:600}}>{fil.length} leads</div>
          {fil.map(l=>{const hl=logs[l.id]?.length>0,last=hl?logs[l.id][logs[l.id].length-1]:null,tc=TIER_CONFIG[l.tier];return(
            <div key={l.id} onClick={()=>{setSelected(l);setView("detail");}} style={{background:"white",borderRadius:14,padding:14,marginBottom:8,boxShadow:"0 1px 4px rgba(0,0,0,0.04)",borderLeft:`4px solid ${tc.color}`,opacity:hl?.7:1,position:"relative",cursor:"pointer"}}>
              {hl&&<div style={{position:"absolute",top:12,right:12,fontSize:14}}>✅</div>}
              <div style={{fontSize:15,fontWeight:700,color:"#003366",paddingRight:hl?24:0}}>{l.name}</div>
              <div style={{fontSize:12,color:"#666",marginTop:1}}>{l.role} · <b>{l.company}</b></div>
              <div style={{display:"flex",gap:4,marginTop:6,flexWrap:"wrap"}}>{l.services.map(x=><SvT key={x} s={x}/>)}<span style={{background:tc.bg,color:tc.color,padding:"2px 8px",borderRadius:8,fontSize:10,fontWeight:700}}>{tc.label}</span></div>
              {hl&&last&&<div style={{marginTop:8,paddingTop:7,borderTop:"1px solid #f5f5f5",fontSize:11,color:"#888"}}><b>{last.by}</b>: {last.note.length>50?last.note.substring(0,50)+"...":last.note}{last.nextStep&&<span style={{color:"#1565C0",marginLeft:4}}>→ {last.nextStep}</span>}</div>}
            </div>
          );})}
          {fil.length===0&&<div style={{textAlign:"center",color:"#aaa",padding:40,fontSize:14}}>Nenhum lead</div>}
        </div><div style={{height:30}}/>
      </Sh>
    );
  }
  return null;
}

function Sh({children}){return<div style={{fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",background:"#f7f7f8",minHeight:"100vh",maxWidth:480,margin:"0 auto"}}>{children}</div>;}
function Ctr({children}){return<div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"100vh",padding:24,background:"#f7f7f8",fontFamily:"-apple-system,sans-serif"}}>{children}</div>;}
function ST({children}){return<div style={{fontSize:13,fontWeight:700,color:"#888",textTransform:"uppercase",letterSpacing:.5,marginTop:8,marginBottom:8}}>{children}</div>;}
function Cd({t,c,children}){return<div style={{background:"white",borderRadius:14,padding:14,boxShadow:"0 1px 4px rgba(0,0,0,0.05)"}}><div style={{fontSize:11,fontWeight:700,color:c,textTransform:"uppercase",letterSpacing:.5,marginBottom:6}}>{t}</div><div style={{fontSize:13,color:"#333",lineHeight:1.6}}>{children}</div></div>;}
function SvT({s}){return<span style={{background:SVC_COLORS[s]||"#999",color:"white",padding:"2px 8px",borderRadius:8,fontSize:10,fontWeight:600}}>{s}</span>;}
function Pl({a,o,c,d,children}){return<button onClick={o} style={{padding:"5px 12px",borderRadius:20,border:"none",fontSize:11,fontWeight:700,whiteSpace:"nowrap",cursor:"pointer",background:a?c:"rgba(255,255,255,0.15)",color:a?(d?"#333":"white"):"rgba(255,255,255,0.7)"}}>{children}</button>;}
function EvCard({ev,stats,onOpen,fmt,past}){const d=Math.ceil((new Date(ev.date)-new Date())/864e5);return(
  <div onClick={onOpen} style={{background:"white",borderRadius:16,padding:16,marginBottom:10,boxShadow:"0 2px 8px rgba(0,0,0,0.06)",cursor:"pointer",borderLeft:`5px solid ${ev.color}`,opacity:past?.75:1}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
      <div style={{flex:1}}><div style={{fontSize:16,fontWeight:700,color:"#003366"}}>{ev.name}</div><div style={{fontSize:12,color:"#666",marginTop:2}}>{fmt(ev.date)} — {fmt(ev.endDate)} · {ev.location.split(",")[0]}</div></div>
      {!past&&d>=0&&<div style={{background:ev.color,color:"white",borderRadius:10,padding:"4px 10px",fontSize:11,fontWeight:700,whiteSpace:"nowrap"}}>{d===0?"HOJE":d===1?"AMANHÃ":`${d}d`}</div>}
      {past&&<div style={{background:"#eee",color:"#888",borderRadius:10,padding:"4px 10px",fontSize:11,fontWeight:700}}>Encerrado</div>}
    </div>
    <div style={{fontSize:12,color:"#888",marginTop:8,lineHeight:1.4}}>{ev.description.length>120?ev.description.substring(0,120)+"...":ev.description}</div>
    <div style={{display:"flex",gap:8,marginTop:10}}>
      <div style={{background:"#f0f0f0",borderRadius:8,padding:"4px 10px",fontSize:12}}><b>{stats.done}</b><span style={{color:"#888"}}>/{stats.total} leads</span></div>
      {stats.done>0&&<div style={{background:"#E8F5E9",borderRadius:8,padding:"4px 10px",fontSize:12,color:"#2E7D32",fontWeight:600}}>{Math.round(stats.done/stats.total*100)}%</div>}
    </div>
  </div>
);}
const sBtn={background:"rgba(255,255,255,0.15)",border:"none",color:"white",borderRadius:8,padding:"5px 10px",fontSize:12,fontWeight:600,cursor:"pointer"};
