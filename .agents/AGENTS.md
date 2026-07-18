# Instructions

List of general instructions.

## Coding Instructions

Applies to all coding tasks. Follow it when the user asks you to plan or implement code.

Do not do anything beyond the scope of what user asks for. If something is not explicitly asked for, do not add or do it. If something is blocking you from completing the task, ask the user for clarification.

These rules are strict. Follow them exactly unless the existing project clearly does otherwise (in which case follow the project and tell me). When in doubt, match the surrounding code and tell me.

### Universal Rules

#### General Principles

- Always prioritize readability, maintainability, and simplicity over cleverness or performance.
- Avoid using nested loops and if-else statements. If the implementation requires more than 2 nested levels (e.g: 3-level indentations in Python), ask me to validate it.
- Prefer functional coding style, and prioritize filtering and mapping over mutating states.
- Pure functions by default. Push all side-effects (except logging) to the edges.
- Validations should be explicit and be placed at the beginning of the exposed APIs.
- If provided a specific scope for the implementation, do not add code that goes beyond the scope.
- Never run git commit yourself. The user always does that manually!

#### Documentation

- Document all code — both public API and internal/private code, but keep the documentation simple and concise.
- Public functions, classes, and modules always get a full docstring or doc comment describing purpose, parameters, return values, and any notable behavior. In the high level, the reader should be able to understand the public APIs just by reading the typings and the docstring.
- Internal code gets inline comments that explain _why_, not just _what_ — especially for non-obvious logic, invariants, or workarounds.
- Never leave undocumented code in a submitted state.

#### Error Handling

- Handle every error case explicitly — no silent swallowing, no bare `pass`/`_` on errors.
- Error messages must include context: what failed, with what input, and suggests steps for fixing/debugging.
- Do not add error handling for scenarios that genuinely cannot happen; focus handling at real failure boundaries.

#### Code Review

- Base code reviews on the best practices.
- Focus on readability and maintainability.
- Recommend simplifications (if possible).

---

### TypeScript / JavaScript

- Assume ESLint and Biome (or Prettier) are running — do not manually format the code.
- Use JSDoc (`/** */`) for all public functions, classes, and exported types.
- Use strict TypeScript. Avoid `any`; if a type is truly unknown use `unknown` and narrow it.

### Python

- Assume Ruff is running - do not manually format the code.
- Use Numpy-style docstrings for all public and internal functions and classes.
- Always include type hints on function signatures and class attributes. Avoid using `any` as type hints.
- f-strings only.
- No need to fix all LSP errors if fixing makes the implementation more complex or less readable.

### Rust

- Assume `rustfmt` is running — do not manually format the code.
- Use `///` doc comments for all public items (functions, structs, enums, traits, modules).
- Use `//` inline comments inside function bodies for non-obvious logic.
- Use `Result<T, E>` for all fallible operations.
- Never use `.unwrap()` or `.expect()` in production code paths — use `?` or explicit error handling.
