@AGENTS.md

# AI-Assisted Development

## Tools Used

**Claude Code** (Anthropic) — used throughout the project via the CLI.

## How It Was Used

Claude Code was used as a pair programming tool, not as a code generator. The workflow was always:

1. I identified the problem or feature to implement
2. I asked Claude to propose an approach or implement it
3. I reviewed the output, questioned decisions, and redirected when needed
4. I accepted, modified, or rejected the result

## What Was Prompted

High-level tasks I delegated to Claude:

- Setting up `react-hook-form` in `JobForm` and extracting reusable form primitives (`FormField`, `ControlledSelect`)
- Creating the Server Action (`app/actions/jobs.ts`) and wiring `revalidatePath` / `updateTag`
- Reorganizing `src/components/` into `layout/`, `jobs/ui/`, `jobs/filters/`, and `form/` subfolders
- Writing unit tests for `jobFilters.ts` and `jobsStore.ts` using Vitest
- Fixing the `JobFiltersUrlBar` ESLint errors (`setState` in effect, missing deps)
- Updating `fetchJobs` to use `'use cache'` + `cacheTag` for the Next.js 16 cache model

## Where Output Was Used As-Is vs. Reviewed/Edited

| Area | Outcome |
|---|---|
| `FormField` and `ControlledSelect` components | Accepted as-is — straightforward wrappers |
| Server Action + `updateTag` | Reviewed — Claude initially used `revalidatePath`, I pushed for the more precise tag-based approach, which led to discovering `updateTag` was the right API for read-your-own-writes |
| Component folder restructure | Proposed by Claude, but I evaluated the trade-offs (flat vs. `jobs/ui` + `jobs/filters`) and chose the final structure |
| `jobFilters.ts` validation fix | Accepted — replacing unsafe `as` casts with validation against known constants was clearly correct |
| `JobFiltersUrlBar` ESLint fix | Partially accepted — Claude proposed `useRef` for stale closures, I approved; the `setState` in effect fix was reviewed against React docs before accepting |
| Unit tests | Reviewed — one test had a bug (`mockWriteFile` not reset between tests). I caught the failing test, diagnosed the issue with Claude, and we fixed it together |
| `cacheComponents` decision | Rejected after discussion — Claude set it up, but I questioned whether it made sense for a mock data project. We agreed `revalidatePath` was more pragmatic; Claude reverted its own suggestion |
| README | Drafted by Claude, edited by me for accuracy and tone |

## Constraints and Guidelines Given

- **Read the Next.js 16 docs before writing code** (`AGENTS.md`) — this project uses Next.js 16 which has breaking changes from widely-known versions. Claude was instructed to check `node_modules/next/dist/docs/` before implementing anything cache or routing related.
- **No over-engineering** — I explicitly pushed back when Claude added abstractions that weren't needed (e.g. a `SubpageHeader` component I removed in favor of a simple inline back link).
- **Max 5 tests per file, only meaningful ones** — I directed Claude to skip form validation tests (testing the library, not our code) and focus on pure functions and the data layer.
- **Separate UI from logic in components** — the `jobs/ui/` vs `jobs/filters/` split came from a back-and-forth where I evaluated Claude's initial flat proposal and asked for a more intentional structure.
