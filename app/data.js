// The figures behind Statistik Indonesia. Every number here is a published figure
// from Statistics Indonesia (BPS), the World Bank, the IMF or the UNDP, and each
// page of the site names the source and the year next to the figure. Provincial
// populations are rounded BPS 2024 mid-year estimates; areas are approximate
// land areas in square kilometres.

export const SITE = {
  name: 'Statistik Indonesia',
  tagline: 'The numbers of Indonesia, in one place.',
  updated: 'Figures checked 26 November 2026. Sources: BPS — Statistics Indonesia, World Bank, IMF, UNDP.',
};

// Headline cards on the overview page. value is shown big, unit small.
export const HEADLINES = [
  { label: 'Population', value: '281.6', unit: 'million people', note: 'Mid-year estimate, 2024', source: 'BPS — Statistics Indonesia, 2024' },
  { label: 'Gross domestic product', value: 'Rp 22,139', unit: 'trillion', note: 'Current prices, 2024', source: 'BPS — Statistics Indonesia, 2024' },
  { label: 'Economic growth', value: '5.03', unit: '% per year', note: 'Real GDP growth, 2024', source: 'BPS — Statistics Indonesia, 2024' },
  { label: 'Inflation', value: '1.57', unit: '% per year', note: 'Consumer prices, 2024', source: 'BPS — Statistics Indonesia, 2024' },
  { label: 'Unemployment', value: '4.76', unit: '% of labour force', note: 'February 2025', source: 'BPS — Statistics Indonesia, 2025' },
  { label: 'Poverty rate', value: '8.47', unit: '% of population', note: '23.85 million people, March 2025', source: 'BPS — Statistics Indonesia, 2025' },
];

// Population at census and estimate years (millions). 2010 and 2020 are census
// counts; 2015 and 2024 are BPS mid-year estimates.
export const POPULATION_YEARS = [
  { year: '2010', value: 237.6 },
  { year: '2015', value: 255.6 },
  { year: '2020', value: 270.2 },
  { year: '2024', value: 281.6 },
];

// Age structure of the population, 2024 (share of total population).
export const AGE_GROUPS = [
  { label: '0–14 years', value: 24.6 },
  { label: '15–64 years', value: 68.1 },
  { label: '65 years and over', value: 7.3 },
];

// Share of the population by island group, 2024, worked out from the
// provincial table in this file.
export const ISLAND_GROUPS = [
  { label: 'Java', value: 55.6 },
  { label: 'Sumatra', value: 21.7 },
  { label: 'Sulawesi', value: 7.4 },
  { label: 'Kalimantan', value: 6.3 },
  { label: 'Bali & Nusa Tenggara', value: 5.6 },
  { label: 'Maluku', value: 1.2 },
  { label: 'Papua', value: 2.2 },
];

// Real GDP growth, % per year.
export const GDP_GROWTH = [
  { year: '2020', value: -2.07 },
  { year: '2021', value: 3.7 },
  { year: '2022', value: 5.31 },
  { year: '2023', value: 5.05 },
  { year: '2024', value: 5.03 },
];

// GDP by sector, % of GDP, 2024.
export const GDP_SECTORS = [
  { label: 'Manufacturing', value: 18.7 },
  { label: 'Wholesale & retail trade', value: 13.0 },
  { label: 'Agriculture, forestry & fishing', value: 12.5 },
  { label: 'Construction', value: 9.9 },
  { label: 'Mining & quarrying', value: 8.4 },
  { label: 'All other sectors', value: 37.5 },
];

// GDP by spending, % of GDP, 2024 (approximate shares).
export const GDP_SPENDING = [
  { label: 'Household consumption', value: 54.0 },
  { label: 'Investment', value: 29.0 },
  { label: 'Government spending', value: 8.0 },
  { label: 'Exports minus imports', value: 2.0 },
  { label: 'Other', value: 7.0 },
];

// Consumer price inflation, annual average, % per year.
export const INFLATION = [
  { year: '2020', value: 1.68 },
  { year: '2021', value: 1.87 },
  { year: '2022', value: 5.51 },
  { year: '2023', value: 2.61 },
  { year: '2024', value: 1.57 },
];

// Open unemployment rate, February of each year, % of labour force.
export const UNEMPLOYMENT = [
  { year: '2021', value: 6.26 },
  { year: '2022', value: 5.83 },
  { year: '2023', value: 5.45 },
  { year: '2024', value: 4.82 },
  { year: '2025', value: 4.76 },
];

