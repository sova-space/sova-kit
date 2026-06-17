import type { ReactNode } from 'react'
import {
  SovaBadge,
  SovaBrand,
  SovaButton,
  SovaCard,
  SovaEmptyState,
  SovaNav,
  SovaProvider,
  SovaShell,
  SovaStat,
  SovaTable,
  SovaTheme,
  SovaTopbar,
} from './index'
import './styles.css'

const storyWrap: React.CSSProperties = {
  display: 'grid',
  gap: 18,
  padding: 20,
}

const grid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: 14,
}

function StoryFrame({ theme, children }: { theme: SovaTheme; children: ReactNode }) {
  return (
    <SovaProvider theme={theme}>
      <div style={{ minHeight: 260, padding: 18 }}>
        {children}
      </div>
    </SovaProvider>
  )
}

function MiniDashboard({ theme, title, mark }: { theme: SovaTheme; title: string; mark: string }) {
  return (
    <StoryFrame theme={theme}>
      <SovaShell
        sidebar={
          <>
            <SovaBrand mark={mark} eyebrow="sova app" title={title} />
            <SovaNav
              items={[
                { label: 'Overview', active: true },
                { label: 'Activity' },
                { label: 'Settings' },
              ]}
            />
          </>
        }
      >
        <SovaTopbar
          eyebrow="operator view"
          title="Today"
          actions={
            <>
              <SovaBadge tone="good">live</SovaBadge>
              <SovaButton variant="primary">Sync</SovaButton>
            </>
          }
        />
        <div style={grid}>
          <SovaCard><SovaStat label="Open" value="12" tone="accent" /></SovaCard>
          <SovaCard><SovaStat label="Good" value="7" tone="good" /></SovaCard>
          <SovaCard><SovaStat label="Needs look" value="3" tone="warn" /></SovaCard>
        </div>
      </SovaShell>
    </StoryFrame>
  )
}

export const Themes = () => (
  <div style={storyWrap}>
    <div style={grid}>
      <StoryFrame theme="jobs">
        <SovaCard title="Jobs" description="Linear-ish light triage.">
          <SovaStat label="Good fits" value="7" tone="good" />
        </SovaCard>
      </StoryFrame>
      <StoryFrame theme="finance">
        <SovaCard title="Finance" description="Warm personal money OS.">
          <SovaStat label="This month" value="₴42.8k" tone="accent" />
        </SovaCard>
      </StoryFrame>
      <StoryFrame theme="trading">
        <SovaCard title="Trading" description="Dark dense operator dashboard.">
          <SovaStat label="Paper PnL" value="+18.4 USDT" tone="good" />
        </SovaCard>
      </StoryFrame>
      <StoryFrame theme="brain">
        <SovaCard title="Brain" description="Warm minimal inbox/actions.">
          <SovaStat label="Next actions" value="5" tone="accent" />
        </SovaCard>
      </StoryFrame>
    </div>
  </div>
)

export const Components = () => (
  <StoryFrame theme="jobs">
    <div style={storyWrap}>
      <div style={grid}>
        <SovaCard title="Stats">
          <div style={grid}>
            <SovaStat label="Neutral" value="12" />
            <SovaStat label="Good" value="+24%" tone="good" />
            <SovaStat label="Warn" value="3" tone="warn" />
            <SovaStat label="Bad" value="-2" tone="bad" />
          </div>
        </SovaCard>
        <SovaCard title="Badges">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <SovaBadge>neutral</SovaBadge>
            <SovaBadge tone="accent">accent</SovaBadge>
            <SovaBadge tone="good">good</SovaBadge>
            <SovaBadge tone="warn">warn</SovaBadge>
            <SovaBadge tone="bad">bad</SovaBadge>
          </div>
        </SovaCard>
        <SovaCard title="Actions">
          <div style={{ display: 'flex', gap: 8 }}>
            <SovaButton variant="primary">Primary</SovaButton>
            <SovaButton>Secondary</SovaButton>
          </div>
        </SovaCard>
        <SovaCard title="Empty">
          <SovaEmptyState title="Nothing here" description="Sync or add a source first." />
        </SovaCard>
      </div>
    </div>
  </StoryFrame>
)

export const DataTable = () => (
  <StoryFrame theme="jobs">
    <div style={storyWrap}>
      <SovaCard title="Triage table" description="Compact table style shared by Jobs, Finance, and Trading.">
        <SovaTable
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'status', header: 'Status' },
            { key: 'score', header: 'Score' },
          ]}
          rows={[
            { name: 'Arize AI', status: <SovaBadge tone="good">Good fit</SovaBadge>, score: '82' },
            { name: 'Revolut', status: <SovaBadge tone="accent">Watch</SovaBadge>, score: '78' },
            { name: 'OKX paper bot', status: <SovaBadge tone="warn">Research</SovaBadge>, score: '64' },
          ]}
        />
      </SovaCard>
    </div>
  </StoryFrame>
)

export const DashboardMockups = () => (
  <div style={{ display: 'grid', gap: 24 }}>
    <MiniDashboard theme="jobs" title="Jobs Bot" mark="JB" />
    <MiniDashboard theme="finance" title="Money OS" mark="₴" />
    <MiniDashboard theme="trading" title="Trader" mark="TR" />
    <MiniDashboard theme="brain" title="Brain" mark="SB" />
  </div>
)
