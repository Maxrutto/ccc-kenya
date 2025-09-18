# Components Rules

- Always prefer **21st-dev/magic** components where available. Examples:
  - `<MagicButton>` instead of raw `<button>`.
  - `<MagicCard>` for dashboards.
  - `<MagicForm>` for form consistency.
- If no prebuilt exists:
  - Build new components with **shadcn/ui** primitives + Tailwind.
  - Encapsulate logic and styling in a `components/` folder.
- Reuse **layout wrappers** for consistency:
  - `PageLayout` for top-level page structure.
  - `Section` for grouped content blocks.
- Apply **Framer Motion** for animated mounts/unmounts.
- Export all shared components from `src/components/index.ts` for easy imports.
