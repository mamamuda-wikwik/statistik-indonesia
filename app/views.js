// One renderer per page of Statistik Indonesia. Every page is plain HTML built
// from the figures in data.js; the charts come from charts.js. Each figure is
// followed by its source and year, right where it appears.

import { AGE_GROUPS, GDP_GROWTH, GDP_SECTORS, GDP_SPENDING, HEADLINES, HEALTH_EDUCATION, INFLATION, ISLAND_GROUPS, LATEST, POPULATION_YEARS, POVERTY, PROVINCES, SOURCES, UNEMPLOYMENT } from './data.js';
import { barChart, donutChart, hbarChart, lineChart } from './charts.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const fmt = (n) => n.toLocaleString('en-US');
const fmtPop = (m) => (m >= 10 ? m.toFixed(1) : m.toFixed(2));
const density = (p) => Math.round((p.population * 1000000) / p.area);
const totalPop = PROVINCES.reduce((a, p) => a + p.population, 0);

function sourceLine(text) {
  return `<p class="source">Source: ${esc(text)}</p>`;
}

function pageHead(kicker, title, intro) {
  return `<p class="kicker">${esc(kicker)}</p>
<h1>${esc(title)}</h1>
<p class="lede">${intro}</p>`;
}

export function overview() {
  const cards = HEADLINES.map(
    (h) => `<article class="card stat">
<h2>${esc(h.label)}</h2>
<p class="big">${esc(h.value)} <span>${esc(h.unit)}</span></p>
<p class="note">${esc(h.note)}</p>
<p class="src">${esc(h.source)}</p>
</article>`,
  ).join('\n');
  const news = LATEST.map(
    (n) => `<li><strong>${esc(n.date)}</strong> — ${esc(n.text)} <span class="src">${esc(n.source)}</span></li>`,
  ).join('\n');
  return `${pageHead('Indonesia at a glance', 'Statistik Indonesia', 'The headline numbers of the world’s fourth most populous country — its people, its economy, its prices and its jobs — each with the source and the year it comes from.')}
<section class="grid stats">${cards}</section>
<div class="two-col">
<section class="panel">
<h2>Population is still growing</h2>
${barChart({ title: 'Population, millions of people', labels: POPULATION_YEARS.map((p) => p.year), values: POPULATION_YEARS.map((p) => p.value), color: 0 })}
${sourceLine('BPS — Statistics Indonesia. 2010 and 2020 are census counts; 2015 and 2024 are mid-year estimates.')}
<p>Indonesia passed 280 million people in 2024. More than half of them — about 56% — live on Java, an island smaller than the province of Central Kalimantan.</p>
<p><a href="#/population">See the full population page &rarr;</a></p>
</section>
<section class="panel">
<h2>Latest releases</h2>
<ul class="news">${news}</ul>
<p><a href="#/about">Where every figure comes from &rarr;</a></p>
</section>
</div>
<div class="two-col">
<section class="panel">
<h2>Growth held above 5%</h2>
${barChart({ title: 'Real GDP growth, % per year', labels: GDP_GROWTH.map((g) => g.year), values: GDP_GROWTH.map((g) => g.value), unit: '%', color: 1 })}
${sourceLine('BPS — Statistics Indonesia, 2024.')}
<p><a href="#/economy">See the full economy page &rarr;</a></p>
</section>
<section class="panel">
<h2>Poverty keeps falling</h2>
${lineChart({ title: 'Poverty rate, % of population (March)', labels: POVERTY.map((p) => p.year), values: POVERTY.map((p) => p.value), unit: '%', color: 2 })}
${sourceLine('BPS — Statistics Indonesia, March 2025. 23.85 million people were poor in March 2025.')}
<p><a href="#/employment">See jobs and poverty &rarr;</a></p>
</section>
</div>`;
}

