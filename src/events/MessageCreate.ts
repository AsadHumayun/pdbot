import { Events } from 'discord.js';
import type { Event } from '../types/Evemt.js';

export default {
	name: Events.MessageCreate,
	once: false,
	execute: async (message) => {
		console.log(`Received message: ${message.content}`);
	},
} satisfies Event<Events.MessageCreate>;