// Poverty rate, March of each year, % of population.
export const POVERTY = [
  { year: '2021', value: 10.14 },
  { year: '2022', value: 9.54 },
  { year: '2023', value: 9.36 },
  { year: '2024', value: 9.03 },
  { year: '2025', value: 8.47 },
];

// Health and education indicators.
export const HEALTH_EDUCATION = [
  { label: 'Human Development Index', value: '0.728', note: 'High human development', source: 'UNDP, 2023' },
  { label: 'Life expectancy at birth', value: '74.2 years', note: 'Up from 71.4 years in 2010', source: 'BPS — Statistics Indonesia, 2024' },
  { label: 'Mean years of schooling', value: '9.0 years', note: 'Population aged 25 and over', source: 'BPS — Statistics Indonesia, 2024' },
  { label: 'Expected years of schooling', value: '13.2 years', note: 'A child starting school today', source: 'BPS — Statistics Indonesia, 2024' },
  { label: 'Stunting in children under 5', value: '19.8%', note: 'Down from 21.5% in 2023', source: 'Ministry of Health (SSGI), 2024' },
  { label: 'Hospital beds', value: '1.4', note: 'Beds per 1,000 people', source: 'World Bank, 2024' },
  { label: 'Physicians', value: '0.5', note: 'Doctors per 1,000 people', source: 'World Bank, 2024' },
  { label: 'Fertility rate', value: '2.1', note: 'Births per woman', source: 'World Bank, 2023' },
];

// The 38 provinces. Population is the rounded BPS 2024 mid-year estimate in
// millions; area is the approximate land area in square kilometres.
export const PROVINCES = [
  { slug: 'aceh', name: 'Aceh', capital: 'Banda Aceh', region: 'Sumatra', population: 5.55, area: 57956 },
  { slug: 'sumatera-utara', name: 'North Sumatra', capital: 'Medan', region: 'Sumatra', population: 15.59, area: 72981 },
  { slug: 'sumatera-barat', name: 'West Sumatra', capital: 'Padang', region: 'Sumatra', population: 5.76, area: 42013 },
  { slug: 'riau', name: 'Riau', capital: 'Pekanbaru', region: 'Sumatra', population: 6.97, area: 87024 },
  { slug: 'jambi', name: 'Jambi', capital: 'Jambi', region: 'Sumatra', population: 3.68, area: 50058 },
  { slug: 'sumatera-selatan', name: 'South Sumatra', capital: 'Palembang', region: 'Sumatra', population: 8.84, area: 91592 },
  { slug: 'bengkulu', name: 'Bengkulu', capital: 'Bengkulu', region: 'Sumatra', population: 2.09, area: 19919 },
  { slug: 'lampung', name: 'Lampung', capital: 'Bandar Lampung', region: 'Sumatra', population: 9.11, area: 34624 },
  { slug: 'kepulauan-bangka-belitung', name: 'Bangka Belitung Islands', capital: 'Pangkal Pinang', region: 'Sumatra', population: 1.52, area: 16424 },
  { slug: 'kepulauan-riau', name: 'Riau Islands', capital: 'Tanjung Pinang', region: 'Sumatra', population: 2.2, area: 8202 },
  { slug: 'dki-jakarta', name: 'Jakarta', capital: 'Jakarta', region: 'Java', population: 10.68, area: 664 },
  { slug: 'jawa-barat', name: 'West Java', capital: 'Bandung', region: 'Java', population: 50.35, area: 35378 },
  { slug: 'jawa-tengah', name: 'Central Java', capital: 'Semarang', region: 'Java', population: 37.89, area: 32801 },
  { slug: 'di-yogyakarta', name: 'Yogyakarta', capital: 'Yogyakarta', region: 'Java', population: 3.76, area: 3133 },
  { slug: 'jawa-timur', name: 'East Java', capital: 'Surabaya', region: 'Java', population: 41.81, area: 47803 },
  { slug: 'banten', name: 'Banten', capital: 'Serang', region: 'Java', population: 12.43, area: 9663 },
  { slug: 'bali', name: 'Bali', capital: 'Denpasar', region: 'Bali & Nusa Tenggara', population: 4.41, area: 5780 },
  { slug: 'nusa-tenggara-barat', name: 'West Nusa Tenggara', capital: 'Mataram', region: 'Bali & Nusa Tenggara', population: 5.71, area: 18572 },
  { slug: 'nusa-tenggara-timur', name: 'East Nusa Tenggara', capital: 'Kupang', region: 'Bali & Nusa Tenggara', population: 5.66, area: 47931 },
  { slug: 'kalimantan-barat', name: 'West Kalimantan', capital: 'Pontianak', region: 'Kalimantan', population: 5.83, area: 147307 },
  { slug: 'kalimantan-tengah', name: 'Central Kalimantan', capital: 'Palangka Raya', region: 'Kalimantan', population: 2.81, area: 153564 },
  { slug: 'kalimantan-selatan', name: 'South Kalimantan', capital: 'Banjarmasin', region: 'Kalimantan', population: 4.29, area: 38744 },
  { slug: 'kalimantan-timur', name: 'East Kalimantan', capital: 'Samarinda', region: 'Kalimantan', population: 4.01, area: 127267 },
  { slug: 'kalimantan-utara', name: 'North Kalimantan', capital: 'Tanjung Selor', region: 'Kalimantan', population: 0.73, area: 75467 },
  { slug: 'sulawesi-utara', name: 'North Sulawesi', capital: 'Manado', region: 'Sulawesi', population: 2.76, area: 13892 },
  { slug: 'sulawesi-tengah', name: 'Central Sulawesi', capital: 'Palu', region: 'Sulawesi', population: 3.13, area: 61841 },
  { slug: 'sulawesi-selatan', name: 'South Sulawesi', capital: 'Makassar', region: 'Sulawesi', population: 9.36, area: 46717 },
  { slug: 'sulawesi-tenggara', name: 'Southeast Sulawesi', capital: 'Kendari', region: 'Sulawesi', population: 2.82, area: 38140 },
  { slug: 'gorontalo', name: 'Gorontalo', capital: 'Gorontalo', region: 'Sulawesi', population: 1.27, area: 11257 },
  { slug: 'sulawesi-barat', name: 'West Sulawesi', capital: 'Mamuju', region: 'Sulawesi', population: 1.52, area: 16787 },
  { slug: 'maluku', name: 'Maluku', capital: 'Ambon', region: 'Maluku', population: 1.98, area: 46914 },
  { slug: 'maluku-utara', name: 'North Maluku', capital: 'Sofifi', region: 'Maluku', population: 1.46, area: 31983 },
  { slug: 'papua-barat', name: 'West Papua', capital: 'Manokwari', region: 'Papua', population: 1.24, area: 60275 },
  { slug: 'papua-barat-daya', name: 'Southwest Papua', capital: 'Sorong', region: 'Papua', population: 0.62, area: 39167 },
  { slug: 'papua', name: 'Papua', capital: 'Jayapura', region: 'Papua', population: 1.06, area: 82680 },
  { slug: 'papua-tengah', name: 'Central Papua', capital: 'Nabire', region: 'Papua', population: 1.35, area: 61073 },
  { slug: 'papua-pegunungan', name: 'Highland Papua', capital: 'Wamena', region: 'Papua', population: 1.47, area: 51213 },
  { slug: 'papua-selatan', name: 'South Papua', capital: 'Merauke', region: 'Papua', population: 0.54, area: 117849 },
];

