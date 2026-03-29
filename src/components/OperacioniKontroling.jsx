import { 
  ResponsiveContainer, ComposedChart, LineChart, Line, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine 
} from "recharts";
import { C } from "../lib/designTokens";
import { fmtK, varColor } from "../utils/kontrolingHelpers";
import { KpiCard } from "./KpiCard";

export default function OperacioniKontroling({ monthlyData }) {
  if (!monthlyData.length) return null;
  const last = monthlyData[monthlyData.length - 1];

  return (
    <div className="animate-in fade-in duration-500">
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: C.text }}>⚙️ Operacioni Kontroling</h2>
        <p style={{ fontSize: 12, color: C.muted }}>Efikasnost procesa · Working Capital · Zalihe</p>
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
        <KpiCard label="Dana naplate (DSO)" plan={last.potrazivanja_p} ostvarenje={last.potrazivanja_o} inverted decimals={0} />
        <KpiCard label="Dana zaliha (DIO)" plan={last.zalihe_p} ostvarenje={last.zalihe_o} inverted decimals={0} />
        <KpiCard label="COGS / Prihodi" plan={last.prihodi_p ? (last.cogs_p/last.prihodi_p*100) : 0} ostvarenje={last.prihodi_o ? (last.cogs_o/last.prihodi_o*100) : 0} unit="%" decimals={1} inverted />
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 12 }}>Trend naplate i zaliha (u danima)</div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.dim} vertical={false} />
            <XAxis dataKey="mesec" tick={{fill: C.muted, fontSize: 11}} axisLine={false} />
            <YAxis tick={{fill: C.muted, fontSize: 11}} axisLine={false} unit="d" />
            <Tooltip />
            <Legend wrapperStyle={{fontSize: 12}} />
            <Line name="Zalihe (DIO)" dataKey="zalihe_o" stroke={C.gold} strokeWidth={2} dot={{r:4}} />
            <Line name="Potraživanja (DSO)" dataKey="potrazivanja_o" stroke={C.orange} strokeWidth={2} dot={{r:4}} />
            <ReferenceLine y={40} stroke={C.red} strokeDasharray="3 3" label={{value: "Target", fill: C.red, fontSize: 10}} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
