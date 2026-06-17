import type { ReactNode } from 'react'
import {
  SovaActivityFeed,
  SovaBadge,
  SovaBrand,
  SovaButton,
  SovaCard,
  SovaDashboardGrid,
  SovaEmptyState,
  SovaInspector,
  SovaKpiRow,
  SovaNav,
  SovaPageHeader,
  SovaProgressList,
  SovaProvider,
  SovaSettingsList,
  SovaShell,
  SovaSparkBars,
  SovaSplitCard,
  SovaStat,
  SovaTable,
  SovaToolbar,
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
            description="Chart frame + short progress list. Apps own real data/charts; kit owns shape."
            main={<SovaSparkBars points={[6, 9, 5, 12, -4, 10, 14, 9, 16, -2, 18, 22].map((value) => ({ value }))} />}
            side={<SovaProgressList items={[{ label: 'Coverage', value: '74%', percent: 74, tone: 'accent' }, { label: 'Confidence', value: '61%', percent: 61, tone: 'good' }, { label: 'Risk', value: '22%', percent: 22, tone: 'warn' }]} />}
          />
          <SovaCard title="Work queue" description="Table-first surface. Product apps own domain data; kit owns layout language.">
            <SovaTable columns={[{ key: 'name', header: 'Name' }, { key: 'status', header: 'Status' }, { key: 'source', header: 'Source' }, { key: 'score', header: 'Score' }]} rows={rows} />
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
      <SovaSplitCard title="Mini chart" description="Tiny chart placeholder for app-specific chart libraries." main={<SovaSparkBars points={[3, 8, 6, 10, -2, 14, 9].map((value) => ({ value }))} />} side={<SovaProgressList items={[{ label: 'Done', value: '80%', percent: 80, tone: 'good' }, { label: 'Watch', value: '20%', percent: 20, tone: 'warn' }]} />} />
      <div style={grid}>
        <SovaCard title="Badges"><div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><SovaBadge>neutral</SovaBadge><SovaBadge tone="accent">accent</SovaBadge><SovaBadge tone="good">good</SovaBadge><SovaBadge tone="warn">warn</SovaBadge><SovaBadge tone="bad">bad</SovaBadge></div></SovaCard>
        <SovaCard title="Actions"><div style={{ display: 'flex', gap: 8 }}><SovaButton variant="primary">Primary</SovaButton><SovaButton>Secondary</SovaButton></div></SovaCard>
        <SovaCard title="Empty"><SovaEmptyState title="Nothing here" description="Sync or add a source first." /></SovaCard>
      </div>
    </div>
  </StoryFrame>
)

export const DashboardJobs = () => <DashboardTemplate theme="jobs" />
export const DashboardFinance = () => <DashboardTemplate theme="finance" />
export const DashboardTrading = () => <DashboardTemplate theme="trading" />
export const DashboardBrain = () => <DashboardTemplate theme="brain" />
