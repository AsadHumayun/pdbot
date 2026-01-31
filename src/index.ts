import process from 'node:process';
import { Client, GatewayIntentBits } from 'discord.js';
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

const events = await loadEvents(new URL('events/', import.meta.url));

for (const event of events!) {
	console.log(event);
}

// events!.forEach((event) => {
// 	console.log(event);
// 	client[event.once ? 'once' : 'on'](event.name, async (...args) => {
// 		try {
// 			await event.execute(...args);
// 		} catch (error) {
// 			console.error(`Error executing event ${String(event.name)}:`, error);
// 		}
// 	});
// });

void client.login(process.env.DISCORD_TOKEN);
