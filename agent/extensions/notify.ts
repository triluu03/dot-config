/**
 * Pi Notify Extension
 *
 * Sends a native notification when Pi agent is done and waiting for input.
 * Supports multiple notification backends:
 * - macOS Notification Center: osascript
 * - OSC 777: Ghostty, iTerm2, WezTerm, rxvt-unicode
 * - OSC 99: Kitty
 * - Windows toast: Windows Terminal (WSL)
 */

import { execFile } from "node:child_process";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

/**
 * Log notification delivery failures without interrupting the Pi session.
 *
 * @param channel - Notification backend that failed.
 * @param error - Error returned by the backend process.
 */
function logNotificationError(channel: string, error: Error | null): void {
	if (error === null) return;

	console.error(`Pi notification failed via ${channel}: ${error.message}`);
}

/**
 * Escape a value for use as an AppleScript string literal.
 *
 * @param value - Raw notification text.
 * @returns AppleScript-safe quoted string literal.
 */
function appleScriptString(value: string): string {
	return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

/**
 * Build the PowerShell script used for Windows toast notifications.
 *
 * @param title - Notification title.
 * @param body - Notification body.
 * @returns PowerShell script that displays the toast.
 */
function windowsToastScript(title: string, body: string): string {
	const type = "Windows.UI.Notifications";
	const mgr = `[${type}.ToastNotificationManager, ${type}, ContentType = WindowsRuntime]`;
	const template = `[${type}.ToastTemplateType]::ToastText01`;
	const toast = `[${type}.ToastNotification]::new($xml)`;
	return [
		`${mgr} > $null`,
		`$xml = [${type}.ToastNotificationManager]::GetTemplateContent(${template})`,
		`$xml.GetElementsByTagName('text')[0].AppendChild($xml.CreateTextNode('${body}')) > $null`,
		`[${type}.ToastNotificationManager]::CreateToastNotifier('${title}').Show(${toast})`,
	].join("; ");
}

/**
 * Send a native macOS notification through osascript.
 *
 * @param title - Notification title.
 * @param body - Notification body.
 */
function notifyMacOS(title: string, body: string): void {
	const script = `display notification ${appleScriptString(body)} with title ${appleScriptString(title)} sound name "Ping"`;
	execFile("osascript", ["-e", script], (error) => logNotificationError("macOS", error));
}

/**
 * Send a terminal notification using OSC 777.
 *
 * @param title - Notification title.
 * @param body - Notification body.
 */
function notifyOSC777(title: string, body: string): void {
	process.stdout.write(`\x1b]777;notify;${title};${body}\x07`);
}

/**
 * Send a Kitty terminal notification using OSC 99.
 *
 * @param title - Notification title.
 * @param body - Notification body.
 */
function notifyOSC99(title: string, body: string): void {
	// Kitty OSC 99: i=notification id, d=0 means not done yet, p=body for second part
	process.stdout.write(`\x1b]99;i=1:d=0;${title}\x1b\\`);
	process.stdout.write(`\x1b]99;i=1:p=body;${body}\x1b\\`);
}

/**
 * Send a Windows toast notification.
 *
 * @param title - Notification title.
 * @param body - Notification body.
 */
function notifyWindows(title: string, body: string): void {
	execFile("powershell.exe", ["-NoProfile", "-Command", windowsToastScript(title, body)], (error) =>
		logNotificationError("Windows", error),
	);
}

/**
 * Send a notification through the best backend for the current environment.
 *
 * @param title - Notification title.
 * @param body - Notification body.
 */
function notify(title: string, body: string): void {
	if (process.platform === "darwin") {
		notifyMacOS(title, body);
	} else if (process.env.WT_SESSION) {
		notifyWindows(title, body);
	} else if (process.env.KITTY_WINDOW_ID) {
		notifyOSC99(title, body);
	} else {
		notifyOSC777(title, body);
	}
}

/**
 * Build the notification body shown when Pi is ready for input.
 *
 * @param sessionName - Current Pi session name, when available.
 * @returns Human-readable notification body.
 */
function getNotificationBody(sessionName: string | undefined): string {
	// Pi sessions can be unnamed, so keep the fallback explicit in the notification.
	const displayName = sessionName ?? "Unnamed session";
	return `${displayName} is ready for input`;
}

/**
 * Register the notification extension with Pi.
 *
 * @param pi - Pi extension API.
 */
export default function (pi: ExtensionAPI) {
	pi.on("agent_settled", async () => {
		notify("Pi", getNotificationBody(pi.getSessionName()));
	});
}
