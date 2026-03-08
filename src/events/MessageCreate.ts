import process from 'node:process';
import { Events } from 'discord.js';
import type { Event } from '../types/Evemt.js';

export default {
	name: Events.MessageCreate,
	once: false,
	execute: async (message) => {
		if (message.author.bot || message.webhookId || !message.guild) return;
		if (message.guild.id !== process.env.HOME_GUILD) return;

		const args = message.content.slice(process.env.PREFIX!.length).trim().split(/ +/);
		const commandName = args.shift()!.toLowerCase();
		const command = message.client.commands.get(commandName);

		if (!command) return void 0; // No command found by that name

		try {
			await command.execute(message, args);
		} catch (error: unknown) {
			await message.channel.send(`Sorry, but an exception occurred :c\n\`${error}\``);
		}
	},
} satisfies Event<Events.MessageCreate>;