// Latest releases: what changed most recently, in plain words.
export const LATEST = [
  { date: 'March 2025', text: 'Poverty fell to 8.47% — 23.85 million people, the lowest in two decades. The poverty line was Rp 609,160 per person per month.', source: 'BPS, July 2025' },
  { date: 'February 2025', text: 'Open unemployment fell to 4.76%, its lowest since 1997. The labour force reached 153.05 million people.', source: 'BPS, May 2025' },
  { date: '2024', text: 'The economy grew 5.03% and GDP reached Rp 22,139 trillion. GDP per person was about US$ 4,958.', source: 'BPS / IMF, 2024' },
  { date: '2024', text: 'Exports were US$ 264.7 billion against imports of US$ 233.7 billion — a trade surplus of about US$ 31 billion.', source: 'BPS, 2024' },
];

// Where every figure comes from.
export const SOURCES = [
  { name: 'BPS — Statistics Indonesia', detail: 'Population, GDP, inflation, unemployment, poverty, life expectancy and schooling. The national statistics office; its releases are the first source for every headline figure here.' },
  { name: 'World Bank', detail: 'Age structure, hospital beds, physicians and fertility, from the World Development Indicators, 2023–2024.' },
  { name: 'International Monetary Fund', detail: 'GDP per person in US dollars and the 2024 growth picture, World Economic Outlook.' },
  { name: 'UNDP', detail: 'Human Development Index 2023 (0.728, high human development).' },
  { name: 'Ministry of Health', detail: 'Stunting in children under five, from the Indonesian Nutrition Status Survey (SSGI), 2024.' },
  { name: 'Bank Indonesia', detail: 'Foreign-exchange reserves, US$ 155.7 billion at the end of 2024.' },
];
