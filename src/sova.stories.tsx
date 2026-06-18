import type { ReactNode } from 'react'
import {
  SovaAccordion,
  SovaActivityFeed,
  SovaAvatar,
  SovaBadge,
  SovaBanner,
  SovaAreaChart,
  SovaBarChart,
  SovaBrand,
  SovaButton,
  SovaCandlestickChart,
  SovaCard,
  SovaCarousel,
  SovaChartCard,
  SovaCheckbox,
  SovaDashboardGrid,
  SovaDonutChart,
  SovaDrawer,
  SovaEmptyState,
  SovaFlowChart,
  SovaHeatmap,
  SovaIcon,
  SovaInput,
  SovaInspector,
  SovaKpiRow,
  SovaLineChart,
  SovaLoading,
  SovaModal,
  SovaNav,
  SovaPageHeader,
  SovaProgressList,
  SovaRadio,
  SovaRadarChart,
  SovaRankingChart,
  SovaProvider,
  SovaSearchBar,
  SovaSettingsList,
  SovaShell,
  SovaSkeleton,
  SovaSlider,
  SovaSankeyChart,
  SovaSplitCard,
  SovaStat,
  SovaStackedBar,
  SovaTable,
  SovaTableCard,
  SovaTabs,
  SovaToast,
  SovaToggle,
  SovaToolbar,
  SovaTooltip,
  SovaTreemapChart,
  SovaTopbar,
  type SovaTheme,
} from './index'
import './styles.css'

const storyWrap: React.CSSProperties = { display: 'grid', gap: 18, padding: 20 }
const grid: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }

function StoryFrame({ theme, children }: { theme: SovaTheme; children: ReactNode }) {
  return <SovaProvider theme={theme}><div style={{ minHeight: 260, padding: 18 }}>{children}</div></SovaProvider>
}

function Search({ placeholder = 'Search…' }: { placeholder?: string }) {
  return <input className="sova-search" placeholder={placeholder} />
}

const rowsByTheme = {
  jobs: [
    { name: 'Arize AI', status: <SovaBadge tone="good">Good fit</SovaBadge>, source: 'career-ops', score: '82' },
    { name: 'Revolut', status: <SovaBadge tone="accent">Watch</SovaBadge>, source: 'manual', score: '78' },
    { name: 'Stripe', status: <SovaBadge tone="warn">Stretch</SovaBadge>, source: 'research', score: '64' },
  ],
  finance: [
    { name: 'Food', status: <SovaBadge tone="warn">₴8.2k</SovaBadge>, source: 'Monobank', score: '31%' },
    { name: 'Transport', status: <SovaBadge tone="good">₴2.1k</SovaBadge>, source: 'Cash', score: '8%' },
    { name: 'Subscriptions', status: <SovaBadge tone="accent">₴1.6k</SovaBadge>, source: 'Wise', score: '6%' },
  ],
  trading: [
    { name: 'BTC-USDT', status: <SovaBadge tone="good">Long</SovaBadge>, source: 'trend-ai', score: '+18.4' },
    { name: 'ETH-USDT', status: <SovaBadge tone="warn">Watch</SovaBadge>, source: 'liquidity', score: '-2.1' },
    { name: 'SOL-USDT', status: <SovaBadge tone="accent">Paper</SovaBadge>, source: 'rsi-cross', score: '+4.8' },
  ],
  brain: [
    { name: 'Finance digest', status: <SovaBadge tone="good">Done</SovaBadge>, source: 'cron', score: '09:00' },
    { name: 'Jobs scan', status: <SovaBadge tone="accent">Next</SovaBadge>, source: 'career-ops', score: '12:00' },
    { name: 'Trading review', status: <SovaBadge tone="warn">Watch</SovaBadge>, source: 'paper', score: '18:00' },
  ],
}

const toneByTheme = {
  jobs: { title: 'Jobs Bot', mark: 'JB', eyebrow: 'career ops', primary: 'Good fits', value: '12', money: '82/99' },
  finance: { title: 'Money OS', mark: '₴', eyebrow: 'finance bot', primary: 'Spend', value: '₴42.8k', money: '₴8.2k' },
  trading: { title: 'Trader', mark: 'TR', eyebrow: 'paper bot', primary: 'Paper PnL', value: '+18.4', money: 'USDT' },
  brain: { title: 'Brain', mark: 'SB', eyebrow: 'operator', primary: 'Next actions', value: '5', money: 'today' },
}

