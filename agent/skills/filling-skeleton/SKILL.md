---
name: filling-skeleton
description: "Use only when the user explicitly requests implementation of an existing code and test skeleton without changing its approved contract, followed by an independent read-only review and remediation of critical findings."
disable-model-invocation: true
---

# Filling a Skeleton

## Overview

A skeleton is a reviewed specification expressed as production and test code. Signatures, types, documentation, test names, and TODOs define the contract. Filling replaces those stubs with tested behavior, then uses one independent read-only reviewer subagent to evaluate the completed changes.

Do not delegate planning or implementation. The only permitted subagent is the post-implementation reviewer defined below.

## Pre-Flight Contract Review

Complete this review before editing any body:

1. Read relevant project instructions, production files, tests, documentation, and established implementation patterns.
2. Inventory every production stub and test stub in the approved scope.
3. Map each documented behavior, validation rule, error, and edge case to its test declaration and the smallest production location—or strictly necessary set of locations—that can satisfy it.
4. Check the complete skeleton for contradictory documentation, missing decisions, inconsistent names or types, unavailable dependencies, and requirements that conflict with the Contract Boundaries.
5. Present all detectable blocking concerns together. Do not begin implementation until the user resolves them.
6. If the contract is coherent, order the behavior units by dependency and proceed without another approval checkpoint.

The skeleton is the execution plan.

## Contract Boundaries

- Keep public names, signatures, parameter and return types, documented behavior, and test contracts fixed.
- Do not rewrite documentation to match an implementation. The implementation must match the documentation.
- Do not add public methods, classes, errors, fields, or configuration that the skeleton did not approve.
- Add internal helpers or change private data structures only when required for the contract; document and report them.
- Keep each behavior's implementation in one cohesive code location by default. Span bodies or files only when existing boundaries or interfaces make it strictly necessary; document and report why.
- Modify pre-existing real bodies only when filling genuinely requires it. Preserve their public behavior and existing call sites.
- If implementation requires a contract change, stop and ask rather than guessing.

## Behavior-by-Behavior TDD

A behavior unit is one testable documented behavior, its test declaration, and the smallest cohesive production location needed to satisfy it. A unit may span multiple bodies or files only when existing boundaries or interfaces make that strictly necessary. Execute all units continuously; do not ask whether to continue between units.

For each unit:

1. **Fill one test body.** Replace its TODO and unimplemented placeholder with a focused test of one behavior. Keep the test's approved name and documentation unchanged.
2. **Verify RED.** Run the narrow test and confirm it fails for the expected missing behavior—not because of syntax, setup, imports, or an incorrect assertion.
3. **Implement minimally.** Within the Contract Boundaries, replace or incrementally extend the primary production body—or the strictly necessary set of bodies—with only enough logic to satisfy that behavior.
4. **Verify GREEN.** Run the narrow test and confirm it passes with clean output.
5. **Check related behavior.** Run directly related tests to catch regressions.
6. **Self-review.** Confirm the change satisfies the Contract Boundaries and remains readable.
7. Continue immediately with the next behavior unit.

If a production body supports several behaviors, evolve it through successive test-first cycles. Do not intentionally implement a later behavior before filling its test. If an earlier minimal implementation incidentally satisfies a later behavior, confirm the later test meaningfully exercises the approved contract and passes for the correct reason; do not break correct code to manufacture RED.

### Pre-existing implementations

Fill and run the regression test before changing any real pre-existing body. If the test passes because the existing logic already satisfies the contract, preserve the body unchanged. Otherwise, require the failing test to demonstrate a contract gap before making the smallest change allowed by the Contract Boundaries.

Record every pre-existing body changed for the final report.

## Unexpected Failures

An expected RED failure is not a debugging failure. For any unexpected test, type-check, lint, or runtime failure:

1. Read the complete error and reproduce it consistently.
2. Compare the failing path with a similar working project pattern.
3. Trace the relevant inputs, state, and dependencies until the likely root cause is identified.
4. State one specific hypothesis and test it with the smallest possible change.
5. If disproved, discard that hypothesis and investigate again; do not stack speculative fixes.
6. After three unsuccessful hypotheses, stop and discuss whether the contract or architecture is wrong.

Never weaken a test merely to make it pass. Change a test contract only with user approval.

