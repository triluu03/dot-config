---
name: simplify
description: Use when the user asks to simplify, clean up, or streamline code — reducing complexity, removing dead code, collapsing redundancy, flattening deep nesting, and shedding immature abstractions without changing behavior.
---

# Simplify

## Overview

Simplify existing code without altering its observable behavior. The goal is code that is shorter, flatter, less redundant, and easier to read and maintain — not clever or golfed.

## When to Use

Use this skill when the user asks to:

- "simplify this"
- "clean up this code"
- "make this more readable"
- "remove redundancy"
- "get rid of unnecessary abstractions"
- "flatten this logic"
- "streamline the implementation"

Do not use this skill for performance optimization, adding new features, or changing public APIs.

## The Golden Rule

**Behavior must not change.** The simplified code must pass all existing tests and produce identical outputs for identical inputs.

## Simplification Heuristics

Apply these in priority order. For every change, explain what you simplified and why.

### 1. Remove dead code
- Unreachable branches, unused variables, imports, functions, classes.
- No-op statements, redundant `return`, assignments that are never read.
- Code commented-out "just in case."

### 2. Collapse redundancy
- Repeated blocks that say the same thing — extract once.
- Duplicate conditionals, loops, or error handling that can be unified.
- Near-identical functions that differ only in a parameter — merge them.
- But do not over-DRY: keep things separate when merging would obscure meaning.

### 3. Flatten nesting
- Invert conditionals to bail early (early return / guard clauses).
- Merge nested `if` / `match` / `switch` where branches are equivalent.
- Extract deeply nested blocks into well-named helper functions.
- Aim for one level of indentation where possible.

### 4. Shed immature abstractions
- Thin wrappers that only delegate (the function body is just `return wrapper(x)`).
- Interfaces or base classes with only one implementation.
- Config/options objects that are always the same single value.
- Factories and builders for simple objects with clear constructors.
- Overly generic utilities that are called from exactly one place.

### 5. Prefer the standard library and language idioms
- Replace hand-rolled loops with built-in maps, filters, comprehensions.
- Use language-native patterns (`?.`, `??`, destructuring, `for...of`, etc.).
- Replace custom utility functions with standard library equivalents.

### 6. Shrink verbosity
- Inline variables used exactly once and whose name adds no clarity.
- Remove comments that just restate the code.
- Collapse multi-step simple expressions into chained calls when readable.
- Remove unnecessary intermediate lists/arrays.

## What NOT to Do

- Do not rename public symbols unless the name is actively misleading.
- Do not change function signatures, return types, or thrown exceptions.
- Do not trade readability for fewer lines — a clear 10-line function beats a cryptic 3-line one.
- Do not "simplify" tests by weakening assertions.
- Do not introduce new dependencies or language features unavailable in the project.
- Do not touch files outside the scope the user specified.

## Workflow

1. **Read and understand the target code.** Identify what it does and how it is called. Note existing tests.
2. **Scan for all possible simplifications.** Apply the heuristics top to bottom. Inventory every opportunity — dead code, redundancy, nesting, abstractions, verbosity.
3. **Present the plan and wait for approval.** Show the user a concise, bulleted list of suggested changes before touching the code. Group suggestions by heuristic category and keep each entry to one line with a brief rationale. Do not proceed until the user confirms.
4. **Implement approved changes only.** Apply each approved simplification. Do not sneak in unapproved edits. After each meaningful change, verify the code still compiles / type-checks.
5. **Run existing tests.** Confirm every test passes with identical results. If tests are absent, do a manual behavior comparison on representative inputs.
6. **Report what you changed.** List each applied simplification with a one-line rationale.

## Verification

Before claiming completion:

- [ ] All existing tests pass.
- [ ] The diff contains only removals, consolidations, and flattening — no new logic.
- [ ] Every removed abstraction is truly unnecessary in the current codebase.
- [ ] The result is measurably simpler: fewer lines, fewer branches, or fewer indirections.

## Common Mistakes

| Mistake                                                 | Fix                                                                     |
| ------------------------------------------------------- | ----------------------------------------------------------------------- |
| Removing something "unused" that a caller actually uses | Check references before deleting. Grep for usages across the project.   |
| Turning readable 10 lines into cryptic 3 lines          | The goal is clarity, not golf. If the shorter version is harder to read, keep the longer one. |
| "Simplifying" by adding a new abstraction               | Fewer layers, not more. Abstractions are what you remove.               |
| Changing behavior "because it must have been a bug"     | Flag the suspected bug to the user; do not fix it silently.             |
| Over-merging: collapsing similar-but-different branches | If the branches represent genuinely different semantics, keep them separate. |
