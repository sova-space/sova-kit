# @sova/kit

Common Sova kit for shared bot UIs.

Live demo: https://sova-space.github.io/sova-kit/

Current scope: Sova Operator UI foundation for Jobs, Finance, Trading and Brain dashboards.

## What is included

Primitives:
- `SovaProvider`, `SovaShell`, `SovaTopbar`, `SovaBrand`, `SovaNav`
- `SovaCard`, `SovaButton`, `SovaBadge`, `SovaStat`, `SovaEmptyState`
- `SovaTable` as the common table surface

Dashboard blocks:
- `SovaPageHeader`, `SovaKpiRow`, `SovaToolbar`, `SovaDashboardGrid`, `SovaInspector`
- `SovaActivityFeed`, `SovaSettingsList`, `SovaProgressList`, `SovaSplitCard`

Charts:
- native/light: `SovaSparkBars`, `SovaLineChart`, `SovaDonutChart`, `SovaBarChart`, `SovaRankingChart`, `SovaStackedBar`, `SovaHeatmap`, `SovaFlowChart`
- ECharts-backed/heavy: `SovaEChart`, `SovaSankeyChart`, `SovaAreaChart`, `SovaRadarChart`, `SovaTreemapChart`, `SovaCandlestickChart`

Themes:
- `jobs`, `finance`, `trading`, `brain`

## Design defaults

Badges:
- `soft` + `dot` for status metadata: live, watch, blocked
- `outline` for filters
- `solid` sparingly for primary labels
- `ghost` for quiet inline metadata
- sizes: `xs`, `sm`, `md`
- optional `pulse` only for live/active state, not every badge

Tables:
- use `SovaTable` for shared queue/list surfaces
- supports typed columns, custom cell renderers, compact density, captions, empty state, sticky header, row click, right alignment and mono numeric cells
- product apps own data and domain-specific actions; kit owns the visual table language

Charts:
- comparison default: `SovaRankingChart`
- vertical bars only when true bar comparison is needed: `SovaBarChart`
- trend quick/native: `SovaLineChart`
- trend advanced: `SovaAreaChart`
- flow: `SovaSankeyChart`
- trading OHLC: `SovaCandlestickChart`

## Use in an app

```tsx
import { SovaProvider, SovaShell, SovaTable, SovaBadge } from '@sova/kit'
import '@sova/kit/style.css'
```

```tsx
<SovaBadge tone="good" dot pulse>live</SovaBadge>

<SovaTable
  density="compact"
  columns={[
    { key: 'name', header: 'Name' },
    { key: 'status', header: 'Status', render: row => <SovaBadge tone="good">{row.status}</SovaBadge> },
    { key: 'score', header: 'Score', align: 'right', mono: true },
  ]}
  rows={[{ name: 'Arize AI', status: 'good fit', score: 82 }]}
/>
```

## Preview components

```bash
npm install
npm run stories
```

Open the Ladle URL to inspect themes, blocks, production common components, and dashboard mockups.

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
npm run stories:build -- --base /sova-kit/
```

Keep product logic, API clients, routes, and highly domain-specific charts inside product apps until duplication is real.
