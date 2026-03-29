import { C } from "../lib/designTokens";
import { fmt, variance, varColor, varSign } from "../utils/kontrolingHelpers";

export function KpiCard({ label, plan, ostvarenje, unit="", inverted=false, decimals=0 }) {
  const v = variance(plan, ostvarenje);
  const col = varColor(v, inverted, C);
  
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 20px", flex: 1, minWidth: 160 }}>
      <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 800, color: C.text, letterSpacing: "-0.02em" }}>{fmt(ostvarenje, decimals)}{unit}</div>
      <div style={{ display: "flex", gap: 12, marginTop: 8, fontSize: 12 }}>
        <span style={{ color: C.muted }}>Plan: {fmt(plan, decimals)}{unit}</span>
        <span style={{ color: col, fontWeight: 700 }}>{varSign(v)} {Math.abs(v).toFixed(1)}%</span>
      </div>
    </div>
  );
}
