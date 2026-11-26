// The router and the working controls of Statistik Indonesia. Pages are hash
// routes, so every page has an address a link can reach:
//
//   #/                     overview
//   #/population           population & demographics
//   #/economy              economy
//   #/prices               prices & inflation
//   #/employment           employment
//   #/health               health & education
//   #/provinces            provinces explorer
//   #/province/<slug>      one province
//   #/about                sources & methods
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import { GDP_GROWTH, GDP_SPENDING, PROVINCES } from './data.js';
import { barChart, hbarChart } from './charts.js';
import { about, economy, employment, health, missing, overview, population, prices, provinceDetail, provinceRows, provinces } from './views.js';

const app = document.getElementById('app');
const navLinks = [...document.querySelectorAll('nav a[data-route]')];

const TITLES = {
  overview: 'Statistik Indonesia — National Statistics of Indonesia',
  population: 'Population & demographics | Statistik Indonesia',
  economy: 'Economy | Statistik Indonesia',
  prices: 'Prices & inflation | Statistik Indonesia',
  employment: 'Employment | Statistik Indonesia',
  health: 'Health & education | Statistik Indonesia',
  provinces: 'Provinces explorer | Statistik Indonesia',
  about: 'Sources & methods | Statistik Indonesia',
};

// --- Provinces explorer: search, island-group filter, column sort, CSV ---

const densityOf = (p) => (p.population * 1000000) / p.area;
let provQuery = '';
let provRegion = 'All regions';
let provSort = 'rank';
let provDir = 1;

function sortedProvinces() {
  let list = PROVINCES.filter((p) => (provRegion === 'All regions' ? true : p.region === provRegion));
  if (provQuery) {
    const q = provQuery.toLowerCase();
    list = list.filter((p) => p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q));
  }
  if (provSort === 'rank') return list;
  const key = {
    name: (p) => p.name,
    capital: (p) => p.capital,
    region: (p) => p.region,
    population: (p) => p.population,
    area: (p) => p.area,
    density: (p) => densityOf(p),
  }[provSort];
  const ordered = [...list].sort((a, b) => (key(a) < key(b) ? -1 : key(a) > key(b) ? 1 : 0));
  if (provDir === -1) ordered.reverse();
  return ordered;
}

function renderProvinceTable() {
  const body = document.getElementById('prov-body');
  const count = document.getElementById('prov-count');
  if (!body) return;
  const list = sortedProvinces();
  body.innerHTML = provinceRows(list);
  count.textContent = list.length === PROVINCES.length
    ? `Showing all ${PROVINCES.length} provinces. Populations are BPS 2024 mid-year estimates (millions); areas are approximate land areas (km²).`
    : `Showing ${list.length} of ${PROVINCES.length} provinces.`;
}

function wireProvinces() {
  const search = document.getElementById('prov-search');
  if (!search) return;
  search.addEventListener('input', () => {
    provQuery = search.value.trim();
    renderProvinceTable();
  });
  document.querySelectorAll('.chips button').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.chips button').forEach((b) => b.classList.remove('on'));
      btn.classList.add('on');
      provRegion = btn.dataset.region;
      renderProvinceTable();
    });
  });
  document.querySelectorAll('#prov-table thead button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const sort = btn.dataset.sort;
      if (provSort === sort) {
        provDir = -provDir;
      } else {
        provSort = sort;
        provDir = 1;
      }
      renderProvinceTable();
    });
  });
  const csvBtn = document.getElementById('prov-csv');
  if (csvBtn) {
    csvBtn.addEventListener('click', () => {
      const rows = [['Province', 'Capital', 'Island group', 'Population (millions, 2024)', 'Area (km2)', 'Density (per km2)']];
      for (const p of PROVINCES) rows.push([p.name, p.capital, p.region, p.population, p.area, Math.round(densityOf(p))]);
      const csv = rows.map((r) => r.map((c) => `"${String(c).replaceAll('"', '""')}"`).join(',')).join('\n');
      const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'indonesia-provinces-2024.csv';
      a.click();
      URL.revokeObjectURL(url);
    });
  }
}

// --- Economy page: swap the growth chart for the spending chart ---

function wireEconomy() {
  const box = document.getElementById('economy-chart');
  if (!box) return;
  document.querySelectorAll('.toggle button').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.toggle button').forEach((b) => b.classList.remove('on'));
      btn.classList.add('on');
      if (btn.dataset.chart === 'spending') {
        box.innerHTML = hbarChart({ title: 'GDP by spending, % of GDP (2024)', parts: GDP_SPENDING, color: 4 });
      } else {
        box.innerHTML = barChart({ title: 'Real GDP growth, % per year', labels: GDP_GROWTH.map((g) => g.year), values: GDP_GROWTH.map((g) => g.value), unit: '%', color: 1 });
      }
    });
  });
}

// --- Router ---

function render() {
  window.__shotReady = false;
  const hash = location.hash || '#/';
  const provinceMatch = hash.match(/^#\/province\/([^/?]+)/);
  let html;
  let key = 'overview';
  if (provinceMatch) {
    html = provinceDetail(decodeURIComponent(provinceMatch[1]));
    key = 'provinces';
  } else if (hash === '#/population') {
    html = population();
    key = 'population';
  } else if (hash === '#/economy') {
    html = economy();
    key = 'economy';
  } else if (hash === '#/prices') {
    html = prices();
    key = 'prices';
  } else if (hash === '#/employment') {
    html = employment();
    key = 'employment';
  } else if (hash === '#/health') {
    html = health();
    key = 'health';
  } else if (hash === '#/provinces') {
    html = provinces();
    key = 'provinces';
  } else if (hash === '#/about') {
    html = about();
    key = 'about';
  } else if (hash === '#/' || hash === '') {
    html = overview();
    key = 'overview';
  } else {
    html = missing();
    key = 'overview';
  }
  document.title = TITLES[key] ?? TITLES.overview;
  app.innerHTML = html;
  for (const link of navLinks) link.setAttribute('aria-current', link.dataset.route === key ? 'page' : 'false');
  wireProvinces();
  wireEconomy();
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener('hashchange', render);
render();
