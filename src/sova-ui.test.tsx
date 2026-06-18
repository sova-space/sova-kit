import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SovaActivityFeed, SovaAreaChart, SovaBadge, SovaBarChart, SovaBrand, SovaCandlestickChart, SovaCard, SovaChartCard, SovaDashboardGrid, SovaDonutChart, SovaEmptyState, SovaFlowChart, SovaHeatmap, SovaInspector, SovaKpiRow, SovaLineChart, SovaNav, SovaPageHeader, SovaProgressList, SovaProvider, SovaRadarChart, SovaRankingChart, SovaSettingsList, SovaShell, SovaSparkBars, SovaSplitCard, SovaStackedBar, SovaStat, SovaTable, SovaTableCard, SovaToolbar, SovaTopbar, SovaTreemapChart } from './index'

describe('@sova/ui', () => {
  it('applies the selected product theme', () => {
    render(<SovaProvider theme="finance"><span>Money</span></SovaProvider>)
    expect(screen.getByText('Money').parentElement).toHaveAttribute('data-sova-theme', 'finance')
  })

  it('renders common shell primitives', () => {
    render(
      <SovaProvider theme="jobs">
        <SovaShell sidebar={<><SovaBrand mark="JB" eyebrow="career ops" title="Jobs Bot" /><SovaNav items={[{ label: 'Jobs', active: true }, { label: 'Sources' }]} /></>}>
          <SovaTopbar eyebrow="US/EU product focus" title="Job triage" actions={<SovaBadge tone="good">live</SovaBadge>} />
          <SovaCard title="Pipeline"><SovaStat label="Good fits" value="7" tone="good" /></SovaCard>
        </SovaShell>
      </SovaProvider>,
    )
    expect(screen.getByText('Jobs Bot')).toBeInTheDocument()
    expect(screen.getByText('Jobs')).toHaveAttribute('aria-current', 'page')
    expect(screen.getByText('Job triage')).toBeInTheDocument()
    expect(screen.getByText('Good fits')).toBeInTheDocument()
  })

  it('renders empty state and tables', () => {
    render(<><SovaEmptyState title="No rows" description="Sync first" /><SovaTableCard title="Companies table" density="compact" caption="Companies" columns={[{ key: 'company', header: 'Company' }, { key: 'score', header: 'Score', align: 'right', mono: true }]} rows={[{ company: 'Arize AI', score: 82 }]} /><SovaTable columns={[{ key: 'company', header: 'Company' }]} rows={[]} empty="Nothing matched" /></>)
    expect(screen.getByText('No rows')).toBeInTheDocument()
    expect(screen.getByText('Companies')).toBeInTheDocument()
    expect(screen.getAllByRole('columnheader', { name: 'Company' })[0]).toBeInTheDocument()
    expect(screen.getByText('Arize AI')).toBeInTheDocument()
    expect(screen.getByText('Nothing matched')).toBeInTheDocument()
  })

  it('renders dashboard template blocks', () => {
    render(
      <SovaProvider theme="jobs">
        <SovaPageHeader eyebrow="today" title="Command center" description="Review work" actions={<SovaBadge>live</SovaBadge>} />
        <SovaKpiRow items={[{ label: 'Open', value: '24', tone: 'accent' }]} />
        <SovaToolbar left="Filters" right={<SovaBadge tone="good">Good</SovaBadge>} />
        <SovaDashboardGrid
          inspector={<SovaInspector title="Selected" sections={[{ title: 'Activity', content: <SovaActivityFeed items={[{ title: 'Synced', time: '2m', tone: 'good' }]} /> }]} />}
        >
          <SovaSplitCard title="Health" main={<><SovaSparkBars points={[{ value: 3 }, { value: -1 }, { value: 5 }]} /><SovaLineChart points={[1, 3, 2, 5]} /><SovaDonutChart center="80%" segments={[{ label: 'Ready', value: 80, tone: 'good' }, { label: 'Watch', value: 20, tone: 'warn' }]} /></>} side={<SovaProgressList items={[{ label: 'Coverage', value: '80%', percent: 80, tone: 'good' }]} />} />
          <SovaChartCard title="Charts"><SovaBarChart items={[{ label: 'A', value: 1 }]} /><SovaRankingChart items={[{ label: 'A', value: 1 }]} /><SovaStackedBar segments={[{ label: 'A', value: 1 }]} /><SovaHeatmap cells={[{ label: 'M', value: 1 }]} /><SovaFlowChart source="In" center="Core" items={[{ label: 'Out', value: 1 }]} /><SovaAreaChart labels={['A']} values={[1]} /><SovaRadarChart metrics={[{ label: 'Fit', value: 1 }]} /><SovaTreemapChart items={[{ name: 'A', value: 1 }]} /><SovaCandlestickChart points={[{ label: 'A', open: 1, close: 2, low: 1, high: 3 }]} /></SovaChartCard>
          <SovaSettingsList items={[{ label: 'Compact mode', description: 'Default on' }]} />
        </SovaDashboardGrid>
      </SovaProvider>,
    )

    expect(screen.getByText('Command center')).toBeInTheDocument()
    expect(screen.getByText('Open')).toBeInTheDocument()
    expect(screen.getByText('Filters')).toBeInTheDocument()
    expect(screen.getByText('Selected')).toBeInTheDocument()
    expect(screen.getByText('Synced')).toBeInTheDocument()
    expect(screen.getByText('Compact mode')).toBeInTheDocument()
  })
})
