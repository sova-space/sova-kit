import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

export type SovaTheme = 'jobs' | 'finance' | 'trading' | 'brain'
export type SovaTone = 'neutral' | 'accent' | 'good' | 'warn' | 'bad'

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function SovaProvider({ theme, children, className }: { theme: SovaTheme; children: ReactNode; className?: string }) {
  return <div className={cx('sova-root', className)} data-sova-theme={theme}>{children}</div>
}

export function SovaShell({ sidebar, children, className }: { sidebar: ReactNode; children: ReactNode; className?: string }) {
  return <div className={cx('sova-shell', className)}><aside className="sova-sidebar">{sidebar}</aside><main className="sova-main">{children}</main></div>
}

export function SovaTopbar({ eyebrow, title, actions, children }: { eyebrow?: ReactNode; title: ReactNode; actions?: ReactNode; children?: ReactNode }) {
  return <header className="sova-topbar"><div>{eyebrow ? <p className="sova-eyebrow">{eyebrow}</p> : null}<h1 className="sova-title">{title}</h1>{children}</div>{actions ? <div className="sova-actions">{actions}</div> : null}</header>
}

export function SovaBrand({ mark, eyebrow, title }: { mark: ReactNode; eyebrow?: ReactNode; title: ReactNode }) {
  return <div className="sova-brand"><div className="sova-brand-mark">{mark}</div><div>{eyebrow ? <p className="sova-eyebrow">{eyebrow}</p> : null}<strong>{title}</strong></div></div>
}

export type SovaNavItem = { label: ReactNode; href?: string; active?: boolean; icon?: ReactNode; onClick?: () => void }
export function SovaNav({ items }: { items: SovaNavItem[] }) {
  return <nav className="sova-nav" aria-label="Main navigation">{items.map((item, index) => {
    const content = <>{item.icon}{item.label}</>
    const common = { className: cx('sova-nav-item', item.active && 'sova-active'), 'aria-current': item.active ? 'page' as const : undefined }
    return item.href ? <a key={`${item.href}-${index}`} href={item.href} {...common}>{content}</a> : <button key={index} type="button" onClick={item.onClick} {...common}>{content}</button>
  })}</nav>
}

export function SovaCard({ title, description, children, className }: { title?: ReactNode; description?: ReactNode; children: ReactNode; className?: string }) {
  return <section className={cx('sova-card', className)}>{title ? <h2 className="sova-card-title">{title}</h2> : null}{description ? <p className="sova-card-description">{description}</p> : null}{children}</section>
}

