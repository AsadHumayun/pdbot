import type { ClientEvents } from 'discord.js';

/**
 * Defines the structure of an event.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type Event<EventName extends keyof ClientEvents = keyof ClientEvents> = {
	/**
	 * The function to execute when the event is emitted.
	 *
	 * @param parameters - The parameters of the event
	 */
	execute(...parameters: ClientEvents[EventName]): Promise<void> | void;
	/**
	 * The name of the event to listen to
	 */
	name: EventName;
	/**
	 * Whether or not the event should only be listened to once
	 */
	once: boolean;
};
