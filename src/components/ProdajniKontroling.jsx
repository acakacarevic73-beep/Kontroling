import { 
  ResponsiveContainer, ComposedChart, LineChart, Line, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine 
} from "recharts";
import { C } from "../lib/designTokens";
import { fmt, fmtK } from "../utils/kontrolingHelpers";
import { KpiCard } from "./KpiCard";

export default function ProdajniKontroling({ monthlyData }) {
  if (!monthlyData.length) return null;
  const last = monthlyData[monthlyData.length - 1];

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500">
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: C.text }}>📈 Prodajni Kontroling</h2>
        <p style={{ fontSize: 12, color: C.muted }}>Pipeline · Kupci · Efikasnost prodajnog tima</p>
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
        <KpiCard label="Novi kupci" plan={last.novi_kupci_p} ostvarenje={last.novi_kupci_o} />
        <KpiCard label="Aktivni kupci" plan={last.aktivni_p} ostvarenje={last.aktivni_o} />
        <KpiCard label="Prodajni ciklus (dana)" plan={last.ciklus_p} ostvarenje={last.ciklus_o} inverted />
        <KpiCard label="ARPA (po kupcu)" plan={0} ostvarenje={Math.round(last.prihodi_o / last.aktivni_o)} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 12 }}>Novi kupci: Plan vs. Ostvarenje</div>
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.dim} vertical={false} />
              <XAxis dataKey="mesec" tick={{fill: C.muted, fontSize: 11}} />
              <YAxis tick={{fill: C.muted, fontSize: 11}} />
              <Tooltip />
              <Bar dataKey="novi_kupci_p" name="Plan" fill={C.dim} radius={[3,3,0,0]} />
              <Bar dataKey="novi_kupci_o" name="Ostvarenje" fill={C.accent} radius={[3,3,0,0]} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 12 }}>Prodajni ciklus (brzina zatvaranja)</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.dim} vertical={false} />
              <XAxis dataKey="mesec" tick={{fill: C.muted, fontSize: 11}} />
              <YAxis unit="d" tick={{fill: C.muted, fontSize: 11}} />
              <Tooltip />
              <ReferenceLine y={28} stroke={C.green} strokeDasharray="4 4" label={{value: "Target", fill: C.green, fontSize: 10}} />
              <Line dataKey="ciklus_o" name="Dana do prodaje" stroke={C.orange} strokeWidth={2} dot={{r:4}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
