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
  SovaProvider,
  SovaSettingsList,
  SovaShell,
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

const jobsRows = [
  { company: 'Arize AI', status: <SovaBadge tone="good">Good fit</SovaBadge>, owner: 'career-ops', score: '82' },
  { company: 'Revolut', status: <SovaBadge tone="accent">Watch</SovaBadge>, owner: 'manual', score: '78' },
  { company: 'Stripe', status: <SovaBadge tone="warn">Stretch</SovaBadge>, owner: 'research', score: '64' },
]

const financeRows = [
  { company: 'Food', status: <SovaBadge tone="warn">₴8.2k</SovaBadge>, owner: 'Monobank', score: '31%' },
  { company: 'Transport', status: <SovaBadge tone="good">₴2.1k</SovaBadge>, owner: 'Cash', score: '8%' },
  { company: 'Subscriptions', status: <SovaBadge tone="accent">₴1.6k</SovaBadge>, owner: 'Wise', score: '6%' },
]

const tradingRows = [
  { company: 'BTC-USDT', status: <SovaBadge tone="good">Long</SovaBadge>, owner: 'trend-ai', score: '+18.4' },
  { company: 'ETH-USDT', status: <SovaBadge tone="warn">Watch</SovaBadge>, owner: 'liquidity', score: '-2.1' },
  { company: 'SOL-USDT', status: <SovaBadge tone="accent">Paper</SovaBadge>, owner: 'rsi-cross', score: '+4.8' },
]

function DashboardTemplate({ theme, title, mark, rows }: { theme: SovaTheme; title: string; mark: string; rows: typeof jobsRows }) {
  return (
    <SovaProvider theme={theme}>
      <SovaShell
        sidebar={
          <>
            <SovaBrand mark={mark} eyebrow="sova space" title={title} />
            <SovaNav items={[{ label: 'Overview', active: true }, { label: 'Pipeline' }, { label: 'Reports' }, { label: 'Settings' }]} />
          </>
        }
      >
        <SovaTopbar
          eyebrow="operator dashboard"
          title="Command center"
          actions={<><SovaBadge tone="good">Live</SovaBadge><SovaButton>Export</SovaButton><SovaButton variant="primary">Sync</SovaButton></>}
        />
        <SovaPageHeader
          eyebrow="today"
          title="What needs attention"
          description="Reusable dashboard layout: compact KPIs, working table, and right inspector. Inspired by shadcn/Cruip admin rhythm, but tuned for Sova bots."
          meta={<SovaBadge tone="accent">Template</SovaBadge>}
        />
        <SovaKpiRow
          items={[
            { label: 'Open', value: '24', hint: '6 changed today', tone: 'accent' },
            { label: 'Good', value: '12', hint: 'ready for action', tone: 'good' },
            { label: 'Watch', value: '7', hint: 'needs review', tone: 'warn' },
            { label: 'Blocked', value: '2', hint: 'waiting on input', tone: 'bad' },
          ]}
        />
        <SovaDashboardGrid
          inspector={
            <SovaInspector
              title="Selected item"
              subtitle="Right rail for detail, actions, and provenance."
              actions={<SovaBadge tone="good">active</SovaBadge>}
              sections={[
                { title: 'Next action', content: <p style={{ margin: 0, color: 'var(--sova-muted)', fontSize: 13 }}>Review fit, then sync or archive. Keep copy short.</p> },
                { title: 'Activity', content: <SovaActivityFeed items={[{ title: 'Data refreshed', detail: 'Generated from source export', time: '2m', tone: 'good' }, { title: 'Threshold changed', detail: 'Priority moved to watch', time: '1h', tone: 'warn' }]} /> },
              ]}
            />
          }
        >
          <SovaToolbar left={<Search placeholder="Search rows" />} right={<><SovaBadge>All</SovaBadge><SovaBadge tone="good">Good</SovaBadge><SovaBadge tone="warn">Watch</SovaBadge></>} />
          <SovaCard title="Work queue" description="Table-first surface. Product apps own the domain data; kit owns the layout language.">
            <SovaTable columns={[{ key: 'company', header: 'Name' }, { key: 'status', header: 'Status' }, { key: 'owner', header: 'Source' }, { key: 'score', header: 'Score' }]} rows={rows} />
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
      <div style={grid}>
        <SovaCard title="Badges"><div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><SovaBadge>neutral</SovaBadge><SovaBadge tone="accent">accent</SovaBadge><SovaBadge tone="good">good</SovaBadge><SovaBadge tone="warn">warn</SovaBadge><SovaBadge tone="bad">bad</SovaBadge></div></SovaCard>
        <SovaCard title="Actions"><div style={{ display: 'flex', gap: 8 }}><SovaButton variant="primary">Primary</SovaButton><SovaButton>Secondary</SovaButton></div></SovaCard>
        <SovaCard title="Empty"><SovaEmptyState title="Nothing here" description="Sync or add a source first." /></SovaCard>
      </div>
    </div>
  </StoryFrame>
)

export const DashboardJobs = () => <DashboardTemplate theme="jobs" title="Jobs Bot" mark="JB" rows={jobsRows} />
export const DashboardFinance = () => <DashboardTemplate theme="finance" title="Money OS" mark="₴" rows={financeRows} />
export const DashboardTrading = () => <DashboardTemplate theme="trading" title="Trader" mark="TR" rows={tradingRows} />
export const DashboardBrain = () => <DashboardTemplate theme="brain" title="Brain" mark="SB" rows={jobsRows} />
