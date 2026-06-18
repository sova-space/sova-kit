import type { EChartsOption, EChartsType } from 'echarts'
import { useEffect, useRef, useState, type ButtonHTMLAttributes, type HTMLAttributes, type InputHTMLAttributes, type ReactNode } from 'react'

export const SOVA_KIT_VERSION = '0.1.0'

export type SovaTheme = 'jobs' | 'finance' | 'trading' | 'brain'
export type SovaTone = 'neutral' | 'accent' | 'good' | 'warn' | 'bad'

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

function useDemoValue<T>(value: T | undefined, fallback: T, onChange?: (value: T) => void) {
  const [localValue, setLocalValue] = useState(value ?? fallback)
  const currentValue = onChange ? value ?? fallback : localValue
  const setValue = (nextValue: T) => {
    if (!onChange) setLocalValue(nextValue)
    onChange?.(nextValue)
  }
  return [currentValue, setValue] as const
}

export function SovaProvider({ theme, children, className }: { theme: SovaTheme; children: ReactNode; className?: string }) {
  return <div className={cx('sova-root', className)} data-sova-theme={theme}>{children}</div>
}

export function SovaShell({ sidebar, rail, children, className }: { sidebar: ReactNode; rail?: ReactNode; children: ReactNode; className?: string }) {
  return <div className={cx('sova-shell', Boolean(rail) && 'sova-shell-with-rail', className)}><aside className="sova-sidebar"><div className="sova-sidebar-scroll">{sidebar}</div></aside><main className="sova-main">{children}</main>{rail ? <aside className="sova-rail"><div className="sova-rail-scroll">{rail}</div></aside> : null}</div>
}

export function SovaTopbar({ eyebrow, title, actions, children }: { eyebrow?: ReactNode; title: ReactNode; actions?: ReactNode; children?: ReactNode }) {
  return <header className="sova-topbar"><div className="sova-topbar-copy">{eyebrow ? <p className="sova-eyebrow">{eyebrow}</p> : null}<h1 className="sova-title">{title}</h1>{children}</div>{actions ? <div className="sova-actions">{actions}</div> : null}</header>
}

export function SovaBrand({ mark, eyebrow, title }: { mark: ReactNode; eyebrow?: ReactNode; title: ReactNode }) {
  return <div className="sova-brand"><div className="sova-brand-mark">{mark}</div><div className="sova-brand-copy">{eyebrow ? <p className="sova-eyebrow">{eyebrow}</p> : null}<strong>{title}</strong></div></div>
}

