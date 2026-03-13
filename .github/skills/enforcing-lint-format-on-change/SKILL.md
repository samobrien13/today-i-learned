---
name: Enforcing lint format on change
description: Use when editing one or more files and preparing to commit, deploy, or hand off changes where time pressure, sunk cost, or authority pressure may tempt skipping local linting and formatting.
---

# Enforcing Lint and Format on Every Change

## Overview

Run linting and formatting locally every time files change, before commit or deploy.

Core principle: if lint and format were not run locally after edits, the change is not ready.

Violating the letter is violating the spirit.

## The Iron Law

```
NO CHANGED FILES WITHOUT LOCAL LINT + FORMAT CHECK
```

Changed files plus no local lint or format run means stop and run them now.

## When to Use

Use this skill whenever:
- One or more files were edited
- A commit, deploy, or handoff is about to happen
- There is pressure to ship now
- Someone says CI will handle quality gates

Do not use this skill for:
- Pure documentation typo in repos with no lint or format tooling
- Emergency hotfixes only if your human partner explicitly approves bypass

Incident urgency alone is not bypass approval. Bypass requires explicit approval.

## Required Flow

1. Detect repo commands from scripts or docs (for example: `pnpm lint`, `pnpm format`).
2. Run formatter on changed files (or project standard format command).
3. Run linter on changed files (or project standard lint command).
4. Fix issues.
5. Re-run until clean.
6. Only then commit, deploy, or handoff.

## Rationalization Table

| Excuse | Reality |
|--------|---------|
| "Speed over discipline under production pressure" | Fast bad deploys create slower rollbacks. Run checks first unless explicitly overruled by your human partner. |
| "Tests pass, ship it" | Tests are not style or static analysis gates. Lint and format are still required. |
| "Defer cleanup to follow-up PR" | Debt usually persists. Fix quality gates in the same change. |
| "Let CI catch formatting" | CI feedback is later and slower. Local checks are the gate before commit or deploy. |
| "Compromise between speed and quality" | Skipping one gate is still skipping policy. Run both locally. |

## Red Flags - STOP

- "I'll run it after deploy"
- "CI will catch it"
- "Just this once"
- "Only lint" or "only format"
- "Too many warnings; follow-up PR"
- "Manager asked for speed, so skip local checks"

If any red flag appears, stop and run local lint plus format now.

## Quick Checklist

- [ ] Files changed
- [ ] Local format run
- [ ] Local lint run
- [ ] Issues fixed
- [ ] Checks re-run clean
- [ ] Commit, deploy, or handoff
