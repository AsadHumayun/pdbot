import process from 'node:process';
import { Client, GatewayIntentBits } from 'discord.js';
import type { Event } from './types/Evemt.js';
import { loadCommands } from './util/loadCommands.js';
import { loadEvents } from './util/loadEvents.js';

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

process.on('uncaughtException', console.error);
process.on('unhandledRejection', console.error);
client.on('error', console.error);
client.on('warn', console.warn);

client.events = await loadEvents(new URL('events/', import.meta.url));

client.events!.each((event: Event) => {
	client[event.once ? 'once' : 'on'](event.name, async (...args) => {
		try {
			await event.execute(...args);
		} catch (error) {
			console.error(`Error executing event ${String(event.name)}:`, error);
		}
	});
});

client.commands = await loadCommands();

void client.login(process.env.DISCORD_TOKEN);
