import { 
  ResponsiveContainer, ComposedChart, LineChart, Line, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell 
} from "recharts";
import { C } from "../lib/designTokens";
import { fmt, fmtK, variance, varColor, varSign } from "../utils/kontrolingHelpers";
import { KpiCard } from "./KpiCard";

export default function FinancijskiKontroling({ rows, monthlyData }) {
  if (!monthlyData.length) return null;

  const last = monthlyData[monthlyData.length - 1];
  
  // Podaci za strukturu troškova (Pie Chart)
  const costStructureData = [
    { name: "COGS", value: last.cogs_o, fill: C.red },
    { name: "Tr. prodaje", value: last.prodaja_o, fill: C.orange },
    { name: "OpEx", value: last.opex_o, fill: C.gold },
    { name: "EBITDA", value: last.ebitda_o, fill: C.green },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: C.text }}>💰 Finansijski Kontroling</h2>
        <p style={{ fontSize: 12, color: C.muted }}>P&L analiza · Struktura troškova · Marže</p>
      </div>

      {/* KPI Row */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
        <KpiCard label="Prihodi (mesec)" plan={last.prihodi_p} ostvarenje={last.prihodi_o} />
        <KpiCard label="Bruto marža" plan={last.gross_margin_p} ostvarenje={last.gross_margin_o} unit="%" decimals={1} />
        <KpiCard label="EBITDA" plan={last.ebitda_p} ostvarenje={last.ebitda_o} />
        <KpiCard label="EBITDA marža" plan={last.ebitda_margin_p} ostvarenje={last.ebitda_margin_o} unit="%" decimals={1} />
      </div>

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 16, marginBottom: 24 }}>
        {/* Trend Prihoda i EBITDA */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 12 }}>Trend: Plan vs. Ostvarenje</div>
          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.dim} vertical={false} />
              <XAxis dataKey="mesec" tick={{fill: C.muted, fontSize: 11}} axisLine={false} />
              <YAxis tickFormatter={fmtK} tick={{fill: C.muted, fontSize: 11}} axisLine={false} />
              <Tooltip cursor={{fill: C.surface}} />
              <Bar dataKey="prihodi_p" name="Plan Prihoda" fill={C.dim} radius={[4, 4, 0, 0]} />
              <Bar dataKey="prihodi_o" name="Ostvarenje Prihoda" fill={C.accent} radius={[4, 4, 0, 0]} />
              <Line dataKey="ebitda_o" name="EBITDA" stroke={C.gold} strokeWidth={3} dot={{r: 4, fill: C.gold}} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Struktura troškova */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 12 }}>Struktura troškova (Poslednji mesec)</div>
          <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie data={costStructureData} innerRadius={60} outerRadius={80} dataKey="value" stroke="none">
                  {costStructureData.map((entry, index) => <Cell key={index} fill={entry.fill} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1, paddingLeft: 20 }}>
              {costStructureData.map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 12 }}>
                  <span style={{ color: C.muted }}>{item.name}</span>
                  <span style={{ color: C.text, fontWeight: 700 }}>{fmtK(item.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
