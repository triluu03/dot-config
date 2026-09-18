---
name: build-prototype
description: Use only when the user explicitly invokes this skill by name to build a quick working prototype in the current directory
---

# Build Prototype

## Overview
This skill is manual-only — never self-select it based on a generic "build me a prototype" request; only follow it when the user explicitly invokes it.

Build a working prototype as independently as possible, scoped entirely to the current working directory. Do not pause to ask clarification from the user.


## Boundaries

- All reads, writes, and commands must stay within the current directory tree (cwd and its subdirectories). Do not read, write, or run commands against anything outside it — no sibling projects, no global configs/dotfiles, no fetching reference material from other local paths.
- If the prototype needs something that would normally live outside the directory (API keys, system-wide config, external services), use a placeholder, stub, or mock instead of reaching outside.
- Network access for fetching packages/docs is fine; the restriction is about the local filesystem and other local resources.

## Workflow

1. Read whatever context already exists in the directory (README, existing code, configs) to understand the goal.
2. If something is ambiguous — tech stack, data format, scope, naming — pick the most reasonable option and proceed. Do not pause to ask the user.
3. Build the prototype end-to-end: working code, runnable, minimal but functional. Skip polish (tests, docs, error handling beyond the basics) unless needed for it to run.
4. Verify it actually runs (execute it, smoke-test the main path).
5. Report back to the user: what was built, how to run it, and every assumption made — so they can correct any that are wrong.

## Key principle

Momentum over precision: a working prototype with documented assumptions beats a half-finished one stalled on a clarifying question.
