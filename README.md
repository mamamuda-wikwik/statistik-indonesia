[![Make.fun competition](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/mamamuda-wikwik/statistik-indonesia/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/mamamuda-wikwik/statistik-indonesia/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

# Statistik Indonesia

A national statistics site for Indonesia, built for the [Make the best national statistics site](https://make.fun/bounty/best-national-statistics-site-20261126-0539) bounty on make.fun.

The headline numbers of the world's fourth most populous country — population, economy, prices, jobs, health, education and all 38 provinces — each with its source and year. Every chart is hand-rolled SVG, every control works, and the whole site is static files that run offline in a desktop browser and on a phone.

## Pages

- **Overview** — headline cards (population 281.6 million, GDP Rp 22,139 trillion, growth 5.03%, inflation 1.57%, unemployment 4.76%, poverty 8.47%) plus the latest releases
- **Population & demographics** — population trend, age structure, island-group shares
- **Economy** — GDP growth chart with a growth/spending toggle, GDP by sector, GDP by spending
- **Prices & inflation** — inflation trend, the poverty line, Bank Indonesia's target
- **Employment** — unemployment and poverty trends, labour-force figures, underemployment
- **Health & education** — HDI, life expectancy, schooling, stunting, doctors and beds
- **Provinces explorer** — searchable, sortable table of all 38 provinces with population, area and density, plus CSV download; every row opens a province page
- **Sources & methods** — where every figure comes from and how to read it

## Sources

BPS — Statistics Indonesia, World Bank, IMF, UNDP, Ministry of Health (SSGI), Bank Indonesia. Figures checked 26 November 2026.

## Run it

```sh
node serve.ts
# open http://localhost:8080
```

No build step, no network requests, no dependencies. `main.ts` (Node 22) copies `app/` and `screenshots/` to `/output` and writes `dossier.json` with the vendored make.fun library:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
