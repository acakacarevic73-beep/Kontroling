import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ReferenceLine 
} from "recharts";
import { C } from "../lib/designTokens";
import { variance, varColor, varSign } from "../utils/kontrolingHelpers";

export default function IntegrisaniPregled({ monthlyData }) {
  if (!monthlyData.length) return null;
  const last = monthlyData[monthlyData.length - 1];

  // Matrica međuzavisnosti
  const signals = [
    { label: "Prihodi vs Plan", v: variance(last.prihodi_p, last.prihodi_o), inv: false },
    { label: "EBITDA marža", v: variance(last.ebitda_margin_p, last.ebitda_margin_o), inv: false },
    { label: "Naplata (DSO)", v: variance(last.potrazivanja_p, last.potrazivanja_o), inv: true },
    { label: "Zalihe (DIO)", v: variance(last.zalihe_p, last.zalihe_o), inv: true }
  ];

  const totalScore = signals.reduce((acc, s) => acc + (s.inv ? (s.v <= 0 ? 1 : 0) : (s.v >= 0 ? 1 : 0)), 0);
  const healthColor = totalScore >= 3 ? C.green : totalScore >= 2 ? C.gold : C.red;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-700">
      <div style={{ background: C.card, border: `2px solid ${healthColor}44`, borderRadius: 12, padding: 24, marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase" }}>Ukupni Zdravstveni Skor</div>
            <div style={{ fontSize: 48, fontWeight: 900, color: healthColor }}>{totalScore}/4</div>
          </div>
          <div style={{ maxWidth: 400, textAlign: "right", fontSize: 13, color: C.muted }}>
            Ovaj skor odražava sinergiju između prodaje, operacija i finansija. 
            Zelena boja označava da je biznis u balansu.
          </div>
        </div>
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 12 }}>Trend realizacije plana po ključnim KPI (%)</div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.dim} vertical={false} />
            <XAxis dataKey="mesec" tick={{fill: C.muted, fontSize: 11}} />
            <YAxis unit="%" domain={[70, 130]} tick={{fill: C.muted, fontSize: 11}} />
            <Tooltip />
            <Legend wrapperStyle={{fontSize: 12}} />
            <ReferenceLine y={100} stroke={C.muted} strokeDasharray="6 3" />
            <Line name="Prihodi %" dataKey="prihodi_o" stroke={C.accent} strokeWidth={2} dot={{r:3}} 
                  connectNulls transform={(v, i) => (monthlyData[i].prihodi_o / monthlyData[i].prihodi_p) * 100} />
            <Line name="EBITDA %" dataKey="ebitda_o" stroke={C.gold} strokeWidth={2} dot={{r:3}} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
