import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  SovaActivityFeed,
  SovaBadge,
  SovaBarChart,
  SovaBrand,
  SovaButton,
  SovaCard,
  SovaChartCard,
  SovaDashboardGrid,
  SovaDonutChart,
  SovaInspector,
  SovaKpiRow,
  SovaLineChart,
  SovaNav,
  SovaPageHeader,
  SovaProgressList,
  SovaProvider,
  SovaSankeyChart,
  SovaShell,
  SovaSplitCard,
  SovaTable,
  SovaToolbar,
  SovaTopbar,
} from '@sova/kit'
import '@sova/kit/style.css'
import './style.css'

const rows = [
  { name: 'Primary queue', status: <SovaBadge tone="good">Ready</SovaBadge>, source: 'api', score: '91' },
  { name: 'Needs review', status: <SovaBadge tone="warn">Watch</SovaBadge>, source: 'manual', score: '68' },
  { name: 'Blocked source', status: <SovaBadge tone="bad">Blocked</SovaBadge>, source: 'sync', score: '12' },
]

function App() {
  return (
    <SovaProvider theme="jobs">
      <SovaShell
        sidebar={
          <>
            <SovaBrand mark="SV" eyebrow="sova space" title="New Bot" />
            <SovaNav items={[{ label: 'Overview', active: true }, { label: 'Queue' }, { label: 'Sources' }, { label: 'Settings' }]} />
          </>
        }
      >
        <SovaTopbar eyebrow="operator dashboard" title="Command center" actions={<><SovaBadge tone="good">Live</SovaBadge><SovaButton variant="primary">Sync</SovaButton></>} />
        <div className="sova-surface-band">
          <SovaPageHeader eyebrow="today" title="What needs attention" description="Copy this template into a bot repo, then replace fake rows with product data." />
          <SovaKpiRow items={[{ label: 'Open', value: '24', tone: 'accent' }, { label: 'Ready', value: '12', tone: 'good' }, { label: 'Watch', value: '7', tone: 'warn' }, { label: 'Blocked', value: '2', tone: 'bad' }]} />
        </div>
        <SovaDashboardGrid
          inspector={<SovaInspector title="Selected" subtitle="Right rail for action detail." sections={[{ title: 'Activity', content: <SovaActivityFeed items={[{ title: 'Template loaded', time: 'now', tone: 'good' }]} /> }]} />}
        >
          <SovaToolbar left={<input className="sova-search" placeholder="Search…" />} right={<><SovaBadge>All</SovaBadge><SovaBadge tone="good">Ready</SovaBadge></>} />
          <SovaSplitCard title="Health" description="Line + donut primitives for real app data." main={<div className="sova-chart-grid"><SovaLineChart points={[4, 7, 5, 9, 8, 12, 10, 15]} /><SovaDonutChart center="80%" segments={[{ label: 'Ready', value: 80, tone: 'good' }, { label: 'Noise', value: 18, tone: 'warn' }, { label: 'Blocked', value: 2, tone: 'bad' }]} /></div>} side={<SovaProgressList items={[{ label: 'Coverage', value: '80%', percent: 80, tone: 'good' }, { label: 'Noise', value: '18%', percent: 18, tone: 'warn' }]} />} />
          <SovaChartCard title="Volume" description="Bar chart for comparison across sources/categories."><SovaBarChart items={[{ label: 'Mon', value: 12, tone: 'accent' }, { label: 'Tue', value: 18, tone: 'good' }, { label: 'Wed', value: 9, tone: 'warn' }, { label: 'Thu', value: 22, tone: 'accent' }]} /></SovaChartCard>
          <SovaChartCard title="Sankey" description="ECharts-powered flow for finance/jobs/trading analytics."><SovaSankeyChart height={260} nodes={[{ name: 'Source', tone: 'accent' }, { name: 'Review', tone: 'warn' }, { name: 'Ready', tone: 'good' }, { name: 'Blocked', tone: 'bad' }]} links={[{ source: 'Source', target: 'Review', value: 20 }, { source: 'Review', target: 'Ready', value: 14 }, { source: 'Review', target: 'Blocked', value: 6 }]} /></SovaChartCard>
          <SovaCard title="Work queue"><SovaTable columns={[{ key: 'name', header: 'Name' }, { key: 'status', header: 'Status' }, { key: 'source', header: 'Source' }, { key: 'score', header: 'Score' }]} rows={rows} /></SovaCard>
        </SovaDashboardGrid>
      </SovaShell>
    </SovaProvider>
  )
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
