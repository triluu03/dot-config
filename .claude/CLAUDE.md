# Coding Style

These rules are strict. Follow them exactly unless the existing project clearly does otherwise (in which case follow the project and tell me).

When in doubt, match the surrounding code and tell me.

## Universal Rules

### General Principles
- Avoid using nested loops or if-else statements. Prefer filtering the values first and continue operations.
- Prefer functional coding style.
- Pure functions by default. Push all side-effects (except logging) to the edges.

### Documentation
- Document all code — both public API and internal/private code.
- Public functions, classes, and modules always get a full docstring or doc comment describing purpose, parameters, return values, and any notable behavior. In the high level, the reader should be able to understand the public APIs just by reading the typings and the docstring.
- Internal code gets inline comments that explain *why*, not just *what* — especially for non-obvious logic, invariants, or workarounds.
- Never leave undocumented code in a submitted state.

### Error Handling
- Handle every error case explicitly — no silent swallowing, no bare `pass`/`_` on errors.
- Error messages must include context: what failed, with what input, and suggests steps for fixing/debugging.
- Do not add error handling for scenarios that genuinely cannot happen; focus handling at real failure boundaries.

### Code Structure
- Enforce strict layered architecture: domain logic, infrastructure (DB, external services), and API/presentation are distinct layers.
- Types, models, and concerns from one layer must not leak into another (e.g., DB row types stay in the infra layer; domain models are framework-agnostic).
- Prefer flat within-layer organization over deep nesting.

---

## TypeScript / JavaScript

- Assume ESLint and Biome (or Prettier) are running — do not manually format the code.
- Use JSDoc (`/** */`) for all public functions, classes, and exported types.
- Use strict TypeScript. Avoid `any`; if a type is truly unknown use `unknown` and narrow it.

## Python

- Assume Ruff is running - do not manually format the code.
- Use Numpy-style docstrings for all public and internal functions and classes.
- Always include type hints on function signatures and class attributes. Avoid using `any` as type hints.
- f-strings only.

## Rust

- Assume `rustfmt` is running — do not manually format the code.
- Use `///` doc comments for all public items (functions, structs, enums, traits, modules).
- Use `//` inline comments inside function bodies for non-obvious logic.
- Use `Result<T, E>` for all fallible operations.
- Never use `.unwrap()` or `.expect()` in production code paths — use `?` or explicit error handling.

