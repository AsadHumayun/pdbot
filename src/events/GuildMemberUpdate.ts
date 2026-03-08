import { Events, type GuildMember } from 'discord.js';
import { type Event } from '../types/Evemt.js';

export default {
	name: Events.GuildMemberUpdate,
	once: false,
	execute: async (oldMember: GuildMember, newMember: GuildMember) => {

	}
} satisfies Event<Events.GuildMemberUpdate>
