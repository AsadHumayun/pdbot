import type { Command } from '../types/Command.js';

export default {
	name: 'ping',
	async execute(message) {
		await message.reply('Pong!');
	},
} satisfies Command;
