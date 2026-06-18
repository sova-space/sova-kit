import type { EChartsOption, EChartsType } from 'echarts'
import { useEffect, useRef, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react'

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

export type SovaBadgeVariant = 'soft' | 'solid' | 'outline' | 'ghost'
export type SovaBadgeSize = 'xs' | 'sm' | 'md'
export function SovaBadge({ tone = 'neutral', variant = 'soft', size = 'sm', dot = false, pulse = false, icon, className, children, ...props }: HTMLAttributes<HTMLSpanElement> & { tone?: SovaTone; variant?: SovaBadgeVariant; size?: SovaBadgeSize; dot?: boolean; pulse?: boolean; icon?: ReactNode }) {
  return <span className={cx('sova-badge', `sova-badge-${variant}`, `sova-badge-${size}`, tone !== 'neutral' && `sova-badge-${tone}`, dot && 'sova-badge-with-dot', pulse && 'sova-badge-pulse', className)} {...props}>{dot ? <span className="sova-badge-dot" aria-hidden="true" /> : null}{icon ? <span className="sova-badge-icon" aria-hidden="true">{icon}</span> : null}<span>{children}</span></span>
}

export function SovaStat({ label, value, tone = 'neutral' }: { label: ReactNode; value: ReactNode; tone?: SovaTone }) {
  return <div className={cx('sova-stat', tone !== 'neutral' && `sova-stat-${tone}`)}><span className="sova-stat-label">{label}</span><strong className="sova-stat-value">{value}</strong></div>
}

export function SovaEmptyState({ title, description }: { title: ReactNode; description?: ReactNode }) {
  return <div className="sova-empty"><strong>{title}</strong>{description ? <p>{description}</p> : null}</div>
}

export type SovaColumn<Row> = {
  key: keyof Row & string
  header: ReactNode
  render?: (row: Row) => ReactNode
  align?: 'left' | 'center' | 'right'
  width?: string | number
  mono?: boolean
}
export function SovaTable<Row extends Record<string, unknown>>({ columns, rows, caption, empty = 'No rows', density = 'normal', stickyHeader = false, rowKey, onRowClick, className }: { columns: SovaColumn<Row>[]; rows: Row[]; caption?: ReactNode; empty?: ReactNode; density?: 'compact' | 'normal'; stickyHeader?: boolean; rowKey?: (row: Row, index: number) => string | number; onRowClick?: (row: Row) => void; className?: string }) {
  return <div className={cx('sova-table-wrap', stickyHeader && 'sova-table-sticky', className)}><table className={cx('sova-table', density === 'compact' && 'sova-table-compact', onRowClick && 'sova-table-clickable')}>{caption ? <caption>{caption}</caption> : null}<thead><tr>{columns.map(column => <th key={column.key} style={{ width: column.width, textAlign: column.align }}>{column.header}</th>)}</tr></thead><tbody>{rows.length ? rows.map((row, rowIndex) => <tr key={rowKey ? rowKey(row, rowIndex) : rowIndex} onClick={onRowClick ? () => onRowClick(row) : undefined}>{columns.map(column => <td key={column.key} className={cx(column.mono && 'sova-table-mono')} style={{ textAlign: column.align }}>{column.render ? column.render(row) : String(row[column.key] ?? '')}</td>)}</tr>) : <tr><td className="sova-table-empty" colSpan={columns.length}>{empty}</td></tr>}</tbody></table></div>
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

function toneHex(tone: SovaTone | undefined) {
  if (tone === 'good') return '#0f9f6e'
  if (tone === 'warn') return '#c98212'
  if (tone === 'bad') return '#d84c4c'
  if (tone === 'accent') return '#0f766e'
  return '#70706a'
}

export function SovaLineChart({ points, tone = 'accent', height = 140, area = true }: { points: number[]; tone?: SovaTone; height?: number; area?: boolean }) {
  const safePoints = points.length ? points : [0]
  const width = 360
  const pad = 12
  const min = Math.min(...safePoints, 0)
  const max = Math.max(...safePoints, 1)
  const span = Math.max(1, max - min)
  const coords = safePoints.map((value, index) => {
    const x = pad + (index / Math.max(1, safePoints.length - 1)) * (width - pad * 2)
    const y = pad + ((max - value) / span) * (height - pad * 2)
    return [x, y] as const
  })
  const path = coords.map(([x, y], index) => {
    if (index === 0) return `M ${x} ${y}`
    const [prevX, prevY] = coords[index - 1]
    const midX = (prevX + x) / 2
    return `C ${midX} ${prevY}, ${midX} ${y}, ${x} ${y}`
  }).join(' ')
  const areaPath = `${path} L ${width - pad} ${height - pad} L ${pad} ${height - pad} Z`
  const id = `sova-line-${tone}-${safePoints.length}-${Math.round(max * 10)}`
  return <svg className="sova-line-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Trend chart" style={{ color: toneVar(tone) }}><defs><linearGradient id={id} x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="currentColor" stopOpacity="0.22" /><stop offset="100%" stopColor="currentColor" stopOpacity="0" /></linearGradient></defs><line x1={pad} x2={width - pad} y1={height - pad} y2={height - pad} /> <line className="sova-line-chart-grid" x1={pad} x2={width - pad} y1={(height - pad) * 0.5} y2={(height - pad) * 0.5} />{area ? <path className="sova-line-area" d={areaPath} fill={`url(#${id})`} /> : null}<path className="sova-line-path" d={path} /><circle cx={coords[coords.length - 1][0]} cy={coords[coords.length - 1][1]} r="4" /></svg>
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

export type SovaRankingItem = { label: ReactNode; value: number; hint?: ReactNode; tone?: SovaTone }
export function SovaRankingChart({ items }: { items: SovaRankingItem[] }) {
  const max = Math.max(1, ...items.map((item) => Math.abs(item.value)))
  return <div className="sova-ranking-chart">{items.map((item, index) => <div className="sova-ranking-row" key={index}><strong>{item.label}</strong><div><span style={{ width: `${Math.max(3, Math.round((Math.abs(item.value) / max) * 100))}%`, background: toneVar(item.tone) }} /></div><em>{item.hint ?? item.value}</em></div>)}</div>
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

export function SovaEChart({ option, height = 260, className }: { option: EChartsOption; height?: number; className?: string }) {
  const elementRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const element = elementRef.current
    if (!element) return undefined
    if (window.navigator.userAgent.toLowerCase().includes('jsdom')) return undefined
    let disposed = false
    let chart: EChartsType | undefined
    const resize = () => chart?.resize()
    void import('echarts').then((echarts) => {
      if (disposed) return
      chart = echarts.init(element, undefined, { renderer: 'svg' })
      chart.setOption(option)
      window.addEventListener('resize', resize)
    })
    return () => {
      disposed = true
      window.removeEventListener('resize', resize)
      chart?.dispose()
    }
  }, [option])
  return <div ref={elementRef} className={cx('sova-echart', className)} style={{ minHeight: height }} />
}

const sovaChartText = '#70706a'
const sovaChartGrid = '#deded6'

export type SovaSankeyNode = { name: string; tone?: SovaTone }
export type SovaSankeyLink = { source: string; target: string; value: number }
export function SovaSankeyChart({ nodes, links, height = 300 }: { nodes: SovaSankeyNode[]; links: SovaSankeyLink[]; height?: number }) {
  const option: EChartsOption = {
    color: nodes.map((node) => toneHex(node.tone)),
    tooltip: { trigger: 'item', triggerOn: 'mousemove' },
    series: [{
      type: 'sankey',
      emphasis: { focus: 'adjacency' },
      nodeAlign: 'justify',
      nodeWidth: 12,
      nodeGap: 12,
      draggable: false,
      data: nodes.map((node) => ({ name: node.name, itemStyle: { color: toneHex(node.tone) } })),
      links,
      lineStyle: { color: 'gradient', opacity: 0.38, curveness: 0.52 },
      label: { color: sovaChartText, fontSize: 11, fontWeight: 700 },
    }],
  } as EChartsOption
  return <SovaEChart option={option} height={height} className="sova-sankey-chart" />
}

export function SovaAreaChart({ labels, values, tone = 'accent', height = 260 }: { labels: string[]; values: number[]; tone?: SovaTone; height?: number }) {
  const color = toneHex(tone)
  const option: EChartsOption = {
    color: [color],
    tooltip: { trigger: 'axis' },
    grid: { top: 18, right: 12, bottom: 24, left: 34 },
    xAxis: { type: 'category', data: labels, boundaryGap: false, axisLabel: { color: sovaChartText, fontSize: 10 }, axisLine: { lineStyle: { color: sovaChartGrid } }, axisTick: { show: false } },
    yAxis: { type: 'value', axisLabel: { color: sovaChartText, fontSize: 10 }, splitLine: { lineStyle: { color: sovaChartGrid, opacity: 0.45 } } },
    series: [{ type: 'line', data: values, smooth: true, symbol: 'circle', symbolSize: 5, lineStyle: { width: 3 }, areaStyle: { opacity: 0.14 } }],
  } as EChartsOption
  return <SovaEChart option={option} height={height} className="sova-area-chart" />
}

export type SovaRadarMetric = { label: string; value: number; max?: number }
export function SovaRadarChart({ metrics, tone = 'accent', height = 260 }: { metrics: SovaRadarMetric[]; tone?: SovaTone; height?: number }) {
  const max = Math.max(1, ...metrics.map((metric) => metric.max ?? metric.value))
  const option: EChartsOption = {
    color: [toneHex(tone)],
    tooltip: {},
    radar: { indicator: metrics.map((metric) => ({ name: metric.label, max: metric.max ?? max })), axisName: { color: sovaChartText, fontSize: 11 }, splitLine: { lineStyle: { color: sovaChartGrid } }, splitArea: { areaStyle: { color: ['transparent', 'rgba(112,112,106,.04)'] } } },
    series: [{ type: 'radar', data: [{ value: metrics.map((metric) => metric.value), name: 'score', areaStyle: { opacity: 0.16 } }], symbolSize: 4, lineStyle: { width: 2 } }],
  } as EChartsOption
  return <SovaEChart option={option} height={height} className="sova-radar-chart" />
}

export type SovaTreemapItem = { name: string; value: number; tone?: SovaTone; children?: SovaTreemapItem[] }
export function SovaTreemapChart({ items, height = 280 }: { items: SovaTreemapItem[]; height?: number }) {
  const decorate = (item: SovaTreemapItem): Record<string, unknown> => ({ ...item, itemStyle: { color: toneHex(item.tone) }, children: item.children?.map(decorate) })
  const option: EChartsOption = {
    tooltip: { formatter: '{b}: {c}' },
    series: [{ type: 'treemap', data: items.map(decorate), roam: false, nodeClick: false, breadcrumb: { show: false }, label: { color: '#fff', fontSize: 12, fontWeight: 700 }, upperLabel: { show: true, height: 22, color: '#fff' }, itemStyle: { borderColor: '#fff', borderWidth: 2, gapWidth: 2 } }],
  } as EChartsOption
  return <SovaEChart option={option} height={height} className="sova-treemap-chart" />
}

export type SovaCandlePoint = { label: string; open: number; close: number; low: number; high: number }
export function SovaCandlestickChart({ points, height = 280 }: { points: SovaCandlePoint[]; height?: number }) {
  const option: EChartsOption = {
    tooltip: { trigger: 'axis' },
    grid: { top: 18, right: 12, bottom: 24, left: 42 },
    xAxis: { type: 'category', data: points.map((point) => point.label), axisLabel: { color: sovaChartText, fontSize: 10 }, axisLine: { lineStyle: { color: sovaChartGrid } }, axisTick: { show: false } },
    yAxis: { scale: true, axisLabel: { color: sovaChartText, fontSize: 10 }, splitLine: { lineStyle: { color: sovaChartGrid, opacity: 0.45 } } },
    series: [{ type: 'candlestick', data: points.map((point) => [point.open, point.close, point.low, point.high]), itemStyle: { color: toneHex('good'), color0: toneHex('bad'), borderColor: toneHex('good'), borderColor0: toneHex('bad') } }],
  } as EChartsOption
  return <SovaEChart option={option} height={height} className="sova-candlestick-chart" />
}

export function SovaChartCard({ title, description, children, footer, className }: { title: ReactNode; description?: ReactNode; children: ReactNode; footer?: ReactNode; className?: string }) {
  return <SovaCard className={cx('sova-chart-card', className)}><div className="sova-chart-card-head"><div><h2 className="sova-card-title">{title}</h2>{description ? <p className="sova-card-description">{description}</p> : null}</div>{footer ? <div className="sova-chart-card-footer">{footer}</div> : null}</div>{children}</SovaCard>
}

export function SovaSplitCard({ title, description, main, side }: { title: ReactNode; description?: ReactNode; main: ReactNode; side: ReactNode }) {
  return <SovaCard className="sova-split-card"><div className="sova-split-head"><div><h2 className="sova-card-title">{title}</h2>{description ? <p className="sova-card-description">{description}</p> : null}</div></div><div className="sova-split-body"><div>{main}</div><aside>{side}</aside></div></SovaCard>
}
