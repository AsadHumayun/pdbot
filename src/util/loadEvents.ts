import { readdirSync } from 'node:fs';
import type { Events } from 'discord.js';
import { Collection } from 'discord.js';
import type { Event } from '../types/Evemt.js';

export async function loadEvents(path: URL): Promise<Collection<keyof typeof Events, Event>> {
	const events = new Collection<keyof typeof Events, Event>();

	// eslint-disable-next-line n/no-sync
	const files = readdirSync(path);
	console.info('[INFO] Path: ' + path.href);
	for (const file of files) {
		if (!file.endsWith('.js')) continue;
		const filePath = new URL(file, path.href).href;

		console.log(`[INFO] Dynamic-importing event at ${filePath}...`);
		const event = await import(filePath);
		console.log('[INFO] Imported event at ' + filePath);

		try {
			const { name, once, execute } = event.default;
			console.info(`[INFO] Binding event '${name}'...`);

			events.set(name, { name, once, execute });

			continue;
		} catch (error: unknown) {
			console.error(`Failed to import for ${error}`);
			continue;
		}
	}

	console.log(`[INFO] Returning events collection with ${events.size} entries`);
	return events;
}