const weeklyCells = ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S'].map((label, index) => ({ label, value: [4, 8, 5, 11, 14, 6, 2, 7, 10, 13, 9, 16, 5, 3][index] }))
const mixSegments = [{ label: 'Ready', value: 52, tone: 'good' as const }, { label: 'Watch', value: 31, tone: 'warn' as const }, { label: 'Blocked', value: 17, tone: 'bad' as const }]

function DashboardTemplate({ theme }: { theme: SovaTheme }) {
  const copy = toneByTheme[theme]
  const rows = rowsByTheme[theme]
  return (
    <SovaProvider theme={theme}>
      <SovaShell
        sidebar={
          <>
            <SovaBrand mark={copy.mark} eyebrow={copy.eyebrow} title={copy.title} />
            <SovaNav items={[{ label: 'Overview', active: true }, { label: 'Pipeline' }, { label: 'Reports' }, { label: 'Settings' }]} />
          </>
        }
      >
        <SovaTopbar
          eyebrow="sova operator ui"
          title="Command center"
          actions={<><SovaBadge tone="good">Live</SovaBadge><SovaButton>Export</SovaButton><SovaButton variant="primary">Sync</SovaButton></>}
        />
        <div className="sova-surface-band">
          <SovaPageHeader
            eyebrow="today"
            title="What needs attention"
            description="Reusable dashboard layout: KPI row, search/filter toolbar, table-first work queue, right inspector, progress and chart primitives."
            meta={<SovaBadge tone="accent">Template</SovaBadge>}
          />
          <SovaKpiRow
            items={[
              { label: copy.primary, value: copy.value, hint: 'changed today', tone: 'accent' },
              { label: 'Ready', value: '12', hint: 'can act now', tone: 'good' },
              { label: 'Watch', value: '7', hint: 'needs review', tone: 'warn' },
              { label: 'Blocked', value: '2', hint: 'waiting input', tone: 'bad' },
            ]}
          />
        </div>
        <SovaDashboardGrid
          inspector={
            <SovaInspector
              title="Selected item"
              subtitle="Detail, provenance, next action."
              actions={<SovaBadge tone="good">active</SovaBadge>}
              sections={[
                { title: 'Next action', content: <p style={{ margin: 0, color: 'var(--sova-muted)', fontSize: 13 }}>Review, decide, sync. Keep workflow obvious.</p> },
                { title: 'Health', content: <SovaProgressList items={[{ label: 'Data quality', value: '86%', percent: 86, tone: 'good' }, { label: 'Noise', value: '18%', percent: 18, tone: 'warn' }]} /> },
                { title: 'Activity', content: <SovaActivityFeed items={[{ title: 'Data refreshed', detail: 'Generated from source export', time: '2m', tone: 'good' }, { title: 'Threshold changed', detail: 'Priority moved to watch', time: '1h', tone: 'warn' }]} /> },
              ]}
            />
          }
        >
          <SovaToolbar left={<Search placeholder="Search rows" />} right={<><SovaBadge>All</SovaBadge><SovaBadge tone="good">Good</SovaBadge><SovaBadge tone="warn">Watch</SovaBadge></>} />
          <SovaSplitCard
            title="Signal panel"
            description="Generic chart frame for app data: trend line + donut breakdown + compact health stats. Product apps can replace internals with Chart.js/Recharts later."
            main={
              <div className="sova-chart-grid">
                <SovaLineChart points={[6, 9, 5, 12, 8, 14, 11, 18, 15, 22, 20, 26]} tone={theme === 'trading' ? 'good' : 'accent'} />
                <SovaDonutChart
                  center={<><span>{copy.money}</span><small style={{ color: 'var(--sova-muted)', fontSize: 11 }}>signal</small></>}
                  segments={[
                    { label: 'Ready', value: 54, tone: 'good' },
                    { label: 'Watch', value: 28, tone: 'warn' },
                    { label: 'Blocked', value: 18, tone: 'bad' },
                  ]}
                />
              </div>
            }
            side={<SovaProgressList items={[{ label: 'Coverage', value: '74%', percent: 74, tone: 'accent' }, { label: 'Confidence', value: '61%', percent: 61, tone: 'good' }, { label: 'Risk', value: '22%', percent: 22, tone: 'warn' }]} />}
          />
          <SovaCard title="Work queue" description="Table-first surface. Product apps own domain data; kit owns layout language.">
            <SovaTable density="compact" stickyHeader caption="Common table component: compact, typed columns, rendered cells, sticky header ready." columns={[{ key: 'name', header: 'Name' }, { key: 'status', header: 'Status' }, { key: 'source', header: 'Source' }, { key: 'score', header: 'Score', align: 'right', mono: true }]} rows={rows} />
          </SovaCard>
          <SovaCard title="Settings preview">
            <SovaSettingsList items={[{ label: 'Manual sync', description: 'Show as topbar action.', control: <SovaButton>Run</SovaButton> }, { label: 'Compact mode', description: 'Default for Sova dashboards.', control: <SovaBadge tone="good">on</SovaBadge> }]} />
          </SovaCard>
        </SovaDashboardGrid>
      </SovaShell>
    </SovaProvider>
  )
}

