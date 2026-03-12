"use client";
import { useState, useEffect, useCallback } from "react";
import { LEADS, TIER_CONFIG, SVC_COLORS } from "../data/leads";

export default function Home() {
  const [logs, setLogs] = useState({});
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

  // Load data on mount
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("lawi-crm-user") : null;
    if (stored) setUserName(stored);
    else setNameMode(true);
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch("/api/logs");
      if (res.ok) { const data = await res.json(); setLogs(data || {}); }
    } catch (e) {
      // Fallback to localStorage if KV not configured
      try { const local = localStorage.getItem("lawi-crm-logs"); if (local) setLogs(JSON.parse(local)); } catch {}
    }
    setLoading(false);
  };

  const saveLogs = useCallback(async (newLogs) => {
    setSaving(true);
    // Always save to localStorage as backup
    try { localStorage.setItem("lawi-crm-logs", JSON.stringify(newLogs)); } catch {}
    // Try to save to KV
    try {
      await fetch("/api/logs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newLogs) });
    } catch {}
    setSaving(false);
  }, []);

  const doName = () => {
    if (!tmpName.trim()) return;
    setUserName(tmpName.trim());
    setNameMode(false);
    localStorage.setItem("lawi-crm-user", tmpName.trim());
  };

  const doLog = () => {
    if (!selected || !noteText.trim()) return;
    const entry = { by: userName, time: new Date().toISOString(), note: noteText, interest, nextStep };
    const upd = { ...logs, [selected.id]: [...(logs[selected.id] || []), entry] };
    setLogs(upd);
    saveLogs(upd);
    setNoteText(""); setInterest(3); setNextStep(""); setSelected(null);
  };

  const filtered = LEADS.filter(l => {
    const q = search.toLowerCase();
    const ms = !q || l.name.toLowerCase().includes(q) || l.company.toLowerCase().includes(q) || l.segment.toLowerCase().includes(q);
    const mt = tierFilter === 0 || l.tier === tierFilter;
    const hl = logs[l.id]?.length > 0;
    const mst = statusFilter === "all" || (statusFilter === "done" && hl) || (statusFilter === "pending" && !hl);
    const msv = !svcFilter || l.services.includes(svcFilter);
    return ms && mt && mst && msv;
  });

  const st = {
    total: LEADS.length,
    done: Object.keys(logs).filter(k => logs[k]?.length > 0).length,
    t1: LEADS.filter(l => l.tier === 1).length,
    t1d: LEADS.filter(l => l.tier === 1 && logs[l.id]?.length > 0).length,
    t2: LEADS.filter(l => l.tier === 2).length,
    t2d: LEADS.filter(l => l.tier === 2 && logs[l.id]?.length > 0).length,
    t3: LEADS.filter(l => l.tier === 3).length,
    t3d: LEADS.filter(l => l.tier === 3 && logs[l.id]?.length > 0).length,
  };

  if (loading) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", color: "#003366", fontSize: 15 }}>
      Carregando...
    </div>
  );

  if (nameMode) return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", padding: 24, background: "#f7f7f8" }}>
      <div style={{ background: "white", borderRadius: 20, padding: 32, maxWidth: 340, width: "100%", boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}>
        <div style={{ fontSize: 26, fontWeight: 800, color: "#003366" }}>lawi<span style={{ color: "#00B8A9" }}> crm</span></div>
        <div style={{ fontSize: 12, color: "#888", marginTop: 4, marginBottom: 24 }}>Identifique-se para registrar conversas</div>
        <input value={tmpName} onChange={e => setTmpName(e.target.value)} placeholder="Seu primeiro nome"
          onKeyDown={e => e.key === "Enter" && doName()}
          style={{ width: "100%", padding: 14, border: "2px solid #eee", borderRadius: 12, fontSize: 16, outline: "none" }} autoFocus />
        <button onClick={doName} disabled={!tmpName.trim()}
          style={{ width: "100%", marginTop: 14, padding: 14, background: tmpName.trim() ? "#003366" : "#ddd", color: "white", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 700 }}>
          Entrar
        </button>
      </div>
    </div>
  );

  // === DETAIL VIEW ===
  if (selected) {
    const l = selected;
    const ex = logs[l.id] || [];
    const tc = TIER_CONFIG[l.tier];
    return (
      <div style={{ background: "#f7f7f8", minHeight: "100vh", maxWidth: 480, margin: "0 auto" }}>
        <div style={{ background: "#003366", color: "white", padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 10 }}>
          <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: "white", fontSize: 24, padding: 0, lineHeight: 1 }}>‹</button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 17, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.name}</div>
            <div style={{ fontSize: 12, opacity: .8, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.role} · {l.company}</div>
          </div>
          <span style={{ background: tc.color, padding: "4px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700 }}>{tc.label}</span>
        </div>
        <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {l.services.map(s => <span key={s} style={{ background: SVC_COLORS[s] || "#666", color: "white", padding: "3px 10px", borderRadius: 10, fontSize: 11, fontWeight: 600 }}>{s}</span>)}
          </div>
          <Card title="POR QUE ABORDAR" color="#00897B">{l.why}</Card>
          <Card title="PITCH SUGERIDO" color="#E65100"><em>&ldquo;{l.pitch}&rdquo;</em></Card>
          <Card title="PERGUNTA QUEBRA-GELO" color="#1565C0"><em>&ldquo;{l.icebreaker}&rdquo;</em></Card>
          {ex.length > 0 && (
            <Card title={`REGISTROS (${ex.length})`} color="#2E7D32">
              {ex.map((lg, i) => (
                <div key={i} style={{ borderLeft: "3px solid #2E7D32", paddingLeft: 10, marginBottom: i < ex.length - 1 ? 10 : 0 }}>
                  <div style={{ fontSize: 11, color: "#888" }}><strong>{lg.by}</strong> · {new Date(lg.time).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}</div>
                  <div style={{ fontSize: 13, color: "#333", marginTop: 2 }}>{lg.note}</div>
                  <div style={{ display: "flex", gap: 10, marginTop: 3, fontSize: 11 }}>
                    <span style={{ color: "#E65100" }}>{"★".repeat(lg.interest)}{"☆".repeat(5 - lg.interest)}</span>
                    {lg.nextStep && <span style={{ color: "#1565C0" }}>→ {lg.nextStep}</span>}
                  </div>
                </div>
              ))}
            </Card>
          )}
          <div style={{ background: "white", borderRadius: 14, padding: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#C62828", textTransform: "uppercase", letterSpacing: .5, marginBottom: 10 }}>Registrar conversa</div>
            <textarea value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="O que conversaram? Pontos principais..."
              style={{ width: "100%", padding: 12, border: "2px solid #f0f0f0", borderRadius: 12, fontSize: 14, minHeight: 70, resize: "vertical", outline: "none" }} />
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>Interesse:</div>
              <div style={{ display: "flex", gap: 6 }}>
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} onClick={() => setInterest(n)}
                    style={{ flex: 1, height: 40, borderRadius: 10, border: interest === n ? "2px solid #003366" : "2px solid #f0f0f0", background: interest === n ? "#003366" : "white", color: interest === n ? "white" : "#333", fontSize: 15, fontWeight: 700 }}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>Próximo passo:</div>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                {["Reunião", "WhatsApp", "Draper House", "Proposta", "Sem interesse"].map(s => (
                  <button key={s} onClick={() => setNextStep(nextStep === s ? "" : s)}
                    style={{ padding: "7px 12px", borderRadius: 20, border: nextStep === s ? "2px solid #003366" : "2px solid #f0f0f0", background: nextStep === s ? "#003366" : "white", color: nextStep === s ? "white" : "#444", fontSize: 12, fontWeight: 600 }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={doLog} disabled={!noteText.trim()}
              style={{ width: "100%", marginTop: 14, padding: 14, background: noteText.trim() ? "#00B8A9" : "#ddd", color: "white", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 700 }}>
              Salvar ✓
            </button>
          </div>
        </div>
        <div style={{ height: 30 }} />
      </div>
    );
  }

  // === LIST VIEW ===
  return (
    <div style={{ background: "#f7f7f8", minHeight: "100vh", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ background: "#003366", color: "white", padding: "14px 16px", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div><span style={{ fontSize: 22, fontWeight: 800 }}>lawi</span><span style={{ fontSize: 12, color: "#00B8A9", marginLeft: 6, fontWeight: 700 }}>crm</span></div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {saving && <span style={{ fontSize: 10, color: "#FFD700", fontWeight: 600 }}>salvando...</span>}
            <button onClick={fetchLogs} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "white", borderRadius: 8, padding: "5px 10px", fontSize: 12, fontWeight: 600 }}>↻</button>
            <span style={{ fontSize: 12, opacity: .7 }}>{userName}</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
          {[
            { k: "total", l: "TOTAL", v: `${st.done}/${st.total}`, bg: "rgba(255,255,255,0.1)" },
            { k: "t1", l: "T1", v: `${st.t1d}/${st.t1}`, bg: "rgba(46,125,50,0.25)" },
            { k: "t2", l: "T2", v: `${st.t2d}/${st.t2}`, bg: "rgba(230,81,0,0.25)" },
            { k: "t3", l: "T3", v: `${st.t3d}/${st.t3}`, bg: "rgba(21,101,192,0.25)" },
          ].map(s => (
            <div key={s.k} style={{ flex: 1, background: s.bg, borderRadius: 10, padding: "6px 8px", textAlign: "center" }}>
              <div style={{ fontSize: 17, fontWeight: 800 }}>{s.v}</div>
              <div style={{ fontSize: 9, opacity: .7, fontWeight: 600 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Buscar nome, empresa, segmento..."
          style={{ width: "100%", padding: 11, border: "none", borderRadius: 12, fontSize: 14, marginTop: 10, outline: "none", background: "rgba(255,255,255,0.95)" }} />
        <div style={{ display: "flex", gap: 5, marginTop: 8, overflowX: "auto", paddingBottom: 2 }}>
          {[{ v: 0, l: "Todos" }, { v: 1, l: "Tier 1" }, { v: 2, l: "Tier 2" }, { v: 3, l: "Tier 3" }].map(f => (
            <button key={f.v} onClick={() => setTierFilter(f.v)}
              style={{ padding: "5px 12px", borderRadius: 20, border: "none", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap", background: tierFilter === f.v ? "#00B8A9" : "rgba(255,255,255,0.15)", color: tierFilter === f.v ? "white" : "rgba(255,255,255,0.7)" }}>
              {f.l}
            </button>
          ))}
          <div style={{ width: 1, background: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
          {[{ v: "all", l: "Todos" }, { v: "pending", l: "⏳" }, { v: "done", l: "✅" }].map(f => (
            <button key={f.v} onClick={() => setStatusFilter(f.v)}
              style={{ padding: "5px 12px", borderRadius: 20, border: "none", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap", background: statusFilter === f.v ? "#FFD700" : "rgba(255,255,255,0.15)", color: statusFilter === f.v ? "#333" : "rgba(255,255,255,0.7)" }}>
              {f.l}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 4, marginTop: 6, overflowX: "auto", paddingBottom: 4 }}>
          {["", "LDFS", "SL-IN", "SL-OUT", "IP", "W3", "DH"].map(s => (
            <button key={s} onClick={() => setSvcFilter(svcFilter === s ? "" : s)}
              style={{ padding: "4px 10px", borderRadius: 16, border: "none", fontSize: 10, fontWeight: 700, whiteSpace: "nowrap", background: svcFilter === s ? (SVC_COLORS[s] || "rgba(255,255,255,0.3)") : "rgba(255,255,255,0.1)", color: svcFilter === s ? "white" : "rgba(255,255,255,0.6)" }}>
              {s || "Serviço"}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: "8px 12px" }}>
        <div style={{ fontSize: 11, color: "#888", marginBottom: 6, fontWeight: 600 }}>{filtered.length} leads</div>
        {filtered.map(l => {
          const hl = logs[l.id]?.length > 0;
          const last = hl ? logs[l.id][logs[l.id].length - 1] : null;
          const tc = TIER_CONFIG[l.tier];
          return (
            <div key={l.id} onClick={() => setSelected(l)}
              style={{ background: "white", borderRadius: 14, padding: 14, marginBottom: 8, boxShadow: "0 1px 4px rgba(0,0,0,0.04)", borderLeft: `4px solid ${tc.color}`, opacity: hl ? .75 : 1, position: "relative" }}>
              {hl && <div style={{ position: "absolute", top: 12, right: 12, fontSize: 14 }}>✅</div>}
              <div style={{ fontSize: 15, fontWeight: 700, color: "#003366", paddingRight: hl ? 24 : 0 }}>{l.name}</div>
              <div style={{ fontSize: 12, color: "#666", marginTop: 1 }}>{l.role} · <strong>{l.company}</strong></div>
              <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
                {l.services.map(s => <span key={s} style={{ background: SVC_COLORS[s] || "#999", color: "white", padding: "2px 8px", borderRadius: 8, fontSize: 10, fontWeight: 600 }}>{s}</span>)}
                <span style={{ background: tc.bg, color: tc.color, padding: "2px 8px", borderRadius: 8, fontSize: 10, fontWeight: 700 }}>{tc.label}</span>
              </div>
              {hl && last && (
                <div style={{ marginTop: 8, paddingTop: 7, borderTop: "1px solid #f5f5f5", fontSize: 11, color: "#888" }}>
                  <strong>{last.by}</strong>: {last.note.length > 55 ? last.note.substring(0, 55) + "..." : last.note}
                  {last.nextStep && <span style={{ color: "#1565C0", marginLeft: 4 }}>→ {last.nextStep}</span>}
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && <div style={{ textAlign: "center", color: "#aaa", padding: 40, fontSize: 14 }}>Nenhum lead encontrado</div>}
      </div>
      <div style={{ height: 30 }} />
    </div>
  );
}

function Card({ title, color, children }) {
  return (
    <div style={{ background: "white", borderRadius: 14, padding: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: .5, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 13, color: "#333", lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}
