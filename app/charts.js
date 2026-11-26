// Hand-rolled SVG charts for Statistik Indonesia. No library, no network:
// every chart is a string of SVG built from the numbers in data.js.

const PALETTE = ['#1f7a6d', '#c65d21', '#d9a441', '#4a6fa5', '#7ba05b', '#8a5a83', '#b0483e', '#5b8a72'];

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

function niceTicks(max, count = 4) {
  const step = max / count;
  const mag = 10 ** Math.floor(Math.log10(step));
  const norm = step / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const s = nice * mag;
  const out = [];
  for (let v = 0; v <= max + s * 0.001; v += s) out.push(Math.round(v * 100) / 100);
  return out;
}

// Vertical bar chart with a value label on every bar.
export function barChart({ title, labels, values, unit = '', color = 0, height = 260 }) {
  const w = 640;
  const h = height;
  const padL = 46;
  const padB = 34;
  const padT = 14;
  const plotW = w - padL - 16;
  const plotH = h - padT - padB;
  const max = Math.max(...values.map((v) => Math.abs(v))) * 1.12;
  const min = Math.min(0, ...values) * 1.12;
  const range = max - min;
  const y = (v) => padT + plotH - ((v - min) / range) * plotH;
  const zeroY = y(0);
  const slot = plotW / values.length;
  const barW = Math.min(64, slot * 0.62);
  const ticks = niceTicks(max, 4);
  const fill = PALETTE[color % PALETTE.length];
  const bars = values
    .map((v, i) => {
      const x = padL + i * slot + (slot - barW) / 2;
      const top = v >= 0 ? y(v) : zeroY;
      const bh = Math.abs(y(v) - zeroY);
      const label = `${v < 0 ? '−' : ''}${Math.abs(v)}${unit}`;
      return `<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${barW.toFixed(1)}" height="${Math.max(bh, 2).toFixed(1)}" rx="3" fill="${v < 0 ? '#b0483e' : fill}"><title>${esc(labels[i])}: ${label}</title></rect>
<text x="${(x + barW / 2).toFixed(1)}" y="${(top - 6).toFixed(1)}" text-anchor="middle" font-size="13" font-weight="700" fill="#1d2b26">${label}</text>
<text x="${(x + barW / 2).toFixed(1)}" y="${(h - 12).toFixed(1)}" text-anchor="middle" font-size="13" fill="#5c6b64">${esc(labels[i])}</text>`;
    })
    .join('\n');
  const grid = ticks
    .map((t) => `<line x1="${padL}" y1="${y(t).toFixed(1)}" x2="${w - 16}" y2="${y(t).toFixed(1)}" stroke="#e3ddd0" stroke-width="1"/><text x="${padL - 8}" y="${(y(t) + 4).toFixed(1)}" text-anchor="end" font-size="12" fill="#5c6b64">${t}</text>`)
    .join('\n');
  return `<figure class="chart" role="img" aria-label="${esc(title)}">
<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${esc(title)}">
${grid}
<line x1="${padL}" y1="${zeroY.toFixed(1)}" x2="${w - 16}" y2="${zeroY.toFixed(1)}" stroke="#9a938a" stroke-width="1"/>
${bars}
</svg>
<figcaption>${esc(title)}</figcaption>
</figure>`;
}