export const Themes = () => (
  <div style={storyWrap}>
    <div style={grid}>
      <StoryFrame theme="jobs"><SovaCard title="Jobs" description="Linear-ish light triage."><SovaStat label="Good fits" value="7" tone="good" /></SovaCard></StoryFrame>
      <StoryFrame theme="finance"><SovaCard title="Finance" description="Warm personal money OS."><SovaStat label="This month" value="₴42.8k" tone="accent" /></SovaCard></StoryFrame>
      <StoryFrame theme="trading"><SovaCard title="Trading" description="Dark dense operator dashboard."><SovaStat label="Paper PnL" value="+18.4 USDT" tone="good" /></SovaCard></StoryFrame>
      <StoryFrame theme="brain"><SovaCard title="Brain" description="Warm minimal inbox/actions."><SovaStat label="Next actions" value="5" tone="accent" /></SovaCard></StoryFrame>
    </div>
  </div>
)

export const Components = () => (
  <StoryFrame theme="jobs">
    <div style={storyWrap}>
      <SovaKpiRow items={[{ label: 'Neutral', value: '12' }, { label: 'Good', value: '+24%', tone: 'good' }, { label: 'Warn', value: '3', tone: 'warn' }, { label: 'Bad', value: '-2', tone: 'bad' }]} />
      <SovaSplitCard title="Mini chart" description="Line + donut primitives for compact dashboards." main={<div className="sova-chart-grid"><SovaLineChart points={[3, 8, 6, 10, 9, 14, 13, 18]} /><SovaDonutChart center="72%" segments={[{ label: 'Ready', value: 72, tone: 'good' }, { label: 'Watch', value: 18, tone: 'warn' }, { label: 'Blocked', value: 10, tone: 'bad' }]} /></div>} side={<SovaProgressList items={[{ label: 'Done', value: '80%', percent: 80, tone: 'good' }, { label: 'Watch', value: '20%', percent: 20, tone: 'warn' }]} />} />
      <div style={grid}>
        <SovaCard title="Badges"><div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><SovaBadge size="xs">xs</SovaBadge><SovaBadge dot pulse tone="good">live</SovaBadge><SovaBadge icon="↗" tone="accent">signal</SovaBadge><SovaBadge dot tone="warn">watch</SovaBadge><SovaBadge dot tone="bad">blocked</SovaBadge><SovaBadge variant="solid" tone="accent">solid</SovaBadge><SovaBadge variant="outline" tone="good">outline</SovaBadge><SovaBadge variant="ghost">ghost</SovaBadge></div></SovaCard>
        <SovaCard title="Actions"><div style={{ display: 'flex', gap: 8 }}><SovaButton variant="primary">Primary</SovaButton><SovaButton>Secondary</SovaButton></div></SovaCard>
        <SovaCard title="Empty"><SovaEmptyState title="Nothing here" description="Sync or add a source first." /></SovaCard>
      </div>
    </div>
  </StoryFrame>
)

export const ProductionCommon = () => (
  <StoryFrame theme="jobs">
    <div style={storyWrap}>
      <SovaPageHeader eyebrow="common components" title="Production-ready defaults" description="Badges and tables are shared across Jobs, Finance, Trading and Brain. Keep apps domain-specific, but reuse these surfaces." meta={<SovaBadge dot pulse tone="good">ready</SovaBadge>} />
      <div style={grid}>
        <SovaCard title="Badge system" description="Status metadata, filters and compact labels.">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <SovaBadge size="xs">tiny</SovaBadge><SovaBadge>neutral</SovaBadge><SovaBadge dot pulse tone="good">live</SovaBadge><SovaBadge dot tone="warn">watch</SovaBadge><SovaBadge dot tone="bad">blocked</SovaBadge><SovaBadge icon="↗" tone="accent">signal</SovaBadge><SovaBadge variant="solid" tone="good">solid</SovaBadge><SovaBadge variant="outline" tone="accent">filter</SovaBadge><SovaBadge variant="ghost">quiet</SovaBadge>
          </div>
        </SovaCard>
        <SovaTableCard
          title="Common table component"
          description="Typed columns, rendered cells, alignment, mono numbers, empty state. Use this before app-specific table work."
          actions={<SovaBadge variant="outline" tone="accent">shared</SovaBadge>}
          density="compact"
          caption="Reusable table surface"
          columns={[{ key: 'name', header: 'Name' }, { key: 'status', header: 'Status' }, { key: 'score', header: 'Score', align: 'right', mono: true }]}
          rows={[{ name: 'Arize AI', status: <SovaBadge tone="good">good fit</SovaBadge>, score: '82' }, { name: 'Revolut', status: <SovaBadge tone="warn">watch</SovaBadge>, score: '71' }]}
        />
      </div>
      <SovaCard title="Empty table"><SovaTable columns={[{ key: 'name', header: 'Name' }, { key: 'status', header: 'Status' }]} rows={[]} empty="No matching rows" /></SovaCard>
    </div>
  </StoryFrame>
)

