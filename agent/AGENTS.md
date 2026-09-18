# Global Instructions

For coding and planning tasks:

- Stay strictly within the requested scope. Ask when blocked or when requirements are ambiguous.
- Match existing project conventions; prioritize readability and simplicity.
- Do not commit changes.
- Keep control flow shallow where practical and avoid unnecessary abstractions or mutation.
- Validate exposed API inputs and handle realistic failure boundaries explicitly.
- Add concise documentation to public APIs and comments only where they explain non-obvious reasoning.
- Reviews should prioritize correctness, security, readability, and maintainability.

## TypeScript

Use strict types, avoid any, and document exported APIs with JSDoc.

## Python

Use type hints, NumPy-style public API docstrings, and f-strings.

## Rust

Use Result for fallible operations, avoid unwrap and expect in production paths, and document public items.

## Superpowers

Only load skills under obra/superpowers when the current user prompt explicitly contains the standalone word “superpowers” (case-insensitive).
