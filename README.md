<h1 align="center">Sova Kit</h1>

<p align="center">
  Svelte 5 operator UI foundation for Sova Space dashboards, built on shadcn-svelte.
</p>

<p align="center">
  <a href="https://sova-space.github.io/sova-kit/"><strong>Live demo</strong></a>
  ·
  <a href="https://github.com/huntabyte/shadcn-svelte">shadcn-svelte</a>
</p>

<p align="center">
  <a href="https://github.com/sova-space/sova-kit/actions/workflows/pages.yml">
    <img alt="Live demo" src="https://github.com/sova-space/sova-kit/actions/workflows/pages.yml/badge.svg" />
  </a>
  <img alt="Svelte" src="https://img.shields.io/badge/Svelte-5-ff3e00?labelColor=111827" />
  <img alt="shadcn-svelte" src="https://img.shields.io/badge/shadcn--svelte-core-111827?labelColor=111827" />
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-v4-38bdf8?labelColor=111827" />
</p>

---

## Direction

Sova Kit is moving from the old hand-rolled React UI kit to a Svelte 5 foundation based on [huntabyte/shadcn-svelte](https://github.com/huntabyte/shadcn-svelte).

Reason: shadcn-svelte is already production-shaped: open component code, strong defaults, CSS-variable theming, accessible Bits UI primitives, a large component catalog and a real CLI/registry workflow.

## What we keep from shadcn-svelte

- Svelte 5 + Vite.
- shadcn-svelte `Vega` preset: classic shadcn/ui look with Inter.
- Tailwind CSS v4 token system.
- Open-code components copied into `src/lib/components/ui`.
- `bits-ui` behavior under the hood for overlays, controls and menus.
- `tailwind-variants`, `tailwind-merge` and `clsx` for predictable variants.
- shadcn component style as the base visual language.

## What Sova adds

Sova should stay a thin operator-dashboard layer on top of shadcn-svelte:

- app themes: jobs / finance / trading / brain
- compact dashboard shell
- KPI strips
- table-first work queues
- right inspector / sheet patterns
- chart cards and signal panels
- short labels, low-noise dashboard copy

Keep product logic, API clients, routes and domain-specific flows inside product apps.

## Installed core

The current Svelte build includes these shadcn-svelte components:

| Area | Components |
| --- | --- |
| Actions | Button, Badge |
| Surfaces | Card, Alert, Separator, Skeleton |
| Forms | Input, Textarea, Select, Checkbox, Radio Group, Switch |
| Navigation | Tabs, Dropdown Menu, Sidebar |
| Data | Table, Progress |
| Overlays | Dialog, Sheet, Tooltip |

## Local development

```bash
PATH=/opt/homebrew/bin:$PATH npm install
PATH=/opt/homebrew/bin:$PATH npm run dev
```

Build and verify:

```bash
PATH=/opt/homebrew/bin:$PATH npm run check
PATH=/opt/homebrew/bin:$PATH npm run build
PATH=/opt/homebrew/bin:$PATH npm run build:pages
```

## Add more shadcn-svelte components

```bash
PATH=/opt/homebrew/bin:$PATH npx shadcn-svelte@latest add <component>
```

Useful next components:

- `command` for command palette
- `popover` for compact filters
- `calendar` / `date-picker` when finance/jobs date filters need it
- `data-table` when table sorting/filtering becomes real
- `chart` only when the Svelte chart pattern is better than product-specific chart code

## Repo policy

This repo is now Svelte-first. Do not add React wrappers around Svelte components. If an existing product still uses the old React package, migrate that product deliberately instead of building a bridge layer.