export const ChecklistComponents = () => (
  <StoryFrame theme="jobs">
    <div style={storyWrap}>
      <SovaPageHeader eyebrow="component checklist" title="Checklist.design coverage" description="Production-oriented primitives for the common component collection: forms, feedback, overlays, navigation, loading and content containers." meta={<SovaBadge tone="accent" variant="outline">expanded</SovaBadge>} />
      <SovaBanner tone="accent" title="Shared component set" description="Use these before inventing one-off app UI." actions={<SovaButton>Action</SovaButton>} />
      <div style={grid}>
        <SovaCard title="Forms"><div style={{ display: 'grid', gap: 12 }}><SovaInput label="Input field" placeholder="Type value" hint="Label, hint, error states" /><SovaSearchBar placeholder="Search rows" actions={<SovaBadge>⌘K</SovaBadge>} /><SovaCheckbox label="Checkbox" description="Multi-select option" checked /><SovaRadio name="demo-radio" value="one" label="Radio" description="Single choice" checked /><SovaToggle label="Toggle" description="Fast on/off state" checked /><SovaSlider label="Threshold" value={64} /></div></SovaCard>
        <SovaCard title="Identity + metadata"><div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}><SovaAvatar name="Nazar Khimin" status="good" /><SovaIcon tone="accent">↗</SovaIcon><SovaTooltip label="Helpful context"><SovaBadge variant="outline">tooltip</SovaBadge></SovaTooltip><SovaLoading label="Syncing" /></div></SovaCard>
        <SovaCard title="Navigation"><div style={{ display: 'grid', gap: 12 }}><SovaTabs value="one" items={[{ label: 'Overview', value: 'one' }, { label: 'Queue', value: 'two', badge: <SovaBadge size="xs">3</SovaBadge> }]} /><SovaAccordion items={[{ title: 'Accordion row', content: 'Expandable content for dense settings and help.', defaultOpen: true }]} /></div></SovaCard>
        <SovaCard title="Loading + feedback"><div style={{ display: 'grid', gap: 12 }}><SovaSkeleton lines={3} /><SovaToast tone="good" title="Saved" description="Changes were persisted." /></div></SovaCard>
        <SovaCard title="Overlays"><div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><SovaBadge variant="outline">Modal</SovaBadge><SovaBadge variant="outline">Drawer</SovaBadge><SovaModal open={false} title="Modal" description="Dialog structure" actions={<SovaButton>Done</SovaButton>}><p style={{ margin: 0, color: 'var(--sova-muted)' }}>Modal content area.</p></SovaModal><SovaDrawer open={false} title="Drawer"><p style={{ margin: 0, color: 'var(--sova-muted)' }}>Drawer content area.</p></SovaDrawer></div></SovaCard>
        <SovaCard title="Carousel"><SovaCarousel items={[<SovaCard key="a"><SovaStat label="One" value="1" /></SovaCard>, <SovaCard key="b"><SovaStat label="Two" value="2" /></SovaCard>]} /></SovaCard>
      </div>
    </div>
  </StoryFrame>
)

