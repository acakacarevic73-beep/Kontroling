import { useState } from "react";
import { C } from "./lib/designTokens";
// Ovde bi importovao module: Financijski, Operacioni, itd.

export default function KontrolingApp() {
  const [tab, setTab] = useState("finansijski");
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header sa novim nazivom */}
      <nav style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "0 32px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 56, maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 32, background: `linear-gradient(135deg,${C.accentD},${C.accent})`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>📊</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.text }}>Kontroling Pro ERP</div>
              <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase" }}>BI & Analytics System</div>
            </div>
          </div>
          {/* Navigacija bi išla ovde */}
        </div>
      </nav>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "32px" }}>
         {/* Renderovanje tabova zavisno od 'tab' state-a */}
         {!loaded ? <Landing onDemo={loadDemo} /> : <DashboardContent tab={tab} />}
      </main>
    </div>
  );
}
