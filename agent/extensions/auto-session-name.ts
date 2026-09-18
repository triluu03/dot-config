import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const SKILL_COMMAND_PATTERN = /^\/skill:[^\s]+(?:\s+([\s\S]*))?$/;

/**
 * Extract a deterministic session name from raw, pre-expansion user input.
 *
 * @param rawInput - First prompt exactly as submitted to Pi.
 * @returns The trimmed, single-line prompt without an explicit skill command, or `undefined` when empty.
 */
function extractSessionName(rawInput: string): string | undefined {
 const trimmedInput = rawInput.trim();
 if (!trimmedInput) return undefined;

 const skillCommand = trimmedInput.match(SKILL_COMMAND_PATTERN);
 const userPrompt = skillCommand ? skillCommand[1] : trimmedInput;
 if (!userPrompt) return undefined;

 const singleLinePrompt = userPrompt.replace(/\s+/g, " ").trim();
 return singleLinePrompt || undefined;
}

/**
 * Check whether a session already contains a user prompt.
 *
 * @param entries - Existing Pi session entries.
 * @returns `true` when a user message has already been stored.
 */
function hasUserPrompt(entries: readonly unknown[]): boolean {
 return entries.some((entry) => {
  if (!entry || typeof entry !== "object") return false;

  const candidate = entry as { type?: unknown; message?: { role?: unknown } };
  return candidate.type === "message" && candidate.message?.role === "user";
 });
}

/**
 * Register deterministic first-prompt session naming with Pi.
 *
 * @param pi - Pi extension API used to observe raw input and set session metadata.
 */
export default function autoSessionNameExtension(pi: ExtensionAPI): void {
 let hasHandledFirstPrompt = false;

 pi.on("input", (event, ctx) => {
  if (event.source === "extension") return;
  if (hasHandledFirstPrompt) return;
  if (pi.getSessionName()) return;
  if (hasUserPrompt(ctx.sessionManager.getEntries())) return;

  const sessionName = extractSessionName(event.text);
  if (!sessionName) return;

  hasHandledFirstPrompt = true;
  pi.setSessionName(sessionName);
 });
}
 
