export const fmt = (n, dec=0) => n === undefined || n === null ? "—" : new Intl.NumberFormat("sr-RS", {minimumFractionDigits:dec,maximumFractionDigits:dec}).format(n);

export const fmtK = n => {
  const absN = Math.abs(n);
  if (absN >= 1000000) return `${(n/1000000).toFixed(1)}M`;
  if (absN >= 1000) return `${(n/1000).toFixed(0)}K`;
  return n;
};

export const variance = (p, o) => p ? ((o - p) / p * 100) : 0;

export const varColor = (v, inv = false, colors) => {
  const pos = inv ? v < 0 : v > 0;
  return pos ? colors.green : v === 0 ? colors.muted : colors.red;
};

export const varSign = v => v > 0 ? "▲" : v < 0 ? "▼" : "—";

