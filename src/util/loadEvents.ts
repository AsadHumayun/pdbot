import { readdirSync } from 'node:fs';
import type { Events } from 'discord.js';
import { Collection } from 'discord.js';
import type { Event } from '../types/Evemt.js';

const events = new Collection<keyof Events, Event>();

export async function loadEvents(path: URL) {
	// eslint-disable-next-line n/no-sync
	const files = readdirSync(path);

	for (const file of files) {
		if (!file.endsWith('.js')) return;

		console.log(`[INFO] Importing ${path}${file}...`);
		const event = await import(`${path}${file}`);
		const { name, once, execute } = event.default;

		console.info(`[INFO] Setting event '${name}'...`);
		events.set(name, { name, once, execute });
	}

	return events;
}
