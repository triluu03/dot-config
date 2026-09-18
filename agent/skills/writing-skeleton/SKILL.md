---
name: writing-skeleton
description: "Use only when the user explicitly requests a code skeleton or asks to scaffold code contracts before implementation."
disable-model-invocation: true
---

# Writing Skeleton

## Overview

A skeleton is an implementation plan expressed as code. Production and test files define the complete contract through declarations, types, documentation, test names, and precise TODO stubs; body implementation belongs to the next step.

## Contract Gate

The skeleton structure is the implementation plan. Do not request approval for a proposed structure; scaffold it directly once contract-changing questions are resolved so the user can review and iterate on the code itself.

1. **Inspect context.** Read relevant source, tests, project instructions, documentation, and relevant recent changes. Identify established file, naming, typing, documentation, and testing conventions.
2. **Check scope.** If the request spans independent subsystems, create separate skeletons that can each be reviewed and filled independently.
3. **Clarify only contract decisions.** Ask one question at a time only when the answer changes required behavior, public interfaces, validation, errors, or success criteria. Otherwise choose the simplest structure consistent with project conventions and proceed.
4. **Scaffold directly.** Place declarations in existing files when their responsibilities fit there; otherwise create focused files following project conventions.

## Skeleton Contract

Always deliver both production and test skeletons, even when tests were not requested or are deferred. Every independently meaningful behavior in the resolved contract must have a named test declaration.

### Production structure

Keep and fully specify:

- Every requested function and method signature, with native parameter and return annotations where supported; otherwise document types using the project's conventions.
- Every requested class, struct, interface, enum, type alias, field, and attribute.
- Only imports required by declarations, types, documentation, decorators, or test structure.
- Concise documentation for every public and internal item. Document purpose, parameters, return values, raised errors, and notable behavior so the contract is understandable without body logic.

Do not add speculative helpers, public APIs, error types, fields, or configuration. Resolve missing contract requirements before scaffolding.

### Test structure

Create or modify test files according to project conventions. Test skeletons must include:

- One clearly named test declaration per behavior, validation rule, error, and notable edge case in the resolved contract.
- Typed fixtures or test helpers only when the test interfaces require them.
- Concise documentation for every test declaration, fixture, and helper, following project language and style conventions.
- No assertions, setup logic, mocks, or implementation inside bodies; test bodies use the same TODO-stub rule as production bodies.

Test names and documentation are the acceptance criteria. The later filling step implements their bodies.

### Body rule

Every empty or not-yet-written executable body—including production functions, methods, constructors, accessors, fixtures, helpers, and tests—contains exactly:

1. One single-line `TODO:` comment stating the body's complete intent.
2. The language's idiomatic unimplemented placeholder.

Do not include assignments, assertions, setup, pseudo-code, commented-out implementation, or additional statements.

| Language                | Exact body form                                                  |
| ----------------------- | ---------------------------------------------------------------- |
| Python                  | `# TODO: <intent>` then `raise NotImplementedError`              |
| TypeScript / JavaScript | `// TODO: <intent>` then `throw new Error("Not implemented");`   |
| Rust                    | `// TODO: <intent>` then `todo!()`                               |
| Go                      | `// TODO: <intent>` then `panic("not implemented")`              |
| Other                   | One `TODO:` comment plus the idiomatic unimplemented placeholder |

Use one convention consistently within each file.

### Existing implementations

Leave every existing real body unchanged during skeleton creation. Express required new behavior through its documented contract and named test skeletons; do not append TODOs or unimplemented placeholders to real bodies. The filling workflow will run the filled regression tests first and modify an existing body only when a test demonstrates a contract gap.

## Boundaries

- Follow existing project structure; split by responsibility, not by technical layer.
- Include only declarations and tests required by the resolved contract.
- Do not scaffold while contract-changing questions remain. Put only non-blocking follow-up questions after the skeleton instead of inventing answers.

## Verification

Before reporting completion:

1. Confirm every required behavior, validation rule, error, and notable edge case is represented in the production contract—through a signature, declaration, documentation, or TODO—and maps to at least one test declaration.
2. Check that paths, names, types, and interfaces are consistent across production and tests.
3. Scan every new body: it must contain exactly one specific TODO and one unimplemented placeholder.
4. Run the project's formatter and static checks when available.
5. Restore formatter changes to pre-existing lines, then confirm every pre-existing real body is byte-for-byte unchanged.
6. Run test discovery or the narrow test command when available. Any failure must be caused only by the intentional unimplemented placeholders; report that expected state explicitly.

## Output

The deliverable is the production and test skeleton code in the resulting file structure. End with only:

- a concise list of files created or modified;
- non-blocking follow-up questions, if any; and
- verification results, including expected failures from unimplemented placeholders.