export function population() {
  return `${pageHead('People', 'Population & demographics', '281.6 million people (BPS, 2024) live across more than 17,000 islands. Indonesia is young — a median age of about 30 — and still urbanising: about 59% of people lived in towns and cities in 2024.')}
<section class="grid stats">
<article class="card stat"><h2>Population</h2><p class="big">281.6 <span>million</span></p><p class="note">Mid-year estimate</p><p class="src">BPS — Statistics Indonesia, 2024</p></article>
<article class="card stat"><h2>Population density</h2><p class="big">149 <span>people / km²</span></p><p class="note">Land area 1.89 million km²</p><p class="src">World Bank, 2023</p></article>
<article class="card stat"><h2>Median age</h2><p class="big">30 <span>years</span></p><p class="note">About half the population is under 30</p><p class="src">United Nations, 2024</p></article>
<article class="card stat"><h2>Urban share</h2><p class="big">58.8 <span>%</span></p><p class="note">People living in urban areas</p><p class="src">World Bank, 2024</p></article>
</section>
<div class="two-col">
<section class="panel">
<h2>Four censuses and an estimate</h2>
${barChart({ title: 'Population, millions of people', labels: POPULATION_YEARS.map((p) => p.year), values: POPULATION_YEARS.map((p) => p.value), color: 0 })}
${sourceLine('BPS — Statistics Indonesia. 2010 and 2020 are census counts; 2015 and 2024 are mid-year estimates.')}
</section>
<section class="panel">
<h2>Where people live</h2>
${hbarChart({ title: 'Share of the population by island group, % (2024)', parts: ISLAND_GROUPS, color: 3 })}
${sourceLine('Worked out from the provincial table on this site; provincial populations are BPS 2024 mid-year estimates.')}
</section>
</div>
<section class="panel">
<h2>A young country, slowly ageing</h2>
${hbarChart({ title: 'Age structure, % of population (2024)', parts: AGE_GROUPS, color: 1 })}
${sourceLine('World Bank, World Development Indicators, 2024.')}
<p>Almost a quarter of Indonesians are children under 15, and only 7.3% are 65 or older — but the older share is rising every year, from 5.0% in 2010.</p>
</section>`;
}

export function economy() {
  return `${pageHead('Money', 'Economy', 'GDP was Rp 22,139 trillion in 2024 — about US$ 1,396 billion — making Indonesia the world’s 16th largest economy. GDP per person was about US$ 4,958 (IMF, 2024).')}
<section class="grid stats">
<article class="card stat"><h2>GDP</h2><p class="big">Rp 22,139 <span>trillion</span></p><p class="note">About US$ 1,396 billion</p><p class="src">BPS — Statistics Indonesia, 2024</p></article>
<article class="card stat"><h2>GDP per person</h2><p class="big">US$ 4,958</p><p class="note">Current prices</p><p class="src">IMF, 2024</p></article>
<article class="card stat"><h2>Growth</h2><p class="big">5.03 <span>%</span></p><p class="note">Real GDP growth</p><p class="src">BPS — Statistics Indonesia, 2024</p></article>
<article class="card stat"><h2>Trade surplus</h2><p class="big">US$ 31 <span>billion</span></p><p class="note">Exports US$ 264.7bn, imports US$ 233.7bn</p><p class="src">BPS — Statistics Indonesia, 2024</p></article>
</section>
<div class="two-col">
<section class="panel">
<h2>Growth, year by year</h2>
<div id="economy-chart">
${barChart({ title: 'Real GDP growth, % per year', labels: GDP_GROWTH.map((g) => g.year), values: GDP_GROWTH.map((g) => g.value), unit: '%', color: 1 })}
</div>
${sourceLine('BPS — Statistics Indonesia. 2020 was the pandemic recession (−2.07%); growth has held at about 5% since 2022.')}
<div class="toggle" role="group" aria-label="Choose the economy chart">
<button type="button" data-chart="growth" class="on">Growth %</button>
<button type="button" data-chart="spending">By spending</button>
</div>
</section>
<section class="panel">
<h2>What the economy makes</h2>
${donutChart({ title: 'GDP by sector, % of GDP (2024)', parts: GDP_SECTORS })}
${sourceLine('BPS — Statistics Indonesia, 2024.')}
</section>
</div>
<section class="panel">
<h2>What the economy spends on</h2>
${hbarChart({ title: 'GDP by spending, % of GDP (2024)', parts: GDP_SPENDING, color: 4 })}
${sourceLine('BPS — Statistics Indonesia, 2024. Approximate shares; household consumption is more than half of GDP.')}
<p>Foreign-exchange reserves stood at US$ 155.7 billion at the end of 2024 — enough to cover more than six months of imports. <span class="src">Bank Indonesia, 2024.</span></p>
</section>`;
}

