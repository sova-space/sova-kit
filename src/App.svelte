<script lang="ts">
  import { Button } from '$lib/components/ui/button'
  import { Badge } from '$lib/components/ui/badge'
  import * as Card from '$lib/components/ui/card'
  import * as Table from '$lib/components/ui/table'
  import { Input } from '$lib/components/ui/input'
  import * as Tabs from '$lib/components/ui/tabs'
  import * as Select from '$lib/components/ui/select'
  import * as Dialog from '$lib/components/ui/dialog'
  import * as Sheet from '$lib/components/ui/sheet'
  import { Progress } from '$lib/components/ui/progress'
  import { Separator } from '$lib/components/ui/separator'
  import { Alert, AlertDescription, AlertTitle } from '$lib/components/ui/alert'

  const kpis = [
    { label: 'Open', value: '24', hint: '+6 today' },
    { label: 'Ready', value: '12', hint: 'can act now' },
    { label: 'Watch', value: '7', hint: 'needs review' },
    { label: 'Blocked', value: '2', hint: 'waiting input' },
  ]

  const rows = [
    { name: 'Arize AI', status: 'Good fit', source: 'career-ops', score: 82 },
    { name: 'Revolut', status: 'Watch', source: 'manual', score: 78 },
    { name: 'Stripe', status: 'Stretch', source: 'research', score: 64 },
    { name: 'Wise', status: 'Ready', source: 'saved', score: 71 },
  ]

  const bars = [36, 58, 44, 70, 62, 88, 73, 94, 81, 100, 92, 110]
  const components = ['Button', 'Badge', 'Card', 'Table', 'Input', 'Tabs', 'Dialog', 'Sheet', 'Sidebar', 'Dropdown', 'Tooltip', 'Progress']
</script>

