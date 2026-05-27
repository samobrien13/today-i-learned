# Today I Learned

Blog and tools repository for experienced software developer.
Writings about software development processes and other topics of interest.
Tools created can be anything of use.

## Versions

This project uses `mise` to manage package manager and node versions.
Use `mise install` to install the correct version.

## Commands

Always use `pnpm` for all project commands and dependency management.

Use `pnpm test` to run tests. Always run tests before completing a task.
Use `pnpm lint` to run linting. Always lint before completing a task.
Use `pnpm format` on any files changed to format with prettier. Always format before completing a task.
Use `pnpm ts:check` to run a type check. Always check types before completing a task.

## TypeScript

Never use any. Ever.

## Next.js v16

Standard app router structure.
Data fetching to primarily happen on the server side then pass to `@tanstack/react-query` to pre-hydrate on the client.
Use server actions from a react-query hook when a mutation is required.
React `ViewTransition` is used to animate navigation between pages where applicable.

## Bulletproof React

Folder structure is feature based modeled on Bulletproof React.
Always locate files and functions as close to the feature as necessary.

## UI

Tailwind v4 using semantic colours defined in `app/globals.css`. Never use raw values or default tailwind colours.

ShadCN is used for UI components. Always check for existing components before creating custom UI.
If no component exists, search the shadcn registry using `npx shadcn@latest search`.

Use `lucide-react` for icons. Brand icons should copy the official SVG into the `src/components/ui/icons` folder.

## Database

Where persistence is required a minimal postgres database is available and configured with drizzle.
Make any schema changes in `src/db/schema` then run `npx drizzle-kit push` to sync.

## Hosting

The project is hosted on Vercel with a minimal terraform config to track state.
Propose any changes using `terraform plan`.
Never run `terraform apply`.

## Testing

Vitest is used to write unit tests for any complex utility functions.
