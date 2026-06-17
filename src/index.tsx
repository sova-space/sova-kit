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

export function SovaBadge({ tone = 'neutral', className, ...props }: HTMLAttributes<HTMLSpanElement> & { tone?: SovaTone }) {
  return <span className={cx('sova-badge', tone !== 'neutral' && `sova-badge-${tone}`, className)} {...props} />
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
