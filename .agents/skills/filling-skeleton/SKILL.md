---
name: filling-skeleton
description: "Use only when the user explicitly requests implementation of an existing code and test skeleton without changing its approved contract."
disable-model-invocation: true
---

# Filling a Skeleton

## Overview

A skeleton is a reviewed specification expressed as production and test code. Signatures, types, documentation, test names, and TODOs define the contract. Filling replaces those stubs with tested behavior without changing the public contract.

This workflow is self-contained. Do not invoke Superpowers execution skills or create plan, progress-ledger, or specification files.

## Pre-Flight Contract Review

Complete this review before editing any body:

1. Read relevant project instructions, production files, tests, documentation, and established implementation patterns.
2. Inventory every production stub and test stub in the approved scope.
3. Map each documented behavior, validation rule, error, and edge case to its test declaration and the smallest production location—or strictly necessary set of locations—that can satisfy it.
4. Check the complete skeleton for contradictory documentation, missing decisions, inconsistent names or types, unavailable dependencies, and requirements that would force a public-contract change.
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
3. **Implement minimally.** Replace or incrementally extend the primary production body—or the strictly necessary set of bodies—with only enough logic to satisfy that behavior.
4. **Verify GREEN.** Run the narrow test and confirm it passes with clean output.
5. **Check related behavior.** Run directly related tests to catch regressions.
6. **Self-review.** Confirm the change satisfies the documented contract, stays in scope, and remains readable.
7. Continue immediately with the next behavior unit.

If a production body supports several behaviors, evolve it through successive test-first cycles. Do not intentionally implement a later behavior before filling its test. If an earlier minimal implementation incidentally satisfies a later behavior, confirm the later test meaningfully exercises the approved contract and passes for the correct reason; do not break correct code to manufacture RED.

### Pre-existing implementations

Fill and run the regression test before changing any real pre-existing body. If the test passes because the existing logic already satisfies the contract, remove only any appended skeleton TODO and unimplemented placeholder; preserve the real logic unchanged. Otherwise, require a demonstrated contract gap before altering working code.

Keep changes simple and non-breaking. Preserve signatures, return types, documented behavior, and call-site compatibility. Record every pre-existing body changed for the final report.

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

## Final Verification

Before claiming completion:

1. Confirm every approved production and test stub in scope has a real body.
2. Search the affected files for remaining skeleton TODOs and unimplemented placeholders; distinguish unrelated pre-existing markers from in-scope stubs.
3. Confirm every documented behavior, validation rule, error, and edge case has a passing test.
4. Run all focused tests, the relevant test suite, type checks, and linting with fresh output.
5. Review the complete diff for accidental contract changes, unrelated edits, and unnecessary implementation.
6. Confirm changes to pre-existing bodies preserve documented behavior and call-site compatibility.

Verification evidence, not confidence, determines completion.

## Example TDD Cycle

Skeleton test:

```python
def test_normalize_trims_surrounding_whitespace() -> None:
    """Normalize a value by removing its surrounding whitespace."""
    # TODO: verify normalization trims surrounding whitespace
    raise NotImplementedError
```

Fill and run the test first:

```python
def test_normalize_trims_surrounding_whitespace() -> None:
    """Normalize a value by removing its surrounding whitespace."""
    assert normalize("  value  ") == "value"
```

Expected RED: `normalize()` raises its intentional `NotImplementedError`. Then fill only that production behavior and rerun to GREEN:

```python
def normalize(value: str) -> str:
    """Return ``value`` without surrounding whitespace."""
    return value.strip()
```

## Final Report

Report only:

- files modified;
- production and test bodies filled;
- test, type-check, and lint commands with results;
- internal helpers and strictly necessary cross-location implementations introduced, with why;
- pre-existing implementations changed, with what changed and why; and
- remaining stubs and blockers, if completion was not possible.

If no pre-existing implementation changed, say so explicitly.

## Common Mistakes

| Mistake                                                   | Required correction                                                                                                                |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Filling production before its test is exercised           | Restore the production change and begin with the focused test. Do not manufacture RED when approved behavior is already satisfied. |
| Intentionally implementing several behaviors in one cycle | Return to one behavior; incidental satisfaction of a later contract is acceptable when its test is meaningful.                     |
| Spreading one behavior across code without necessity      | Keep it in one cohesive location unless existing boundaries or interfaces strictly require spanning.                               |
| Discovering obvious contract conflicts halfway through    | Inventory and review the complete skeleton before editing.                                                                         |
| Guessing after an unexpected failure                      | Investigate the root cause and test one hypothesis at a time.                                                                      |
| Reverting completed work because a later unit is blocked  | Keep verified units; report the remaining blocker and stubs.                                                                       |
| Changing documentation or tests to fit the code           | Keep the approved contract fixed or ask the user to revise it.                                                                     |
| Claiming completion with stubs or unverified behavior     | Report blocked status or run fresh complete verification.                                                                          |

## Explicit Exclusions

Do not create or require plan files, worktrees, branches, commits, subagents, reviewer agents, progress ledgers, or branch-completion workflows. Do not invoke other Superpowers skills; this skill contains the required execution discipline.