export function prices() {
  return `${pageHead('Prices', 'Prices &amp; inflation', 'Inflation averaged 1.57% in 2024 — the lowest in years — after the 5.51% spike of 2022. Bank Indonesia targets inflation of 2.5% a year, plus or minus one point.')}
<section class="grid stats">
<article class="card stat"><h2>Inflation 2024</h2><p class="big">1.57 <span>%</span></p><p class="note">Annual average CPI</p><p class="src">BPS — Statistics Indonesia, 2024</p></article>
<article class="card stat"><h2>Inflation target</h2><p class="big">2.5 <span>% ± 1</span></p><p class="note">Bank Indonesia target band</p><p class="src">Bank Indonesia, 2024</p></article>
<article class="card stat"><h2>Poverty line</h2><p class="big">Rp 609,160</p><p class="note">Per person per month, March 2025</p><p class="src">BPS — Statistics Indonesia, 2025</p></article>
<article class="card stat"><h2>Policy rate</h2><p class="big">5.50 <span>%</span></p><p class="note">BI Rate, late 2025</p><p class="src">Bank Indonesia, 2025</p></article>
</section>
<section class="panel">
<h2>Inflation, year by year</h2>
${lineChart({ title: 'Consumer price inflation, % per year', labels: INFLATION.map((p) => p.year), values: INFLATION.map((p) => p.value), unit: '%', color: 1 })}
${sourceLine('BPS — Statistics Indonesia. 2022 spiked on fuel-subsidy cuts and global food prices; by 2024 inflation was back below target.')}
<p>The poverty line — the cost of a minimum basket of food and other essentials — was Rp 609,160 per person per month in March 2025, about Rp 20,300 a day. Three quarters of it (Rp 454,299) is food. <span class="src">BPS, July 2025.</span></p>
</section>`;
}

export function employment() {
  return `${pageHead('Work', 'Employment', 'The labour force was 153.05 million people in February 2025, and 145.77 million of them were working. Open unemployment was 4.76% — the lowest since 1997 — but most jobs are informal: about 58% of workers have no formal contract or protection.')}
<section class="grid stats">
<article class="card stat"><h2>Labour force</h2><p class="big">153.05 <span>million</span></p><p class="note">February 2025</p><p class="src">BPS — Statistics Indonesia, 2025</p></article>
<article class="card stat"><h2>Working</h2><p class="big">145.77 <span>million</span></p><p class="note">7.28 million unemployed</p><p class="src">BPS — Statistics Indonesia, 2025</p></article>
<article class="card stat"><h2>Unemployment</h2><p class="big">4.76 <span>%</span></p><p class="note">Lowest since 1997</p><p class="src">BPS — Statistics Indonesia, Feb 2025</p></article>
<article class="card stat"><h2>Average wage</h2><p class="big">Rp 3.42 <span>million / month</span></p><p class="note">Employees, August 2025</p><p class="src">BPS — Statistics Indonesia, 2025</p></article>
</section>
<div class="two-col">
<section class="panel">
<h2>Unemployment is falling</h2>
${lineChart({ title: 'Open unemployment rate, % of labour force (February)', labels: UNEMPLOYMENT.map((u) => u.year), values: UNEMPLOYMENT.map((u) => u.value), unit: '%', color: 0 })}
${sourceLine('BPS — Statistics Indonesia (Sakernas labour-force survey).')}
</section>
<section class="panel">
<h2>Poverty is falling too</h2>
${lineChart({ title: 'Poverty rate, % of population (March)', labels: POVERTY.map((p) => p.year), values: POVERTY.map((p) => p.value), unit: '%', color: 2 })}
${sourceLine('BPS — Statistics Indonesia. Poverty was 8.47% in March 2025, down from 10.14% in March 2021.')}
</section>
</div>
<section class="panel">
<h2>Read the headline with care</h2>
<p>Unemployment counts only people with no paid work at all — not even one hour in the survey week. In August 2025, 7.91% of workers (11.6 million people) were underemployed: working under 35 hours a week and wanting more work. And 24.77% worked part-time. <span class="src">BPS, 2025.</span></p>
<p>Rural poverty (11.03% in March 2025) runs well above urban poverty (6.73%). The Gini ratio — the standard measure of inequality — was 0.379 in March 2024. <span class="src">BPS, 2024–2025.</span></p>
</section>`;
}

