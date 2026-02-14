import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { Collection } from 'discord.js';
import type { Command } from '../types/Command.js';

export async function loadCommands(): Promise<Collection<string, Command>> {
	const commands = new Collection<string, Command>();
	const commandsPath = join('file://' + process.cwd() + '/dist/commands');

	const commandsURL = new URL(commandsPath + '/');

	console.log(`[INFO] commands folder: ${commandsURL.href}`);

	// eslint-disable-next-line n/no-sync
	const files = readdirSync(fileURLToPath(commandsURL));

	for (const file of files) {
		if (!file.endsWith('.js')) continue;

		// Use a proper file URL for dynamic import
		const fileURL = pathToFileURL(fileURLToPath(new URL(file, commandsURL))).href;

		console.log(`[INFO] Importing command at ${fileURL}...`);

		const commandModule = await import(fileURL);

		if (!commandModule?.default) {
			console.warn(`[WARN] ${file} has no default export; skipping...`);
			continue;
		}

		const { name, execute } = commandModule.default as Command;

		console.info(`[INFO] Setting command '${name}'`);
		commands.set(name, { name, execute });
	}

	console.log(`[INFO] Returning commands collection with ${commands.size} entries`);
	return commands;
}
