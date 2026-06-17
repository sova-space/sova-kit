import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SovaBadge, SovaBrand, SovaCard, SovaEmptyState, SovaNav, SovaProvider, SovaShell, SovaStat, SovaTable, SovaTopbar } from './index'

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
    render(<><SovaEmptyState title="No rows" description="Sync first" /><SovaTable columns={[{ key: 'company', header: 'Company' }]} rows={[{ company: 'Arize AI' }]} /></>)
    expect(screen.getByText('No rows')).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Company' })).toBeInTheDocument()
    expect(screen.getByText('Arize AI')).toBeInTheDocument()
  })
})
