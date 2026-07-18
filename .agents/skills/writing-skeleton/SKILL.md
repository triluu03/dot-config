---
name: writing-skeleton
description: "Use only when the user explicitly requests a code skeleton or asks to scaffold code contracts before implementation."
disable-model-invocation: true
---

# Writing Skeleton

## Overview

A skeleton is an implementation plan expressed as code. Production and test files define the complete contract through declarations, types, documentation, test names, and precise TODO stubs; body implementation belongs to the next step.

This workflow is self-contained. Do not invoke `brainstorming` or `writing-plans`, and do not create Markdown specification or plan files.

## Design Gate

Do not scaffold code until the user approves the design.

1. **Inspect context.** Read relevant source, tests, project instructions, documentation, and relevant recent changes. Identify established file, naming, typing, documentation, and testing conventions.
2. **Check scope.** If the request spans independent subsystems, propose separate skeletons that can each be reviewed and filled independently.
3. **Clarify adaptively.** Ask one question at a time only where an answer changes the contract.
   - For straightforward work, proceed to a brief design.
   - For ambiguous or substantial work, clarify purpose, constraints, behavior, errors, and success criteria.
   - When meaningful trade-offs exist, present two or three approaches, lead with a recommendation, and explain the trade-offs.
4. **Present the design in conversation.** Include:
   - the goal and chosen approach;
   - exact files to create or modify and each file's responsibility;
   - interfaces each unit consumes and produces, including exact names and types;
   - documented behavior, validation, errors, and notable edge cases;
   - production and test declarations to scaffold.
5. **Request approval.** Revise the conversational design until approved.
6. **Scaffold after approval.** Place declarations in existing files when their responsibilities fit there; otherwise create focused files following project conventions.

## Skeleton Contract

Always deliver both production and test skeletons, even when tests were not requested or are deferred. Every independently meaningful behavior in the approved contract must have a named test declaration.

### Production structure

Keep and fully specify:

- Every requested function and method signature, with native parameter and return annotations where supported; otherwise document types using the project's conventions.
- Every requested class, struct, interface, enum, type alias, field, and attribute.
- Only imports required by declarations, types, documentation, decorators, or test structure.
- Concise documentation for every public and internal item. Document purpose, parameters, return values, raised errors, and notable behavior so the contract is understandable without body logic.

Do not add speculative helpers, public APIs, error types, fields, or configuration. Raise missing design requirements before scaffolding.

### Test structure

Create or modify test files according to project conventions. Test skeletons must include:

- One clearly named test declaration per behavior, validation rule, error, and notable edge case in the approved contract.
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

Never rewrite, reorder, delete, trim, or comment out an existing real body. If the approved skeleton marks that body for later work, append only these two lines at the very end of the body:

1. One single-line `TODO:` comment stating the remaining intent.
2. The language's idiomatic unimplemented placeholder.

It is acceptable for the appended placeholder to make existing behavior fail or become unreachable. Preserve every pre-existing line verbatim.

## Boundaries

- Follow existing project structure; split by responsibility, not by technical layer.
- Include only approved declarations and tests.
- Do not scaffold while contract-changing questions remain. Put only non-blocking follow-up questions after the skeleton instead of inventing answers.

## Verification

Before reporting completion:

1. Confirm every approved behavior, validation rule, error, and notable edge case is represented in the production contract—through a signature, declaration, documentation, or TODO—and maps to at least one test declaration.
2. Check that paths, names, types, and interfaces are consistent across production and tests.
3. Scan every new body: it must contain exactly one specific TODO and one unimplemented placeholder.
4. Run the project's formatter and static checks when available.
5. Restore formatter changes to pre-existing lines, then confirm every pre-existing body is byte-for-byte unchanged except for an allowed append-only stub.
6. Run test discovery or the narrow test command when available. Any failure must be caused only by the intentional unimplemented placeholders; report that expected state explicitly.

## Non-Negotiable Decisions

| Pressure                               | Required response                                               |
| -------------------------------------- | --------------------------------------------------------------- |
| "Skip design; this is urgent"          | Inspect context and obtain design approval before scaffolding.  |
| "Tests can wait"                       | Scaffold test declarations now; their bodies remain TODO stubs. |
| "Choose the missing behavior yourself" | Ask one focused question when the answer changes the contract.  |
| "Write a plan first"                   | Present design in conversation; create no plan file.            |

## Output

The deliverable is the production and test skeleton code in the approved file structure. End with only:

- a concise list of files created or modified;
- non-blocking follow-up questions, if any; and
- verification results, including expected failures from unimplemented placeholders.