<div class="sova-app" data-sova-theme="jobs">
  <div class="sova-shell">
    <aside class="sova-sidebar">
      <div class="sova-brand">
        <div class="sova-mark">S</div>
        <div>
          <div class="sova-eyebrow">sova kit</div>
          <strong>Operator UI</strong>
        </div>
      </div>
      <nav class="sova-nav" aria-label="Main navigation">
        <a class="active" href="/">Overview</a>
        <a href="/">Queue</a>
        <a href="/">Components</a>
        <a href="/">Settings</a>
      </nav>
      <Separator class="my-5" />
      <div class="sova-pill-row">
        <Badge variant="secondary">Svelte 5</Badge>
        <Badge variant="outline">shadcn-svelte</Badge>
        <Badge>Vega</Badge>
      </div>
    </aside>

    <main class="sova-main">
      <div class="sova-topbar">
        <div>
          <div class="sova-eyebrow">production move</div>
          <h1 class="sova-title">Sova Kit, now on shadcn-svelte</h1>
          <p class="sova-description">
            A production-ready Svelte foundation using open-code shadcn-svelte primitives, with Sova dashboard blocks layered on top.
          </p>
        </div>
        <div class="sova-pill-row">
          <Button variant="outline">View docs</Button>
          <Sheet.Root>
            <Sheet.Trigger>
              {#snippet child({ props })}
                <Button {...props}>Open inspector</Button>
              {/snippet}
            </Sheet.Trigger>
            <Sheet.Content>
              <Sheet.Header>
                <Sheet.Title>Inspector</Sheet.Title>
                <Sheet.Description>Right-rail detail pattern for Sova dashboards.</Sheet.Description>
              </Sheet.Header>
              <div class="mt-6 grid gap-4">
                <Progress value={74} />
                <p class="sova-muted">Coverage, provenance and next action belong here.</p>
              </div>
            </Sheet.Content>
          </Sheet.Root>
        </div>
      </div>

      <Alert>
        <AlertTitle>Migration stance</AlertTitle>
        <AlertDescription>
          Keep the shadcn-svelte style as the base. Add only light Sova theming and dashboard-specific blocks.
        </AlertDescription>
      </Alert>

      <section class="sova-grid" aria-label="KPI summary">
        {#each kpis as item}
          <Card.Card>
            <Card.Header>
              <Card.Description>{item.label}</Card.Description>
              <Card.Title class="sova-metric">{item.value}</Card.Title>
            </Card.Header>
            <Card.Content class="sova-muted text-sm">{item.hint}</Card.Content>
          </Card.Card>
        {/each}
      </section>

      <div class="sova-content-grid">
        <div class="sova-card-stack">
          <Card.Card>
            <Card.Header>
              <Card.Title>Signal panel</Card.Title>
              <Card.Description>shadcn-svelte card/table primitives with Sova dashboard density.</Card.Description>
              <Card.Action><Badge variant="outline">live</Badge></Card.Action>
            </Card.Header>
            <Card.Content>
              <div class="sova-bars" aria-label="Signal trend">
                {#each bars as value}
                  <span style={`height: ${value}px`} title={`${value}`}></span>
                {/each}
              </div>
            </Card.Content>
          </Card.Card>

          <Card.Card>
            <Card.Header>
              <Card.Title>Work queue</Card.Title>
              <Card.Description>Table-first operator surface.</Card.Description>
              <Card.Action><Input placeholder="Search rows" class="h-8 w-44" /></Card.Action>
            </Card.Header>
            <Card.Content>
              <Table.Table>
                <Table.TableHeader>
                  <Table.TableRow>
                    <Table.TableHead>Company</Table.TableHead>
                    <Table.TableHead>Status</Table.TableHead>
                    <Table.TableHead>Source</Table.TableHead>
                    <Table.TableHead class="text-right">Score</Table.TableHead>
                  </Table.TableRow>
                </Table.TableHeader>
                <Table.TableBody>
                  {#each rows as row}
                    <Table.TableRow>
                      <Table.TableCell class="font-medium">{row.name}</Table.TableCell>
                      <Table.TableCell><Badge variant={row.status === 'Good fit' || row.status === 'Ready' ? 'default' : 'secondary'}>{row.status}</Badge></Table.TableCell>
                      <Table.TableCell class="text-muted-foreground">{row.source}</Table.TableCell>
                      <Table.TableCell class="text-right tabular-nums">{row.score}</Table.TableCell>
                    </Table.TableRow>
                  {/each}
                </Table.TableBody>
              </Table.Table>
            </Card.Content>
          </Card.Card>
        </div>

        <aside class="sova-card-stack">
          <Card.Card>
            <Card.Header>
              <Card.Title>Component core</Card.Title>
              <Card.Description>Installed from shadcn-svelte CLI.</Card.Description>
            </Card.Header>
            <Card.Content class="sova-pill-row">
              {#each components as component}
                <Badge variant="outline">{component}</Badge>
              {/each}
            </Card.Content>
          </Card.Card>

          <Card.Card>
            <Card.Header>
              <Card.Title>Controls</Card.Title>
              <Card.Description>Themeable primitives ready for product apps.</Card.Description>
            </Card.Header>
            <Card.Content class="grid gap-3">
              <Tabs.Root value="jobs">
                <Tabs.List>
                  <Tabs.Trigger value="jobs">Jobs</Tabs.Trigger>
                  <Tabs.Trigger value="finance">Finance</Tabs.Trigger>
                  <Tabs.Trigger value="trading">Trading</Tabs.Trigger>
                </Tabs.List>
              </Tabs.Root>
              <Select.Root type="single" value="vega">
                <Select.Trigger class="w-full">Vega / Inter</Select.Trigger>
                <Select.Content>
                  <Select.Item value="vega">Vega / classic shadcn</Select.Item>
                  <Select.Item value="rhea">Rhea / compact</Select.Item>
                  <Select.Item value="luma">Luma / soft</Select.Item>
                </Select.Content>
              </Select.Root>
              <Dialog.Root>
                <Dialog.Trigger>
                  {#snippet child({ props })}
                    <Button variant="outline" class="w-full" {...props}>Open dialog</Button>
                  {/snippet}
                </Dialog.Trigger>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Sova dialog</Dialog.Title>
                    <Dialog.Description>Production-ready overlay behavior from shadcn-svelte.</Dialog.Description>
                  </Dialog.Header>
                </Dialog.Content>
              </Dialog.Root>
            </Card.Content>
          </Card.Card>
        </aside>
      </div>
    </main>
  </div>
</div>
