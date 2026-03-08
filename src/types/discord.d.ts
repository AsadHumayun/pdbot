import 'discord.js';
import type { Event } from './Evemt.js';

declare module 'discord.js' {
	interface Client {
		/**
		 * The commands that are loaded on to this client
		 */
		commands: Collection<string, Command>;

		/**
		 * The events that are loaded on this client.
		 */
		events: Collection<keyof typeof Events, Event>;
	}
}