export function health() {
  const cards = HEALTH_EDUCATION.map(
    (h) => `<article class="card stat">
<h2>${esc(h.label)}</h2>
<p class="big">${esc(h.value)}</p>
<p class="note">${esc(h.note)}</p>
<p class="src">${esc(h.source)}</p>
</article>`,
  ).join('\n');
  return `${pageHead('Wellbeing', 'Health &amp; education', 'Indonesians live longer and study longer than a generation ago: life expectancy is 74.2 years and a child starting school today can expect 13.2 years of it. The Human Development Index is 0.728 — high human development.')}
<section class="grid stats">${cards}</section>
<section class="panel">
<h2>What the numbers mean</h2>
<p><strong>Human Development Index 0.728 (UNDP, 2023)</strong> combines health, schooling and income. Indonesia ranks 113th of 193 countries — high human development, but below the East Asia average.</p>
<p><strong>Stunting 19.8% (Ministry of Health, 2024)</strong> — nearly one child under five in five is too short for their age, a marker of chronic undernutrition. It was 21.5% in 2023, so the trend is down, but the government’s target is 14% by 2029.</p>
<p><strong>Schooling 9.0 years on average (BPS, 2024)</strong> — the average Indonesian adult has finished junior high school. The figure rises every year as younger, better-schooled cohorts replace older ones.</p>
</section>`;
}

export function provinceRows(list) {
  return list
    .map((p, i) => `<tr>
<td class="num">${i + 1}</td>
<td><a href="#/province/${p.slug}">${esc(p.name)}</a></td>
<td>${esc(p.capital)}</td>
<td>${esc(p.region)}</td>
<td class="num">${fmtPop(p.population)}</td>
<td class="num">${fmt(p.area)}</td>
<td class="num">${fmt(density(p))}</td>
</tr>`)
    .join('\n');
}

export function provinces() {
  const regions = ['All regions', ...new Set(PROVINCES.map((p) => p.region))];
  const chips = regions
    .map((r, i) => `<button type="button" data-region="${esc(r)}" class="${i === 0 ? 'on' : ''}">${esc(r)}</button>`)
    .join('\n');
  return `${pageHead('Regions', 'Provinces explorer', 'Indonesia has 38 provinces, from Aceh in the west to South Papua in the east. Search the table, sort any column, or filter by island group — then open a province for its own page.')}
<section class="panel">
<div class="controls">
<label class="search">Search provinces
<input id="prov-search" type="search" placeholder="Type a province or capital, e.g. Jawa or Makassar" autocomplete="off">
</label>
<div class="chips" role="group" aria-label="Filter by island group">${chips}</div>
</div>
<p class="result-count" id="prov-count" aria-live="polite">Showing all 38 provinces. Populations are BPS 2024 mid-year estimates (millions); areas are approximate land areas (km²).</p>
<div class="table-wrap">
<table id="prov-table">
<thead><tr>
<th><button type="button" data-sort="rank">#</button></th>
<th><button type="button" data-sort="name">Province</button></th>
<th><button type="button" data-sort="capital">Capital</button></th>
<th><button type="button" data-sort="region">Island group</button></th>
<th><button type="button" data-sort="population">Population (m)</button></th>
<th><button type="button" data-sort="area">Area (km²)</button></th>
<th><button type="button" data-sort="density">Density (/km²)</button></th>
</tr></thead>
<tbody id="prov-body">${provinceRows(PROVINCES)}</tbody>
</table>
</div>
<div class="table-actions">
<button type="button" id="prov-csv">Download this table as CSV</button>
</div>
${sourceLine('Provincial populations: BPS — Statistics Indonesia, 2024 mid-year estimates (rounded; they sum to about 282 million). Areas: approximate land areas.')}
</section>`;
}