export const AnalyticsCharts = () => (
  <StoryFrame theme="finance">
    <div style={storyWrap}>
      <SovaPageHeader eyebrow="analytics kit" title="Best default chart set" description="Trend, composition, comparison, part-to-whole, heatmap, lightweight flow, and ECharts Sankey for Sova portals." meta={<SovaBadge dot tone="accent">ECharts powered</SovaBadge>} />
      <div className="sova-analytics-grid">
        <SovaChartCard className="sova-chart-card-wide" title="Trend" description="For PnL, balance, job volume, automation health." footer={<SovaBadge tone="good" dot>+18%</SovaBadge>}>
          <SovaLineChart points={[12, 16, 13, 18, 21, 19, 26, 24, 31, 36, 34, 42]} tone="accent" height={150} />
        </SovaChartCard>
        <SovaChartCard title="Composition" description="Spend, source quality, signal buckets.">
          <SovaDonutChart center={<><span>52%</span><small style={{ color: 'var(--sova-muted)', fontSize: 11 }}>ready</small></>} segments={mixSegments} />
        </SovaChartCard>
        <SovaChartCard title="Comparison" description="One unified ranking plot, no per-metric bubbles.">
          <SovaRankingChart items={[{ label: 'Food', value: 42, hint: '₴42k', tone: 'warn' }, { label: 'Jobs', value: 31, hint: '31 hits', tone: 'accent' }, { label: 'BTC', value: 26, hint: '+26%', tone: 'good' }, { label: 'Ops', value: 18, hint: '18 tasks', tone: 'bad' }]} />
        </SovaChartCard>
        <SovaChartCard title="Part to whole" description="Compact stacked distribution.">
          <SovaStackedBar label="Pipeline mix" value="100%" segments={mixSegments} />
        </SovaChartCard>
        <SovaChartCard title="Heatmap" description="Calendar/day intensity, scan volume, habits.">
          <SovaHeatmap cells={weeklyCells} columns={7} />
        </SovaChartCard>
        <SovaChartCard className="sova-chart-card-wide" title="Lite flow" description="Small dependency-free flow for quick summaries.">
          <SovaFlowChart source="Income" center="Cashflow" items={[{ label: 'Food', value: 42, tone: 'warn' }, { label: 'Savings', value: 31, tone: 'good' }, { label: 'Bills', value: 24, tone: 'accent' }, { label: 'Other', value: 12, tone: 'bad' }]} />
        </SovaChartCard>
        <SovaChartCard className="sova-chart-card-wide" title="Sankey" description="ECharts-powered Sankey for real cashflow/funnel/multi-stage analytics.">
          <SovaSankeyChart
            height={320}
            nodes={[
              { name: 'Salary', tone: 'good' }, { name: 'Cashflow', tone: 'accent' }, { name: 'Food', tone: 'warn' }, { name: 'Bills', tone: 'accent' }, { name: 'Savings', tone: 'good' }, { name: 'Other', tone: 'bad' },
            ]}
            links={[
              { source: 'Salary', target: 'Cashflow', value: 100 },
              { source: 'Cashflow', target: 'Food', value: 32 },
              { source: 'Cashflow', target: 'Bills', value: 24 },
              { source: 'Cashflow', target: 'Savings', value: 31 },
              { source: 'Cashflow', target: 'Other', value: 13 },
            ]}
          />
        </SovaChartCard>
        <SovaChartCard className="sova-chart-card-wide" title="Area trend" description="ECharts area line for richer time-series, balances and PnL.">
          <SovaAreaChart labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']} values={[12, 18, 15, 27, 24, 34]} />
        </SovaChartCard>
        <SovaChartCard title="Radar" description="Multi-metric fit/health scoring.">
          <SovaRadarChart metrics={[{ label: 'Fit', value: 86, max: 100 }, { label: 'Salary', value: 72, max: 100 }, { label: 'Remote', value: 92, max: 100 }, { label: 'Risk', value: 34, max: 100 }, { label: 'Speed', value: 68, max: 100 }]} />
        </SovaChartCard>
        <SovaChartCard title="Treemap" description="Dense composition when many buckets exist.">
          <SovaTreemapChart items={[{ name: 'Food', value: 42, tone: 'warn' }, { name: 'Housing', value: 31, tone: 'accent' }, { name: 'Savings', value: 27, tone: 'good' }, { name: 'Other', value: 12, tone: 'bad' }]} />
        </SovaChartCard>
        <SovaChartCard className="sova-chart-card-wide" title="Candlestick" description="Trading-specific chart primitive for OHLC data.">
          <SovaCandlestickChart points={[{ label: 'Mon', open: 12, close: 18, low: 10, high: 20 }, { label: 'Tue', open: 18, close: 16, low: 14, high: 21 }, { label: 'Wed', open: 16, close: 24, low: 15, high: 26 }, { label: 'Thu', open: 24, close: 21, low: 19, high: 28 }, { label: 'Fri', open: 21, close: 29, low: 20, high: 31 }]} />
        </SovaChartCard>
      </div>
    </div>
  </StoryFrame>
)

export const DashboardJobs = () => <DashboardTemplate theme="jobs" />
export const DashboardFinance = () => <DashboardTemplate theme="finance" />
export const DashboardTrading = () => <DashboardTemplate theme="trading" />
export const DashboardBrain = () => <DashboardTemplate theme="brain" />
