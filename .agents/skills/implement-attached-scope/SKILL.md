---
name: implement-attached-scoped
description: Automatically use when the user's prompt attaches one or more implementation targets with @ (a file, directory, or symbol) and asks to modify, implement, fix, refactor, or update code/docs; edit ONLY the attached scope and make changes nowhere else.
---

# Implement Attached Scope (Scoped)

## Overview

The user has attached one or more targets with `@` (e.g. `@src/parser.py`, `@components/Button.tsx`, `@lib/utils/`). Those attachments — and only those — define the **write boundary**. Implement the requested work inside that boundary and make **no edits anywhere else**, no matter how tempting or "obviously helpful" a change elsewhere would be.

This is a rigid, hard-boundary skill. The attached scope is a fence, not a suggestion.

## When to Use

Use this skill automatically when the user's prompt includes one or more `@`-attached targets and asks for an implementation change, including modifying, implementing, fixing, refactoring, updating, or documenting code or docs inside that attached scope.

Do not wait for the user to name this skill explicitly. The `@` attachment plus an action-oriented request is the trigger.

Do not use this skill when the user is already manually invoking a different skill.

Do not use this skill for read-only questions, explanations, broad planning, or requests where `@` is mentioned as plain text rather than as an attached target.

## The Boundary Rule

**You may edit only the files (or files within the directories) attached with `@` in the prompt.**

- A `@file` → that file is editable.
- A `@directory/` → files inside that directory are editable.
- A `@symbol` (function/class) → only that symbol's definition, within its file, is editable.
- Anything not attached → **read-only**. You may read it for context, but never modify it.

Reading other files for understanding is allowed and encouraged. **Writing** to them is not.

## The Workflow

1. **Identify the write boundary.** List every `@`-attached target from the prompt. Restate it back to the user in one line ("Editing only: `X`, `Y`") so the scope is explicit and confirmed before you touch anything.

2. **Implement the request inside the boundary.** Do exactly what the user asked, confined to the attached files. Follow the project's conventions and your coding rules (validation at boundaries, documentation, explicit error handling).

3. **Do not touch anything else.** No edits to other files, no new files, no renames, no config changes, no "drive-by" cleanups outside the boundary — even if they seem necessary or trivial.

4. **When the task genuinely needs an edit outside the boundary, STOP and ask.** If completing the request truly requires changing a file that wasn't attached (a shared type, a caller, an import elsewhere, a new file), do not do it silently. Describe exactly what out-of-scope change is needed and why, and ask the user whether to expand the scope. Wait for their answer.

5. **Verify within scope.** Type-check/lint the attached files and confirm the requested behavior. If verification reveals a problem rooted outside the boundary, report it (step 4) rather than fixing it yourself.

## Common Mistakes

| Mistake                                                        | Fix                                                                  |
| -------------------------------------------------------------- | -------------------------------------------------------------------- |
| Editing a caller, import, or shared type that wasn't attached  | That's outside the boundary. Stop and ask before changing it.        |
| Creating a new file because the change "needs" one             | New files are out of scope unless attached/requested. Ask first.     |
| "Drive-by" fixes or refactors in files opened only for context | Read-only means read-only. Note the issue to the user; don't edit.   |
| Silently expanding scope to "finish the job properly"          | Surface the needed out-of-scope change and let the user decide.      |
| Going beyond what was asked even inside the attached file      | Implement only the requested change; don't add unrequested behavior. |
| Treating a `@directory/` as license to touch the whole repo    | Only files within that exact directory are in scope.                 |