export function provinceDetail(slug) {
  const p = PROVINCES.find((x) => x.slug === slug);
  if (!p) return missing();
  const rank = [...PROVINCES].sort((a, b) => b.population - a.population).findIndex((x) => x.slug === slug) + 1;
  const share = ((p.population / totalPop) * 100).toFixed(1);
  const top = [...PROVINCES].sort((a, b) => b.population - a.population).slice(0, 5);
  const neighbours = PROVINCES.filter((x) => x.region === p.region && x.slug !== p.slug).slice(0, 4);
  return `<p><a href="#/provinces">&larr; All provinces</a></p>
<p class="kicker">${esc(p.region)} · Province ${rank} of 38 by population</p>
<h1>${esc(p.name)}</h1>
<p class="lede">Capital ${esc(p.capital)}. ${fmtPop(p.population)} million people live here — ${share}% of Indonesia — on about ${fmt(p.area)} km² of land.</p>
<section class="grid stats">
<article class="card stat"><h2>Population</h2><p class="big">${fmtPop(p.population)} <span>million</span></p><p class="note">Rank ${rank} of 38</p><p class="src">BPS — Statistics Indonesia, 2024</p></article>
<article class="card stat"><h2>Area</h2><p class="big">${fmt(p.area)} <span>km²</span></p><p class="note">Approximate land area</p><p class="src">BPS — Statistics Indonesia, 2024</p></article>
<article class="card stat"><h2>Density</h2><p class="big">${fmt(density(p))} <span>people / km²</span></p><p class="note">National average: 149</p><p class="src">Worked out from BPS figures, 2024</p></article>
<article class="card stat"><h2>Share of Indonesia</h2><p class="big">${share} <span>%</span></p><p class="note">Of 281.6 million people</p><p class="src">BPS — Statistics Indonesia, 2024</p></article>
</section>
<div class="two-col">
<section class="panel">
<h2>Against the five largest provinces</h2>
${hbarChart({ title: 'Population, millions (2024)', parts: top.map((t) => ({ label: t.name, value: t.population })), unit: 'm', color: 0 })}
${sourceLine('BPS — Statistics Indonesia, 2024 mid-year estimates.')}
</section>
<section class="panel">
<h2>Other provinces in ${esc(p.region)}</h2>
<ul class="plain">
${neighbours.map((n) => `<li><a href="#/province/${n.slug}">${esc(n.name)}</a> — ${fmtPop(n.population)} million, capital ${esc(n.capital)}</li>`).join('\n')}
</ul>
<p><a href="#/provinces">Back to the provinces table &rarr;</a></p>
</section>
</div>`;
}

export function about() {
  const list = SOURCES.map(
    (s) => `<li><strong>${esc(s.name)}</strong> — ${esc(s.detail)}</li>`,
  ).join('\n');
  return `${pageHead('About', 'Sources &amp; methods', 'Statistik Indonesia is an independent reference site. It is not affiliated with BPS or any government body, and it copies no other site’s design, text or images.')}
<section class="panel">
<h2>Where every figure comes from</h2>
<ul class="plain sources">${list}</ul>
</section>
<section class="panel">
<h2>How to read the figures</h2>
<p><strong>Years matter.</strong> Every figure carries its year next to it. The newest complete year for most series is 2024; poverty and unemployment are published more often, so their newest figures are from 2025.</p>
<p><strong>Estimates are labelled.</strong> Provincial populations are rounded mid-year estimates from BPS. They sum to about 282 million, a touch above the national 281.6 million, because each province is rounded separately.</p>
<p><strong>Areas are approximate.</strong> Provincial land areas are rounded to the nearest square kilometre from official figures; the six Papuan provinces were redrawn in 2022, so older area figures for Papua will differ.</p>
<p><strong>Nothing here is fetched live.</strong> The site is a set of static files: every number, chart and table is inside it, and it works with no network connection.</p>
</section>
<section class="panel">
<h2>Corrections</h2>
<p>Statistics are revised. When BPS revises a figure, this site’s numbers are updated to the new release and the year is changed with them. Figures were last checked on 26 November 2026.</p>
</section>`;
}

export function missing() {
  return `<p class="kicker">Not found</p>
<h1>There is no page here</h1>
<p class="lede">The address you followed does not match a page of this site. Try one of these instead.</p>
<p><a href="#/">Overview</a> · <a href="#/provinces">Provinces explorer</a> · <a href="#/economy">Economy</a></p>`;
}