export function SovaButton({ variant = 'secondary', className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' }) {
  return <button className={cx('sova-button', variant === 'primary' && 'sova-button-primary', className)} {...props} />
}

export function SovaBadge({ tone = 'neutral', variant = 'soft', dot = false, className, children, ...props }: HTMLAttributes<HTMLSpanElement> & { tone?: SovaTone; variant?: 'soft' | 'solid' | 'outline'; dot?: boolean }) {
  return <span className={cx('sova-badge', `sova-badge-${variant}`, tone !== 'neutral' && `sova-badge-${tone}`, dot && 'sova-badge-with-dot', className)} {...props}>{dot ? <span className="sova-badge-dot" aria-hidden="true" /> : null}{children}</span>
}

export function SovaStat({ label, value, tone = 'neutral' }: { label: ReactNode; value: ReactNode; tone?: SovaTone }) {
  return <div className={cx('sova-stat', tone !== 'neutral' && `sova-stat-${tone}`)}><span className="sova-stat-label">{label}</span><strong className="sova-stat-value">{value}</strong></div>
}

export function SovaEmptyState({ title, description }: { title: ReactNode; description?: ReactNode }) {
  return <div className="sova-empty"><strong>{title}</strong>{description ? <p>{description}</p> : null}</div>
}

export type SovaColumn<Row> = { key: keyof Row & string; header: ReactNode; render?: (row: Row) => ReactNode }
export function SovaTable<Row extends Record<string, ReactNode>>({ columns, rows }: { columns: SovaColumn<Row>[]; rows: Row[] }) {
  return <div className="sova-table-wrap"><table className="sova-table"><thead><tr>{columns.map(column => <th key={column.key}>{column.header}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{columns.map(column => <td key={column.key}>{column.render ? column.render(row) : row[column.key]}</td>)}</tr>)}</tbody></table></div>
}

export function SovaPageHeader({ eyebrow, title, description, actions, meta }: { eyebrow?: ReactNode; title: ReactNode; description?: ReactNode; actions?: ReactNode; meta?: ReactNode }) {
  return <div className="sova-page-header"><div>{eyebrow ? <p className="sova-eyebrow">{eyebrow}</p> : null}<div className="sova-page-title-row"><h1 className="sova-page-title">{title}</h1>{meta ? <div className="sova-page-meta">{meta}</div> : null}</div>{description ? <p className="sova-page-description">{description}</p> : null}</div>{actions ? <div className="sova-actions">{actions}</div> : null}</div>
}

export type SovaKpiItem = { label: ReactNode; value: ReactNode; hint?: ReactNode; tone?: SovaTone }
export function SovaKpiRow({ items }: { items: SovaKpiItem[] }) {
  return <div className="sova-kpi-row">{items.map((item, index) => <SovaCard key={index} className="sova-kpi-card"><SovaStat label={item.label} value={item.value} tone={item.tone} />{item.hint ? <p className="sova-kpi-hint">{item.hint}</p> : null}</SovaCard>)}</div>
}

export function SovaToolbar({ left, right }: { left?: ReactNode; right?: ReactNode }) {
  return <div className="sova-toolbar"><div className="sova-toolbar-left">{left}</div><div className="sova-toolbar-right">{right}</div></div>
}

export type SovaInspectorSection = { title: ReactNode; content: ReactNode }
export function SovaInspector({ title, subtitle, actions, sections }: { title: ReactNode; subtitle?: ReactNode; actions?: ReactNode; sections: SovaInspectorSection[] }) {
  return <aside className="sova-inspector"><div className="sova-inspector-head"><div><h2>{title}</h2>{subtitle ? <p>{subtitle}</p> : null}</div>{actions ? <div className="sova-actions">{actions}</div> : null}</div>{sections.map((section, index) => <section className="sova-inspector-section" key={index}><h3>{section.title}</h3><div>{section.content}</div></section>)}</aside>
}

export type SovaActivityItem = { title: ReactNode; detail?: ReactNode; time?: ReactNode; tone?: SovaTone }
export function SovaActivityFeed({ items }: { items: SovaActivityItem[] }) {
  return <div className="sova-activity-feed">{items.map((item, index) => <div className="sova-activity-item" key={index}><span className={cx('sova-activity-dot', item.tone && item.tone !== 'neutral' && `sova-activity-dot-${item.tone}`)} /><div><div className="sova-activity-title">{item.title}</div>{item.detail ? <div className="sova-activity-detail">{item.detail}</div> : null}</div>{item.time ? <span className="sova-activity-time">{item.time}</span> : null}</div>)}</div>
}

export type SovaSettingsItem = { label: ReactNode; description?: ReactNode; control?: ReactNode }
export function SovaSettingsList({ items }: { items: SovaSettingsItem[] }) {
  return <div className="sova-settings-list">{items.map((item, index) => <div className="sova-settings-item" key={index}><div><strong>{item.label}</strong>{item.description ? <p>{item.description}</p> : null}</div>{item.control ? <div>{item.control}</div> : null}</div>)}</div>
}

export function SovaDashboardGrid({ children, inspector }: { children: ReactNode; inspector?: ReactNode }) {
  return <div className={cx('sova-dashboard-grid', Boolean(inspector) && 'sova-dashboard-grid-with-inspector')}><div className="sova-dashboard-main">{children}</div>{inspector ? <div className="sova-dashboard-inspector">{inspector}</div> : null}</div>
}

export type SovaProgressItem = { label: ReactNode; value: ReactNode; percent: number; tone?: SovaTone }
export function SovaProgressList({ items }: { items: SovaProgressItem[] }) {
  return <div className="sova-progress-list">{items.map((item, index) => <div className="sova-progress-item" key={index}><div className="sova-progress-row"><span>{item.label}</span><strong>{item.value}</strong></div><div className="sova-progress-track"><span className={cx(item.tone && item.tone !== 'neutral' && `sova-progress-${item.tone}`)} style={{ width: `${Math.max(0, Math.min(100, item.percent))}%` }} /></div></div>)}</div>
}

export type SovaSparkPoint = { value: number; tone?: SovaTone }
export function SovaSparkBars({ points, height = 72 }: { points: SovaSparkPoint[]; height?: number }) {
  const max = Math.max(1, ...points.map((point) => Math.abs(point.value)))
  return <div className="sova-spark-bars" style={{ minHeight: height }}>{points.map((point, index) => <span key={index} className={cx(point.value < 0 && 'sova-spark-negative', point.tone && point.tone !== 'neutral' && `sova-spark-${point.tone}`)} style={{ height: `${Math.max(8, Math.round((Math.abs(point.value) / max) * height))}px` }} />)}</div>
}

function toneVar(tone: SovaTone | undefined) {
  if (tone === 'good') return 'var(--sova-good)'
  if (tone === 'warn') return 'var(--sova-warn)'
  if (tone === 'bad') return 'var(--sova-bad)'
  if (tone === 'accent') return 'var(--sova-accent)'
  return 'var(--sova-muted)'
}

export function SovaLineChart({ points, tone = 'accent', height = 140, area = true }: { points: number[]; tone?: SovaTone; height?: number; area?: boolean }) {
  const safePoints = points.length ? points : [0]
  const width = 360
  const pad = 10
  const min = Math.min(...safePoints, 0)
  const max = Math.max(...safePoints, 1)
  const span = Math.max(1, max - min)
  const coords = safePoints.map((value, index) => {
    const x = pad + (index / Math.max(1, safePoints.length - 1)) * (width - pad * 2)
    const y = pad + ((max - value) / span) * (height - pad * 2)
    return [x, y]
  })
  const line = coords.map(([x, y]) => `${x},${y}`).join(' ')
  const areaPoints = `${pad},${height - pad} ${line} ${width - pad},${height - pad}`
  return <svg className="sova-line-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Line chart" style={{ color: toneVar(tone) }}>{area ? <polygon points={areaPoints} /> : null}<polyline points={line} /><line x1={pad} x2={width - pad} y1={height - pad} y2={height - pad} /></svg>
}

export type SovaDonutSegment = { label: ReactNode; value: number; tone?: SovaTone }
export function SovaDonutChart({ segments, center, size = 136 }: { segments: SovaDonutSegment[]; center?: ReactNode; size?: number }) {
  const total = Math.max(1, segments.reduce((sum, segment) => sum + Math.max(0, segment.value), 0))
  let cursor = 0
  const stops = segments.map((segment) => {
    const start = cursor
    const end = cursor + (Math.max(0, segment.value) / total) * 100
    cursor = end
    return `${toneVar(segment.tone)} ${start}% ${end}%`
  }).join(', ')
  return <div className="sova-donut-wrap"><div className="sova-donut" style={{ width: size, height: size, background: `conic-gradient(${stops})` }}><div>{center}</div></div><div className="sova-donut-legend">{segments.map((segment, index) => <div key={index}><span style={{ background: toneVar(segment.tone) }} /><strong>{segment.label}</strong><em>{segment.value}</em></div>)}</div></div>
}

export type SovaBarItem = { label: ReactNode; value: number; tone?: SovaTone }
export function SovaBarChart({ items, height = 150 }: { items: SovaBarItem[]; height?: number }) {
  const safeItems = items.length ? items : [{ label: '—', value: 0 }]
  const max = Math.max(1, ...safeItems.map((item) => Math.abs(item.value)))
  return <div className="sova-bar-chart" style={{ minHeight: height }}>{safeItems.map((item, index) => <div key={index} className="sova-bar-item"><div className="sova-bar-column"><span style={{ height: `${Math.max(6, Math.round((Math.abs(item.value) / max) * height))}px`, background: toneVar(item.tone) }} /></div><strong>{item.label}</strong><em>{item.value}</em></div>)}</div>
}

export type SovaStackedSegment = { label: ReactNode; value: number; tone?: SovaTone }
export function SovaStackedBar({ segments, label, value }: { segments: SovaStackedSegment[]; label?: ReactNode; value?: ReactNode }) {
  const total = Math.max(1, segments.reduce((sum, segment) => sum + Math.max(0, segment.value), 0))
  return <div className="sova-stacked"><div className="sova-stacked-head">{label ? <strong>{label}</strong> : <span />}{value ? <em>{value}</em> : null}</div><div className="sova-stacked-track">{segments.map((segment, index) => <span key={index} title={String(segment.label)} style={{ width: `${(Math.max(0, segment.value) / total) * 100}%`, background: toneVar(segment.tone) }} />)}</div><div className="sova-stacked-legend">{segments.map((segment, index) => <span key={index}><i style={{ background: toneVar(segment.tone) }} />{segment.label}</span>)}</div></div>
}

export type SovaHeatmapCell = { label: ReactNode; value: number; tone?: SovaTone }
export function SovaHeatmap({ cells, columns = 7 }: { cells: SovaHeatmapCell[]; columns?: number }) {
  const max = Math.max(1, ...cells.map((cell) => Math.abs(cell.value)))
  return <div className="sova-heatmap" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>{cells.map((cell, index) => <div key={index} title={`${String(cell.label)}: ${cell.value}`} style={{ background: `color-mix(in srgb, ${toneVar(cell.tone || 'accent')} ${Math.max(10, Math.round((Math.abs(cell.value) / max) * 88))}%, var(--sova-surface-soft))` }}><span>{cell.label}</span><strong>{cell.value}</strong></div>)}</div>
}

export type SovaFlowItem = { label: ReactNode; value: number; tone?: SovaTone }
export function SovaFlowChart({ source, center, items }: { source: ReactNode; center: ReactNode; items: SovaFlowItem[] }) {
  const max = Math.max(1, ...items.map((item) => Math.abs(item.value)))
  return <div className="sova-flow"><div className="sova-flow-node">{source}</div><div className="sova-flow-center">{center}</div><div className="sova-flow-lines">{items.map((item, index) => <div key={index} className="sova-flow-line"><span style={{ height: `${Math.max(4, Math.round((Math.abs(item.value) / max) * 18))}px`, background: toneVar(item.tone) }} /><strong>{item.label}</strong><em>{item.value}</em></div>)}</div></div>
}

export function SovaChartCard({ title, description, children, footer, className }: { title: ReactNode; description?: ReactNode; children: ReactNode; footer?: ReactNode; className?: string }) {
  return <SovaCard className={cx('sova-chart-card', className)}><div className="sova-chart-card-head"><div><h2 className="sova-card-title">{title}</h2>{description ? <p className="sova-card-description">{description}</p> : null}</div>{footer ? <div className="sova-chart-card-footer">{footer}</div> : null}</div>{children}</SovaCard>
}

export function SovaSplitCard({ title, description, main, side }: { title: ReactNode; description?: ReactNode; main: ReactNode; side: ReactNode }) {
  return <SovaCard className="sova-split-card"><div className="sova-split-head"><div><h2 className="sova-card-title">{title}</h2>{description ? <p className="sova-card-description">{description}</p> : null}</div></div><div className="sova-split-body"><div>{main}</div><aside>{side}</aside></div></SovaCard>
}
