# Sova Kit

Shared React UI kit for Sova Space operator dashboards.

Sova Kit gives Jobs Bot, Finance Bot, Trading Bot and Brain Bot the same compact product language without forcing the apps into one monorepo.

Live demo: https://sova-space.github.io/sova-kit/

Start with the `SovaSystem` story in the live demo. It unifies foundation tokens, project logos, common components, tables and reusable charts on one page.

## Why this exists

Each bot owns its product logic, API calls and domain-specific screens. Sova Kit owns the repeated dashboard layer:

- shell / sidebar / topbar
- cards, badges, buttons and KPI strips
- common table surfaces
- inspector rails, activity feeds and settings lists
- compact native charts
- advanced ECharts wrappers for heavy analytics
- copyable dashboard starter

## Install in an app

```tsx
import {
  SovaProvider,
  SovaShell,
  SovaTableCard,
  SovaBadge,
} from '@sova/kit'
import '@sova/kit/style.css'
```

## Core components

Layout:
- `SovaProvider`
- `SovaShell`
- `SovaTopbar`
- `SovaBrand`
- `SovaNav`
- `SovaPageHeader`
- `SovaDashboardGrid`
- `SovaInspector`

Primitives:
- `SovaCard`
- `SovaButton`
- `SovaBadge`
- `SovaStat`
- `SovaEmptyState`
- `SovaIcon`
- `SovaAvatar`

Forms and controls:
- `SovaInput`
- `SovaSearchBar`
- `SovaSelect`
- `SovaDatePicker`
- `SovaDateRangePicker`
- `SovaFormGroup`
- `SovaCheckbox`
- `SovaRadio`
- `SovaToggle`
- `SovaSlider`
- `SovaTabs`
- `SovaDivider`

Feedback and overlays:
- `SovaBanner`
- `SovaToast`
- `SovaSkeleton`
- `SovaLoading`
- `SovaTooltip`
- `SovaModal`
- `SovaDrawer`
- `SovaAccordion`
- `SovaCarousel`
- `SovaFooter`

Common data surfaces:
- `SovaTable`
- `SovaTableCard`
- `SovaToolbar`
- `SovaActivityFeed`
- `SovaSettingsList`
- `SovaProgressList`
- `SovaKpiRow`

Charts:
- Native/light: `SovaSparkBars`, `SovaLineChart`, `SovaDonutChart`, `SovaBarChart`, `SovaRankingChart`, `SovaStackedBar`, `SovaHeatmap`, `SovaFlowChart`
- ECharts/heavy: `SovaEChart`, `SovaSankeyChart`, `SovaAreaChart`, `SovaMultiLineChart`, `SovaScatterChart`, `SovaGaugeChart`, `SovaRadarChart`, `SovaTreemapChart`, `SovaCandlestickChart`

Themes:
- `jobs`
- `finance`
- `trading`
- `brain`

## Production defaults

### Foundation and inspiration

Inspiration checklist: https://www.checklist.design/category-components

Sova Kit should cover the reusable operator-dashboard version of:
- typography
- colors
- responsive grids/pages
- icons
- buttons
- checkboxes, radio and toggles
- text fields
- form groups
- modals/drawers
- tables
- tooltips
- data visualizations
- header/footer navigation
- carousel
- dividers
- dropdowns/selects
- date picker and date range picker

### Component foundation

Sova Kit covers the practical component set for Sova apps: accordion, avatar, badge, banner, button, card, carousel, checkbox, drawer, footer, icon, input, loading, modal, navigation, radio, searchbar, skeleton, slider, table, tabs, toast, toggle, tooltip, divider, dropdown/select, single date picker, date range picker and form group.

Not every component should appear in every bot. Use the shared component when the pattern repeats; keep product-specific flows inside the product app.

### KPI strips

KPI cards are compact by default. Use them for fast scanning, not big hero cards.

```tsx
<SovaKpiRow
  items={[
    { label: 'Open', value: '24', tone: 'accent' },
    { label: 'Ready', value: '12', tone: 'good' },
    { label: 'Watch', value: '7', tone: 'warn' },
    { label: 'Blocked', value: '2', tone: 'bad' },
  ]}
/>
```

Use `density="normal"` only when the metric has useful hint copy.

### Badges

Use badges for state, filters and short metadata.

```tsx
<SovaBadge tone="good" dot pulse>live</SovaBadge>
<SovaBadge tone="warn" dot>watch</SovaBadge>
<SovaBadge variant="outline" tone="accent">filter</SovaBadge>
<SovaBadge variant="ghost">quiet</SovaBadge>
```

Rules:
- `soft + dot`: normal status
- `outline`: filters
- `solid`: rare primary labels
- `ghost`: quiet inline metadata
- `pulse`: live/active only
- sizes: `xs`, `sm`, `md`

### Tables

Use `SovaTableCard` for common queue/list screens. Product apps own the data; Sova Kit owns the visual table language.

```tsx
<SovaTableCard
  title="Work queue"
  description="Shared table surface."
  density="compact"
  columns={[
    { key: 'name', header: 'Name' },
    { key: 'status', header: 'Status', render: row => <SovaBadge tone="good">{row.status}</SovaBadge> },
    { key: 'score', header: 'Score', align: 'right', mono: true },
  ]}
  rows={[{ name: 'Arize AI', status: 'good fit', score: 82 }]}
/>
```

`SovaTable` supports:
- typed columns
- custom render functions
- compact density
- caption
- empty state
- sticky header
- row click
- right/center alignment
- mono numeric cells

### Charts

Use these defaults before inventing product-specific chart UI:

- trend: `SovaLineChart` or `SovaAreaChart`
- multi-series trend: `SovaMultiLineChart`
- comparison: `SovaRankingChart`
- vertical bars: `SovaBarChart`
- composition: `SovaDonutChart` or `SovaTreemapChart`
- part-to-whole: `SovaStackedBar`
- activity intensity: `SovaHeatmap`
- flow: `SovaFlowChart` or `SovaSankeyChart`
- score/health: `SovaGaugeChart`
- correlation/risk-reward: `SovaScatterChart`
- trading OHLC: `SovaCandlestickChart`

ECharts is dynamically imported by `SovaEChart`, so normal consumers do not eagerly load it unless advanced charts are rendered.

## Local development

```bash
npm install
npm run stories
```

Build and verify:

```bash
npm test
npm run build
npm run lint
npm run stories:build -- --base /sova-kit/
```

## Dashboard starter

```bash
cp -R templates/dashboard ../my-bot-ui
cd ../my-bot-ui
npm install
npm run dev
```

The starter includes shell, KPI strip, toolbar, chart cards, inspector rail and a common table card.

## Repo policy

Keep product logic, API clients, routes and highly domain-specific charts inside product apps until duplication is real. Shared UI primitives, common tables, badges, dashboard frames and reusable chart wrappers belong here.