export type SovaNavItem = { label: ReactNode; href?: string; active?: boolean; icon?: ReactNode; onClick?: () => void }
export function SovaNav({ items }: { items: SovaNavItem[] }) {
  return <nav className="sova-nav" aria-label="Main navigation">{items.map((item, index) => {
    const content = <>{item.icon}<span className="sova-nav-label" aria-current={item.active ? 'page' as const : undefined}>{item.label}</span></>
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


export function SovaIcon({ children, tone = 'neutral', size = 18, className }: { children: ReactNode; tone?: SovaTone; size?: number; className?: string }) {
  return <span className={cx('sova-icon', tone !== 'neutral' && `sova-icon-${tone}`, className)} style={{ width: size, height: size, fontSize: Math.max(11, size - 4) }}>{children}</span>
}

export function SovaAvatar({ name, src, status, size = 34 }: { name: string; src?: string; status?: SovaTone; size?: number }) {
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') || 'SV'
  return <span className="sova-avatar" style={{ width: size, height: size }}>{src ? <img src={src} alt={name} /> : <span>{initials}</span>}{status ? <i className={cx(status !== 'neutral' && `sova-avatar-${status}`)} /> : null}</span>
}

export function SovaInput({ label, hint, error, className, ...props }: InputHTMLAttributes<HTMLInputElement> & { label?: ReactNode; hint?: ReactNode; error?: ReactNode }) {
  return <label className={cx('sova-field', Boolean(error) && 'sova-field-error')}><span>{label}</span><input className={cx('sova-input', className)} {...props} />{error ? <em>{error}</em> : hint ? <small>{hint}</small> : null}</label>
}

export function SovaSearchBar({ placeholder = 'Search…', value, onChange, actions }: { placeholder?: string; value?: string; onChange?: (value: string) => void; actions?: ReactNode }) {
  return <div className="sova-searchbar"><input value={value} onChange={(event) => onChange?.(event.currentTarget.value)} placeholder={placeholder} />{actions ? <div>{actions}</div> : null}</div>
}

export function SovaDivider({ label }: { label?: ReactNode }) {
  return <div className="sova-divider" role="separator">{label ? <span>{label}</span> : null}</div>
}

export function SovaFormGroup({ title, description, children }: { title?: ReactNode; description?: ReactNode; children: ReactNode }) {
  return <div className="sova-form-group" role="group" aria-label={typeof title === 'string' ? title : undefined}>{title || description ? <div className="sova-form-group-head">{title ? <strong>{title}</strong> : null}{description ? <p>{description}</p> : null}</div> : null}<div className="sova-form-group-body">{children}</div></div>
}

export type SovaSelectOption = { label: ReactNode; value: string }
export function SovaSelect({ label, value, options, onChange, hint }: { label?: ReactNode; value?: string; options: SovaSelectOption[]; onChange?: (value: string) => void; hint?: ReactNode }) {
  const [currentValue, setCurrentValue] = useDemoValue(value, options[0]?.value ?? '', onChange)
  return <label className="sova-field"><span>{label}</span><select className="sova-input" value={currentValue} onChange={(event) => setCurrentValue(event.currentTarget.value)}>{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>{hint ? <small>{hint}</small> : null}</label>
}

export function SovaDatePicker({ label, value, onChange, hint, min, max }: { label?: ReactNode; value?: string; onChange?: (value: string) => void; hint?: ReactNode; min?: string; max?: string }) {
  const [currentValue, setCurrentValue] = useDemoValue(value, '', onChange)
  return <label className="sova-field"><span>{label}</span><input className="sova-input sova-date-input" type="date" value={currentValue} min={min} max={max} onChange={(event) => setCurrentValue(event.currentTarget.value)} />{hint ? <small>{hint}</small> : null}</label>
}

export function SovaDateRangePicker({ label = 'Date range', start, end, onChange, hint, min, max }: { label?: ReactNode; start?: string; end?: string; onChange?: (range: { start: string; end: string }) => void; hint?: ReactNode; min?: string; max?: string }) {
  const [range, setRange] = useDemoValue({ start: start ?? '', end: end ?? '' }, { start: '', end: '' }, onChange)
  return <div className="sova-field sova-date-range"><span>{label}</span><div><input aria-label="Start date" className="sova-input sova-date-input" type="date" value={range.start} min={min} max={max} onChange={(event) => setRange({ start: event.currentTarget.value, end: range.end })} /><em aria-hidden="true">→</em><input aria-label="End date" className="sova-input sova-date-input" type="date" value={range.end} min={min} max={max} onChange={(event) => setRange({ start: range.start, end: event.currentTarget.value })} /></div>{hint ? <small>{hint}</small> : null}</div>
}

export type SovaChecklistCoverageItem = { name: ReactNode; covered?: boolean; component?: ReactNode; note?: ReactNode }
export function SovaChecklistCoverage({ items }: { items: SovaChecklistCoverageItem[] }) {
  return <div className="sova-checklist-coverage">{items.map((item, index) => <div key={index} className={cx('sova-checklist-row', item.covered === false && 'sova-checklist-row-missing')}><span>{item.covered === false ? '○' : '✓'}</span><div><strong>{item.name}</strong>{item.note ? <small>{item.note}</small> : null}</div>{item.component ? <code>{item.component}</code> : null}</div>)}</div>
}

export function SovaCheckbox({ label, description, checked, onChange, disabled }: { label: ReactNode; description?: ReactNode; checked?: boolean; onChange?: (checked: boolean) => void; disabled?: boolean }) {
  const [currentChecked, setCurrentChecked] = useDemoValue(checked, false, onChange)
  return <label className={cx('sova-choice', disabled && 'sova-disabled')}><input type="checkbox" checked={currentChecked} disabled={disabled} onChange={(event) => setCurrentChecked(event.currentTarget.checked)} /><span><strong>{label}</strong>{description ? <small>{description}</small> : null}</span></label>
}

export function SovaRadio({ label, description, name, value, checked, onChange, disabled }: { label: ReactNode; description?: ReactNode; name: string; value: string; checked?: boolean; onChange?: (value: string) => void; disabled?: boolean }) {
  return <label className={cx('sova-choice', disabled && 'sova-disabled')}><input type="radio" name={name} value={value} checked={onChange ? checked : undefined} defaultChecked={onChange ? undefined : checked} disabled={disabled} onChange={(event) => onChange?.(event.currentTarget.value)} /><span><strong>{label}</strong>{description ? <small>{description}</small> : null}</span></label>
}

export function SovaToggle({ label, description, checked, onChange, disabled }: { label: ReactNode; description?: ReactNode; checked?: boolean; onChange?: (checked: boolean) => void; disabled?: boolean }) {
  const [currentChecked, setCurrentChecked] = useDemoValue(checked, false, onChange)
  return <label className={cx('sova-toggle-row', disabled && 'sova-disabled')}><span><strong>{label}</strong>{description ? <small>{description}</small> : null}</span><button type="button" role="switch" aria-checked={Boolean(currentChecked)} disabled={disabled} onClick={() => setCurrentChecked(!currentChecked)} className="sova-toggle"><i /></button></label>
}

export type SovaTabItem = { label: ReactNode; value: string; badge?: ReactNode }
export function SovaTabs({ items, value, onChange }: { items: SovaTabItem[]; value: string; onChange?: (value: string) => void }) {
  const [currentValue, setCurrentValue] = useDemoValue(value, items[0]?.value ?? '', onChange)
  return <div className="sova-tabs" role="tablist">{items.map((item) => <button key={item.value} type="button" role="tab" aria-selected={item.value === currentValue} onClick={() => setCurrentValue(item.value)}>{item.label}{item.badge ? <span>{item.badge}</span> : null}</button>)}</div>
}

export function SovaBanner({ tone = 'accent', title, description, actions, onDismiss }: { tone?: SovaTone; title: ReactNode; description?: ReactNode; actions?: ReactNode; onDismiss?: () => void }) {
  return <div className={cx('sova-banner', tone !== 'neutral' && `sova-banner-${tone}`)}><div><strong>{title}</strong>{description ? <p>{description}</p> : null}</div>{actions ? <div className="sova-actions">{actions}</div> : null}{onDismiss ? <button type="button" onClick={onDismiss} aria-label="Dismiss">×</button> : null}</div>
}

export function SovaSkeleton({ lines = 3 }: { lines?: number }) {
  return <div className="sova-skeleton" aria-hidden="true">{Array.from({ length: lines }).map((_, index) => <span key={index} />)}</div>
}

export function SovaLoading({ label = 'Loading' }: { label?: ReactNode }) {
  return <div className="sova-loading" role="status"><span />{label}</div>
}

export function SovaTooltip({ label, children }: { label: ReactNode; children: ReactNode }) {
  return <span className="sova-tooltip" tabIndex={0}>{children}<span role="tooltip">{label}</span></span>
}

export function SovaAccordion({ items }: { items: Array<{ title: ReactNode; content: ReactNode; defaultOpen?: boolean }> }) {
  return <div className="sova-accordion">{items.map((item, index) => <details key={index} open={item.defaultOpen}><summary>{item.title}<span>⌄</span></summary><div>{item.content}</div></details>)}</div>
}

export function SovaModal({ open, title, description, children, actions, onClose }: { open: boolean; title: ReactNode; description?: ReactNode; children?: ReactNode; actions?: ReactNode; onClose?: () => void }) {
  if (!open) return null
  return <div className="sova-modal-backdrop" role="presentation"><section className="sova-modal" role="dialog" aria-modal="true"><header><div><h2>{title}</h2>{description ? <p>{description}</p> : null}</div>{onClose ? <button type="button" onClick={onClose} aria-label="Close">×</button> : null}</header>{children ? <div className="sova-modal-body">{children}</div> : null}{actions ? <footer>{actions}</footer> : null}</section></div>
}

export function SovaDrawer({ open, title, children, actions, onClose, side = 'right' }: { open: boolean; title: ReactNode; children: ReactNode; actions?: ReactNode; onClose?: () => void; side?: 'left' | 'right' }) {
  if (!open) return null
  return <div className="sova-drawer-backdrop"><aside className={cx('sova-drawer', side === 'left' && 'sova-drawer-left')}><header><h2>{title}</h2>{onClose ? <button type="button" onClick={onClose} aria-label="Close">×</button> : null}</header><div>{children}</div>{actions ? <footer>{actions}</footer> : null}</aside></div>
}

export function SovaToast({ tone = 'neutral', title, description, action }: { tone?: SovaTone; title: ReactNode; description?: ReactNode; action?: ReactNode }) {
  return <div className={cx('sova-toast', tone !== 'neutral' && `sova-toast-${tone}`)} role="status"><strong>{title}</strong>{description ? <p>{description}</p> : null}{action}</div>
}

export function SovaSlider({ label, value, min = 0, max = 100, onChange }: { label?: ReactNode; value: number; min?: number; max?: number; onChange?: (value: number) => void }) {
  const [currentValue, setCurrentValue] = useDemoValue(value, min, onChange)
  return <label className="sova-slider"><span>{label}<em>{currentValue}</em></span><input type="range" min={min} max={max} value={currentValue} onChange={(event) => setCurrentValue(Number(event.currentTarget.value))} /></label>
}

export function SovaCarousel({ items }: { items: ReactNode[] }) {
  return <div className="sova-carousel">{items.map((item, index) => <div key={index}>{item}</div>)}</div>
}

export function SovaFooter({ brand, links }: { brand?: ReactNode; links?: Array<{ label: ReactNode; href: string }> }) {
  return <footer className="sova-footer"><div>{brand}</div>{links ? <nav>{links.map((link, index) => <a key={index} href={link.href}>{link.label}</a>)}</nav> : null}</footer>
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

export function SovaTableCard<Row extends Record<string, unknown>>({ title, description, actions, toolbar, columns, rows, ...tableProps }: { title: ReactNode; description?: ReactNode; actions?: ReactNode; toolbar?: ReactNode; columns: SovaColumn<Row>[]; rows: Row[] } & Omit<Parameters<typeof SovaTable<Row>>[0], 'columns' | 'rows'>) {
  return <SovaCard className="sova-table-card"><div className="sova-table-card-head"><div><h2 className="sova-card-title">{title}</h2>{description ? <p className="sova-card-description">{description}</p> : null}</div>{actions ? <div className="sova-actions">{actions}</div> : null}</div>{toolbar ? <div className="sova-table-card-toolbar">{toolbar}</div> : null}<SovaTable columns={columns} rows={rows} {...tableProps} /></SovaCard>
}

export function SovaPageHeader({ eyebrow, title, description, actions, meta }: { eyebrow?: ReactNode; title: ReactNode; description?: ReactNode; actions?: ReactNode; meta?: ReactNode }) {
  return <div className="sova-page-header"><div>{eyebrow ? <p className="sova-eyebrow">{eyebrow}</p> : null}<div className="sova-page-title-row"><h1 className="sova-page-title">{title}</h1>{meta ? <div className="sova-page-meta">{meta}</div> : null}</div>{description ? <p className="sova-page-description">{description}</p> : null}</div>{actions ? <div className="sova-actions">{actions}</div> : null}</div>
}

export type SovaKpiItem = { label: ReactNode; value: ReactNode; hint?: ReactNode; tone?: SovaTone }
export function SovaKpiRow({ items, density = 'compact' }: { items: SovaKpiItem[]; density?: 'compact' | 'normal' }) {
  return <div className={cx('sova-kpi-row', density === 'compact' && 'sova-kpi-row-compact')}>{items.map((item, index) => <SovaCard key={index} className="sova-kpi-card"><SovaStat label={item.label} value={item.value} tone={item.tone} />{item.hint ? <p className="sova-kpi-hint">{item.hint}</p> : null}</SovaCard>)}</div>
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

export type SovaSeries = { name: string; values: number[]; tone?: SovaTone }
export function SovaMultiLineChart({ labels, series, height = 280 }: { labels: string[]; series: SovaSeries[]; height?: number }) {
  const option: EChartsOption = {
    color: series.map((item) => toneHex(item.tone)),
    tooltip: { trigger: 'axis' },
    legend: { top: 0, right: 0, textStyle: { color: sovaChartText, fontSize: 11 } },
    grid: { top: 34, right: 12, bottom: 24, left: 36 },
    xAxis: { type: 'category', data: labels, boundaryGap: false, axisLabel: { color: sovaChartText, fontSize: 10 }, axisLine: { lineStyle: { color: sovaChartGrid } }, axisTick: { show: false } },
    yAxis: { type: 'value', axisLabel: { color: sovaChartText, fontSize: 10 }, splitLine: { lineStyle: { color: sovaChartGrid, opacity: 0.45 } } },
    series: series.map((item) => ({ name: item.name, type: 'line', data: item.values, smooth: true, symbolSize: 4, lineStyle: { width: 2 } })),
  } as EChartsOption
  return <SovaEChart option={option} height={height} className="sova-multiline-chart" />
}

export type SovaScatterPoint = { x: number; y: number; label?: string; tone?: SovaTone }
export function SovaScatterChart({ points, height = 280 }: { points: SovaScatterPoint[]; height?: number }) {
  const option: EChartsOption = {
    tooltip: { formatter: (params: unknown) => {
      const point = params as { data?: [number, number, string?] }
      return point.data?.[2] ? `${point.data[2]}: ${point.data[0]}, ${point.data[1]}` : `${point.data?.[0]}, ${point.data?.[1]}`
    } },
    grid: { top: 18, right: 12, bottom: 28, left: 36 },
    xAxis: { axisLabel: { color: sovaChartText, fontSize: 10 }, splitLine: { lineStyle: { color: sovaChartGrid, opacity: 0.35 } } },
    yAxis: { axisLabel: { color: sovaChartText, fontSize: 10 }, splitLine: { lineStyle: { color: sovaChartGrid, opacity: 0.35 } } },
    series: [{ type: 'scatter', symbolSize: 12, data: points.map((point) => ({ value: [point.x, point.y, point.label], itemStyle: { color: toneHex(point.tone) } })) }],
  } as EChartsOption
  return <SovaEChart option={option} height={height} className="sova-scatter-chart" />
}

export function SovaGaugeChart({ value, label = 'Score', tone = 'accent', height = 240 }: { value: number; label?: string; tone?: SovaTone; height?: number }) {
  const option: EChartsOption = {
    series: [{ type: 'gauge', min: 0, max: 100, progress: { show: true, width: 10, itemStyle: { color: toneHex(tone) } }, axisLine: { lineStyle: { width: 10, color: [[1, '#e7e5dc']] } }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { show: false }, pointer: { width: 3, itemStyle: { color: toneHex(tone) } }, detail: { valueAnimation: true, formatter: '{value}%', color: toneHex(tone), fontSize: 24, fontWeight: 800 }, title: { offsetCenter: [0, '62%'], color: sovaChartText, fontSize: 12 }, data: [{ value, name: label }] }],
  } as EChartsOption
  return <SovaEChart option={option} height={height} className="sova-gauge-chart" />
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
