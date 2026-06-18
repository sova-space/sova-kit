# @sova/kit

Common Sova kit for shared bot UIs.

Live demo: https://sova-space.github.io/sova-kit/

Current scope: Sova Operator UI foundation.

- React UI primitives
- Dashboard blocks: KPI row, toolbar, inspector, activity feed, progress list, spark bars, line chart, donut chart, bar chart, stacked bar, heatmap, flow chart, ECharts Sankey/area/radar/treemap/candlestick charts, chart card
- Product themes: jobs, finance, trading, brain
- Shared CSS tokens, including font tokens (`--sova-font-sans`, `--sova-font-display`, `--sova-font-mono`)
- Better badges: soft/solid/outline variants with optional status dots
- Ladle design preview
- Copyable dashboard starter in `templates/dashboard`

Keep product logic, API clients, routes, and charts inside product apps until duplication is real.

## Use in an app

```tsx
import { SovaProvider, SovaShell } from '@sova/kit'
import '@sova/kit/style.css'
```

## Preview components

```bash
npm install
npm run stories
```

Open the Ladle URL to inspect themes, blocks, and dashboard mockups.

## New dashboard starter

```bash
cp -R templates/dashboard ../my-bot-ui
cd ../my-bot-ui
npm install
npm run dev
```

## Verify

```bash
npm test
npm run build
npm run lint
npm run stories:build
```
