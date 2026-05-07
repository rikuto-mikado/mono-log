# shadcn/ui

## Configuration

`frontend/components.json` is the config file. Key points:

- `"rsc": false` — Vite + React setup, no Next.js RSC needed
- `"style": "radix-nova"`
- `"cssVariables": true` — colors managed via CSS variables
- aliases: `@/components`, `@/lib`, `@/hooks`

## Adding Components

```bash
cd frontend
npx shadcn@latest add <component-name>
```

Files are added to `src/components/ui/`.

## Sidebar — Important Notes

### SidebarProvider is required

`SidebarTrigger` and `Sidebar` use React Context internally.
**Everything must be inside `SidebarProvider`** — placing them outside will cause a runtime error.

```tsx
<SidebarProvider>
  <div className="flex h-screen w-full">
    <AppSidebar />         {/* Sidebar goes here */}
    <main>
      <SidebarTrigger />   {/* Trigger must also be inside SidebarProvider */}
      ...
    </main>
  </div>
</SidebarProvider>
```

### Building a custom sidebar

Import the parts you need from `@/components/ui/sidebar`:

```tsx
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
```

When importing your custom sidebar in `App.tsx`, the exported name must match exactly — `AppSidebar` and `AppSideBar` are treated as different identifiers.

### Keyboard shortcut

The sidebar toggles with `b` (or `Cmd+B`) by default.
Configurable via `SIDEBAR_KEYBOARD_SHORTCUT` in `sidebar.tsx`.