// Line chart with a dot and a value label on every point.
export function lineChart({ title, labels, values, unit = '', color = 0, height = 260 }) {
  const w = 640;
  const h = height;
  const padL = 46;
  const padB = 34;
  const padT = 22;
  const plotW = w - padL - 16;
  const plotH = h - padT - padB;
  const max = Math.max(...values) * 1.1;
  const min = Math.min(...values) * 0.9;
  const range = max - min || 1;
  const x = (i) => padL + (values.length === 1 ? plotW / 2 : (i / (values.length - 1)) * plotW);
  const y = (v) => padT + plotH - ((v - min) / range) * plotH;
  const stroke = PALETTE[color % PALETTE.length];
  const points = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const ticks = niceTicks(max, 4);
  const grid = ticks
    .map((t) => `<line x1="${padL}" y1="${y(t).toFixed(1)}" x2="${w - 16}" y2="${y(t).toFixed(1)}" stroke="#e3ddd0" stroke-width="1"/><text x="${padL - 8}" y="${(y(t) + 4).toFixed(1)}" text-anchor="end" font-size="12" fill="#5c6b64">${t}</text>`)
    .join('\n');
  const dots = values
    .map((v, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="5" fill="${stroke}" stroke="#fffdf8" stroke-width="2"><title>${esc(labels[i])}: ${v}${unit}</title></circle>
<text x="${x(i).toFixed(1)}" y="${(y(v) - 11).toFixed(1)}" text-anchor="middle" font-size="13" font-weight="700" fill="#1d2b26">${v}${unit}</text>
<text x="${x(i).toFixed(1)}" y="${(h - 12).toFixed(1)}" text-anchor="middle" font-size="13" fill="#5c6b64">${esc(labels[i])}</text>`)
    .join('\n');
  return `<figure class="chart" role="img" aria-label="${esc(title)}">
<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${esc(title)}">
${grid}
<polyline points="${points}" fill="none" stroke="${stroke}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
${dots}
</svg>
<figcaption>${esc(title)}</figcaption>
</figure>`;
}

// Donut chart with a legend that lists every slice and its share.
export function donutChart({ title, parts }) {
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const r = 96;
  const inner = 58;
  const total = parts.reduce((a, p) => a + p.value, 0);
  let angle = -Math.PI / 2;
  const slices = parts
    .map((p, i) => {
      const frac = p.value / total;
      const a0 = angle;
      angle += frac * Math.PI * 2;
      const a1 = angle;
      const large = frac > 0.5 ? 1 : 0;
      const x0 = cx + r * Math.cos(a0);
      const y0 = cy + r * Math.sin(a0);
      const x1 = cx + r * Math.cos(a1);
      const y1 = cy + r * Math.sin(a1);
      const xi1 = cx + inner * Math.cos(a1);
      const yi1 = cy + inner * Math.sin(a1);
      const xi0 = cx + inner * Math.cos(a0);
      const yi0 = cy + inner * Math.sin(a0);
      return `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z" fill="${PALETTE[i % PALETTE.length]}"><title>${esc(p.label)}: ${p.value}%</title></path>`;
    })
    .join('\n');
  const legend = parts
    .map((p, i) => `<li><span class="swatch" style="background:${PALETTE[i % PALETTE.length]}"></span><span class="leg-label">${esc(p.label)}</span><strong>${p.value}%</strong></li>`)
    .join('\n');
  return `<figure class="chart donut-wrap" role="img" aria-label="${esc(title)}">
<svg viewBox="0 0 ${size} ${size}" width="100%" class="donut" role="img" aria-label="${esc(title)}">
${slices}
<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="15" fill="#5c6b64">Total</text>
<text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="20" font-weight="700" fill="#1d2b26">100%</text>
</svg>
<ul class="legend">${legend}</ul>
<figcaption>${esc(title)}</figcaption>
</figure>`;
}

// Horizontal bars, best for shares and age groups.
export function hbarChart({ title, parts, unit = '%', color = 0 }) {
  const w = 640;
  const rowH = 44;
  const h = parts.length * rowH + 46;
  const padL = 170;
  const max = Math.max(...parts.map((p) => p.value));
  const fill = PALETTE[color % PALETTE.length];
  const rows = parts
    .map((p, i) => {
      const y = 14 + i * rowH;
      const bw = ((p.value / max) * (w - padL - 64)).toFixed(1);
      return `<text x="${padL - 10}" y="${y + 19}" text-anchor="end" font-size="14" fill="#1d2b26">${esc(p.label)}</text>
<rect x="${padL}" y="${y}" width="${bw}" height="26" rx="4" fill="${PALETTE[(color + i) % PALETTE.length] || fill}"><title>${esc(p.label)}: ${p.value}${unit}</title></rect>
<text x="${padL + Number(bw) + 8}" y="${y + 19}" font-size="14" font-weight="700" fill="#1d2b26">${p.value}${unit}</text>`;
    })
    .join('\n');
  return `<figure class="chart" role="img" aria-label="${esc(title)}">
<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${esc(title)}">
${rows}
</svg>
<figcaption>${esc(title)}</figcaption>
</figure>`;
}
