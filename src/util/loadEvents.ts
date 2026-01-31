import { readdirSync } from 'node:fs';
import type { Events } from 'discord.js';
import { Collection } from 'discord.js';
import type { Event } from '../types/Evemt.js';

export async function loadEvents(path: URL): Promise<Collection<keyof Events, Event>> {
	const events = new Collection<keyof Events, Event>();

	// eslint-disable-next-line n/no-sync
	const files = readdirSync(path);

	for (const file of files) {
		if (!file.endsWith('.js')) continue;

		console.log(`[INFO] Importing ${path}${file}...`);
		const event = await import(`${path}${file}`);

		try {
			const { name, once, execute } = event.default;
			console.info(`[INFO] Setting event '${name}'...`);

			events.set(name, { name, once, execute });

			console.log(`[INFO] Returning events collection with ${events.size} entries.`);

			continue;
		} catch {
			continue;
		}
	}

	return events;
}
