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
  SovaDatePicker,
  SovaDateRangePicker,
  SovaDivider,
  SovaDonutChart,
  SovaDrawer,
  SovaEmptyState,
  SovaFooter,
  SovaFlowChart,
  SovaFormGroup,
  SovaGaugeChart,
  SovaHeatmap,
  SovaIcon,
  SovaInput,
  SovaInspector,
  SovaKpiRow,
  SovaLineChart,
  SovaLoading,
  SovaModal,
  SovaMultiLineChart,
  SovaNav,
  SovaPageHeader,
  SovaProgressList,
  SovaRadio,
  SovaRadarChart,
  SovaRankingChart,
  SovaProvider,
  SovaSearchBar,
  SovaSelect,
  SovaSettingsList,
  SovaShell,
  SovaSkeleton,
  SovaSlider,
  SovaSparkBars,
  SovaSankeyChart,
  SovaScatterChart,
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

export const CoreComponents = () => (
  <StoryFrame theme="brain">
    <div className="sova-system-page">
      <SovaPageHeader
        eyebrow="single source"
        title="Core components"
        description="One expanded page for foundation, layout, navigation, common components, tables, states and reusable charts."
        meta={<SovaBadge dot pulse tone="good">production v1</SovaBadge>}
        actions={<><SovaButton variant="primary">Primary action</SovaButton><SovaButton>Secondary</SovaButton></>}
      />

      <section className="sova-system-section">
        <h2>Foundation: typography, colors, spacing</h2>
        <div className="sova-system-grid-large">
          <SovaCard title="Typography">
            <div style={{ display: 'grid', gap: 10 }}>
              <p className="sova-eyebrow">eyebrow / metadata</p>
              <h1 className="sova-page-title" style={{ margin: 0 }}>Operator title</h1>
              <p className="sova-page-description" style={{ margin: 0 }}>Compact, calm, information-dense text rhythm for internal dashboards.</p>
              <SovaStat label="Mono metric" value="₴42,180" tone="accent" />
            </div>
          </SovaCard>
          <SovaCard title="Color tokens">
            <div className="sova-token-grid">
              <div className="sova-token-swatch"><i style={{ background: 'var(--sova-accent)' }} /><strong>Accent</strong></div>
              <div className="sova-token-swatch"><i style={{ background: 'var(--sova-good)' }} /><strong>Good</strong></div>
              <div className="sova-token-swatch"><i style={{ background: 'var(--sova-warn)' }} /><strong>Warn</strong></div>
              <div className="sova-token-swatch"><i style={{ background: 'var(--sova-bad)' }} /><strong>Bad</strong></div>
            </div>
          </SovaCard>
        </div>
        <SovaKpiRow items={[{ label: 'Open', value: '12' }, { label: 'Good', value: '+24%', tone: 'good' }, { label: 'Warn', value: '3', tone: 'warn' }, { label: 'Bad', value: '-2', tone: 'bad' }]} />
      </section>

      <section className="sova-system-section">
        <h2>Layout and navigation</h2>
        <SovaShell
          sidebar={<><SovaBrand mark="S" eyebrow="sova" title="Operator" /><SovaNav items={[{ label: 'Overview', active: true, icon: <SovaIcon size={16}>⌂</SovaIcon> }, { label: 'Queue', icon: <SovaIcon size={16}>≡</SovaIcon> }, { label: 'Settings', icon: <SovaIcon size={16}>⚙</SovaIcon> }]} /></>}
        >
          <SovaTopbar eyebrow="topbar" title="Responsive shell" actions={<SovaBadge dot tone="good">live</SovaBadge>}>
            <p className="sova-page-description">Sidebar, topbar, nav, page header and responsive grid in one layout surface.</p>
          </SovaTopbar>
          <SovaDashboardGrid inspector={<SovaInspector title="Inspector" subtitle="Right rail" sections={[{ title: 'Context', content: <p>Dense details without leaving the page.</p> }, { title: 'Status', content: <SovaBadge tone="good">ready</SovaBadge> }]} />}>
            <SovaCard title="Main area"><SovaLineChart points={[4, 8, 6, 12, 11, 18, 16]} height={120} /></SovaCard>
            <SovaSplitCard title="Split card" description="Main + side content" main={<SovaProgressList items={[{ label: 'Coverage', value: '92%', percent: 92, tone: 'good' }, { label: 'Risk', value: '18%', percent: 18, tone: 'warn' }]} />} side={<SovaSparkBars points={[{ value: 2 }, { value: 7, tone: 'good' }, { value: -3, tone: 'bad' }, { value: 8, tone: 'accent' }]} />} />
          </SovaDashboardGrid>
        </SovaShell>
      </section>

      <section className="sova-system-section sova-core-showcase">
        <div className="sova-section-heading">
          <div>
            <p className="sova-eyebrow">common layer</p>
            <h2>Core components</h2>
          </div>
          <SovaBadge dot tone="good">reusable primitives</SovaBadge>
        </div>
        <div className="sova-core-hero">
          <SovaCard className="sova-component-card sova-component-card-feature" title="Actions and identity" description="Buttons, badges, icon accents and avatars should feel compact, calm and product-ready.">
            <div className="sova-action-strip">
              <SovaButton variant="primary">Primary action</SovaButton>
              <SovaButton>Secondary</SovaButton>
              <SovaBadge dot pulse tone="good">live</SovaBadge>
              <SovaBadge variant="outline" tone="accent">filter</SovaBadge>
              <SovaBadge variant="ghost">quiet</SovaBadge>
            </div>
            <div className="sova-identity-row">
              <SovaIcon tone="accent">↗</SovaIcon>
              <SovaAvatar name="Nazar Khimin" status="good" />
              <div><strong>Operator pattern</strong><span>Short labels, tiny metadata, visible state.</span></div>
              <SovaTooltip label="Tooltip text"><SovaBadge variant="outline">hover/focus</SovaBadge></SovaTooltip>
            </div>
          </SovaCard>
          <SovaCard className="sova-component-card" title="Navigation rhythm" description="A small control set that does not overpower the page.">
            <SovaTabs value="overview" items={[{ label: 'Overview', value: 'overview' }, { label: 'Queue', value: 'queue', badge: <SovaBadge size="xs">3</SovaBadge> }]} />
            <SovaDivider label="density" />
            <SovaProgressList items={[{ label: 'Coverage', value: '92%', percent: 92, tone: 'good' }, { label: 'Risk', value: '18%', percent: 18, tone: 'warn' }]} />
          </SovaCard>
        </div>
      </section>

      <section className="sova-system-section sova-forms-showcase">
        <div className="sova-section-heading">
          <div>
            <p className="sova-eyebrow">input surface</p>
            <h2>Forms and controls</h2>
          </div>
          <SovaBadge variant="outline">desktop first</SovaBadge>
        </div>
        <div className="sova-form-layout">
          <SovaCard className="sova-form-panel" title="Filter group" description="Fields are grouped, aligned and easy to scan.">
            <SovaFormGroup title="Search and range" description="Use this pattern for dashboard filters and settings.">
              <div className="sova-form-two"><SovaInput label="Textfield" placeholder="Search or enter value" hint="Hint copy" /><SovaSelect label="Dropdown" value="ready" options={[{ label: 'Ready', value: 'ready' }, { label: 'Watch', value: 'watch' }]} /></div>
              <SovaSearchBar placeholder="Search rows" actions={<SovaBadge>⌘K</SovaBadge>} />
              <div className="sova-form-two"><SovaDatePicker label="Single date" value="2026-06-18" /><SovaDateRangePicker label="Date range" start="2026-06-01" end="2026-06-18" /></div>
            </SovaFormGroup>
          </SovaCard>
          <SovaCard className="sova-form-panel sova-form-side" title="Controls" description="Choices stay close to the setting they affect.">
            <SovaCheckbox label="Checkbox" description="Multi-select item" checked />
            <SovaRadio name="system-radio" value="one" label="Radio" description="Single choice" checked />
            <SovaToggle label="Toggle" description="Fast on/off setting" checked />
            <SovaSlider label="Threshold" value={64} />
          </SovaCard>
        </div>
      </section>

      <section className="sova-system-section sova-feedback-showcase">
        <div className="sova-section-heading">
          <div>
            <p className="sova-eyebrow">system feedback</p>
            <h2>Feedback and states</h2>
          </div>
          <SovaBadge tone="warn" variant="outline">states</SovaBadge>
        </div>
        <div className="sova-feedback-layout">
          <SovaCard className="sova-feedback-primary" title="Persistent feedback" description="Banners explain durable state; toasts confirm one action.">
            <SovaBanner tone="accent" title="Banner" description="Important persistent feedback with optional actions." actions={<SovaButton>Review</SovaButton>} />
            <div className="sova-toast-stack"><SovaToast tone="good" title="Synced" description="Short status feedback." /><SovaToast tone="warn" title="Needs review" description="One concise next step." /></div>
          </SovaCard>
          <SovaCard className="sova-feedback-primary" title="Loading and empty" description="Avoid dead screens: show progress and a next action.">
            <SovaLoading label="Syncing latest data" />
            <SovaSkeleton lines={3} />
            <SovaEmptyState title="No rows" description="Empty state copy with next action nearby." />
          </SovaCard>
        </div>
      </section>

      <section className="sova-system-section">
        <h2>Disclosure and utility components</h2>
        <div className="sova-core-grid">
          <SovaCard className="sova-component-card" title="Disclosure / overlays / carousel">
            <div className="sova-component-stack">
              <SovaAccordion items={[{ title: 'Accordion row', content: 'Expandable dense content.', defaultOpen: true }]} />
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><SovaBadge variant="outline">Modal</SovaBadge><SovaBadge variant="outline">Drawer</SovaBadge><SovaModal open={false} title="Modal"><p>Modal body</p></SovaModal><SovaDrawer open={false} title="Drawer"><p>Drawer body</p></SovaDrawer></div>
              <SovaCarousel items={[<SovaCard key="a"><SovaStat label="Slide A" value="1" /></SovaCard>, <SovaCard key="b"><SovaStat label="Slide B" value="2" /></SovaCard>, <SovaCard key="c"><SovaStat label="Slide C" value="3" /></SovaCard>]} />
            </div>
          </SovaCard>
          <SovaCard className="sova-component-card" title="Divider and footer">
            <div className="sova-component-stack"><SovaDivider label="section" /><SovaFooter brand="Sova Kit" links={[{ label: 'Docs', href: '#' }, { label: 'Demo', href: '#' }]} /></div>
          </SovaCard>
        </div>
      </section>

      <section className="sova-system-section">
        <h2>Tables and common data surfaces</h2>
        <SovaToolbar left={<SovaSearchBar placeholder="Search table" />} right={<><SovaBadge variant="outline">All</SovaBadge><SovaButton>Export</SovaButton></>} />
        <SovaTableCard title="Common table card" description="Recommended table wrapper for queues, transactions, positions and task lists." density="compact" stickyHeader columns={[{ key: 'name', header: 'Name' }, { key: 'status', header: 'Status' }, { key: 'source', header: 'Source' }, { key: 'score', header: 'Score', align: 'right', mono: true }]} rows={[{ name: 'Jobs queue', status: <SovaBadge tone="good">ready</SovaBadge>, source: 'career-ops', score: '91' }, { name: 'Finance review', status: <SovaBadge tone="warn">watch</SovaBadge>, source: 'transactions', score: '73' }, { name: 'Trading paper', status: <SovaBadge tone="accent">paper</SovaBadge>, source: 'okx', score: '68' }]} />
        <div className="sova-system-grid-large">
          <SovaCard title="Raw table"><SovaTable columns={[{ key: 'name', header: 'Name' }, { key: 'value', header: 'Value', align: 'right', mono: true }]} rows={[{ name: 'Alpha', value: '12' }, { name: 'Beta', value: '24' }]} /></SovaCard>
          <SovaCard title="Activity / settings"><div style={{ display: 'grid', gap: 14 }}><SovaActivityFeed items={[{ title: 'Synced jobs', detail: '7 exported', time: 'now', tone: 'good' }, { title: 'Finance review', detail: '3 uncategorized', time: '2m', tone: 'warn' }]} /><SovaSettingsList items={[{ label: 'Notifications', description: 'Send only useful signals', control: <SovaToggle label="" checked /> }, { label: 'Language', description: 'Shared router setting', control: <SovaBadge>UA/EN</SovaBadge> }]} /></div></SovaCard>
        </div>
      </section>

      <section className="sova-system-section">
        <h2>Reusable charts</h2>
        <div className="sova-analytics-grid">
          <SovaChartCard className="sova-chart-card-wide" title="Trend"><SovaLineChart points={[12, 16, 13, 18, 21, 19, 26, 24, 31, 36, 34, 42]} tone="accent" height={150} /></SovaChartCard>
          <SovaChartCard title="Donut"><SovaDonutChart center={<span>64%</span>} segments={mixSegments} /></SovaChartCard>
          <SovaChartCard title="Ranking"><SovaRankingChart items={[{ label: 'Jobs', value: 31, tone: 'accent' }, { label: 'Finance', value: 24, tone: 'good' }, { label: 'Trading', value: 18, tone: 'warn' }]} /></SovaChartCard>
          <SovaChartCard title="Vertical bars"><SovaBarChart items={[{ label: 'Mon', value: 12 }, { label: 'Tue', value: 18, tone: 'good' }, { label: 'Wed', value: 9, tone: 'warn' }, { label: 'Thu', value: 22, tone: 'accent' }]} /></SovaChartCard>
          <SovaChartCard title="Stacked"><SovaStackedBar label="Mix" value="100%" segments={mixSegments} /></SovaChartCard>
          <SovaChartCard title="Heatmap"><SovaHeatmap cells={weeklyCells} columns={7} /></SovaChartCard>
          <SovaChartCard className="sova-chart-card-wide" title="Flow"><SovaFlowChart source="Input" center="System" items={[{ label: 'Jobs', value: 31, tone: 'accent' }, { label: 'Finance', value: 24, tone: 'good' }, { label: 'Trading', value: 18, tone: 'warn' }]} /></SovaChartCard>
          <SovaChartCard className="sova-chart-card-wide" title="Sankey"><SovaSankeyChart height={260} nodes={[{ name: 'Input', tone: 'accent' }, { name: 'Review', tone: 'warn' }, { name: 'Done', tone: 'good' }, { name: 'Drop', tone: 'bad' }]} links={[{ source: 'Input', target: 'Review', value: 40 }, { source: 'Review', target: 'Done', value: 28 }, { source: 'Review', target: 'Drop', value: 12 }]} /></SovaChartCard>
          <SovaChartCard className="sova-chart-card-wide" title="Area"><SovaAreaChart labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']} values={[12, 18, 15, 27, 24, 34]} /></SovaChartCard>
          <SovaChartCard className="sova-chart-card-wide" title="Multi-line"><SovaMultiLineChart labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']} series={[{ name: 'Volume', values: [12, 18, 15, 27, 24, 34], tone: 'accent' }, { name: 'Quality', values: [8, 12, 17, 19, 22, 26], tone: 'good' }, { name: 'Risk', values: [6, 9, 7, 13, 10, 8], tone: 'warn' }]} /></SovaChartCard>
          <SovaChartCard title="Gauge"><SovaGaugeChart value={74} label="Health" tone="good" /></SovaChartCard>
          <SovaChartCard title="Scatter"><SovaScatterChart points={[{ x: 12, y: 72, label: 'A', tone: 'good' }, { x: 22, y: 48, label: 'B', tone: 'warn' }, { x: 30, y: 82, label: 'C', tone: 'accent' }, { x: 41, y: 35, label: 'D', tone: 'bad' }]} /></SovaChartCard>
          <SovaChartCard title="Radar"><SovaRadarChart metrics={[{ label: 'Fit', value: 86, max: 100 }, { label: 'Salary', value: 72, max: 100 }, { label: 'Remote', value: 92, max: 100 }, { label: 'Risk', value: 34, max: 100 }, { label: 'Speed', value: 68, max: 100 }]} /></SovaChartCard>
          <SovaChartCard title="Treemap"><SovaTreemapChart items={[{ name: 'Food', value: 42, tone: 'warn' }, { name: 'Housing', value: 31, tone: 'accent' }, { name: 'Savings', value: 27, tone: 'good' }, { name: 'Other', value: 12, tone: 'bad' }]} /></SovaChartCard>
          <SovaChartCard className="sova-chart-card-wide" title="Candlestick"><SovaCandlestickChart points={[{ label: 'Mon', open: 12, close: 18, low: 10, high: 20 }, { label: 'Tue', open: 18, close: 16, low: 14, high: 21 }, { label: 'Wed', open: 16, close: 24, low: 15, high: 26 }, { label: 'Thu', open: 24, close: 21, low: 19, high: 28 }, { label: 'Fri', open: 21, close: 29, low: 20, high: 31 }]} /></SovaChartCard>
        </div>
      </section>
    </div>
  </StoryFrame>
)
export const DashboardJobs = () => <DashboardTemplate theme="jobs" />
export const DashboardFinance = () => <DashboardTemplate theme="finance" />
export const DashboardTrading = () => <DashboardTemplate theme="trading" />
export const DashboardBrain = () => <DashboardTemplate theme="brain" />