## Stop Conditions

Stop immediately when:

- the skeleton is contradictory or lacks a contract-changing decision;
- implementation needs an unapproved public API change;
- a required dependency, credential, service, or environment is unavailable;
- verification repeatedly fails or three hypotheses have failed;
- you cannot explain an instruction or observed behavior.

If blocked after partial progress, keep previously completed and verified behavior units. If the current unit's filled test still expresses an approved contract, keep that test as RED evidence and revert only speculative production changes. Restore the test stub only when the blocker reveals that its contract is invalid or unresolved. Report completed units, retained RED tests, remaining stubs, the exact blocker, and the decision or resource needed. Do not claim completion and do not discard verified work.

## Implementation Verification

Before independent review:

1. Confirm every approved production and test stub in scope has a real body.
2. Search the affected files for remaining skeleton TODOs and unimplemented placeholders; distinguish unrelated pre-existing markers from in-scope stubs.
3. Confirm every documented behavior, validation rule, error, and edge case has a passing test.
4. Run all focused tests, the relevant test suite, type checks, and linting with fresh output.
5. Review the complete diff for Contract Boundary violations, unrelated edits, and unnecessary implementation.

Verification evidence, not confidence, determines whether implementation is ready for independent review.

## Independent Review

After implementation verification succeeds, invoke exactly one independent `reviewer` subagent in single mode. Do not use parallel or chained agents. The reviewer is read-only: it must not modify files, run builds, or implement fixes.

Give the reviewer:

- the exact production and test files changed by this workflow;
- the approved skeleton contract and the relevant documented behavior, validation, errors, and edge cases;
- the applicable project instructions;
- the test, type-check, and lint commands already run, with their results; and
- instructions to inspect the current diff and read new or untracked files directly so they are not omitted.

The reviewer must review only changes made while filling the current skeleton and must not report unrelated or pre-existing issues. Before reviewing, it must read the `REVIEW_RUBRIC` constant from `$HOME/.pi/agent/git/github.com/earendil-works/pi-review/review.ts` and apply that rubric. It must not invoke `/review` or `/end-review`, because subagents run non-interactively. If the rubric cannot be found, read, or clearly identified, stop and report the independent review as blocked rather than substituting an invented rubric.

Require the reviewer to return:

1. An overall verdict of `correct` or `needs attention`.
2. Every actionable finding, classified as P0, P1, P2, or P3, with an exact file location, evidence, impact, and required correction.
3. The rubric's non-blocking human reviewer callouts.
4. An explicit statement when no qualifying findings exist.

If the reviewer fails, aborts, or returns findings without the required priority and evidence, report the review as incomplete and do not silently claim reviewed completion.

## Critical Finding Remediation

Treat P0 and P1 as critical. Leave P2 and P3 unchanged, even when they appear quick to fix, and preserve them for the final report. Human reviewer callouts are informational unless supported by a separate P0 or P1 finding.

For each P0 or P1 finding:

1. Independently validate that it is supported, introduced by the current changes, and consistent with the Contract Boundaries.
2. If it is invalid, pre-existing, or violates the Contract Boundaries, do not modify code; record the finding and the reason it was rejected.
3. If the existing tests do not expose a valid defect, add or strengthen the smallest regression test allowed by the Contract Boundaries and verify RED for the expected reason.
4. Make the smallest implementation change allowed by the Contract Boundaries that resolves the validated finding.
5. Run the focused test to GREEN and run directly related tests.

Do not start another reviewer or an automatic review/fix loop. The main agent owns all remediation.

## Final Verification

After critical remediation, rerun the complete Implementation Verification with fresh output. Verification evidence, not confidence, determines completion.

## Final Report

Report only:

- **Implementation:** files modified; production and test bodies filled; internal helpers or cross-location changes and why; pre-existing implementations changed, or an explicit statement that none changed.
- **Verification:** test, type-check, and lint commands with pre-review and post-remediation results.
- **Independent review:** verdict; every P0–P3 finding; each P0/P1 disposition and verification; every unaddressed P2/P3 finding; and all non-blocking human reviewer callouts. State explicitly when there were no findings.
- **Incomplete work:** remaining stubs, incomplete review state, and blockers, when applicable.
 
