import type { Message } from 'discord.js';

export interface Command {
	/**
	 * The function to execute the command
	 *
	 * @param message - The message that requested this command.
	 * @param args - The arguments that were extracted from the instantiating message's content.
	 * @remarks This function will produce action by only its side effects and is
	 * not to return a value.
	 */
	execute(this: void, message: Message, args: string[]): Promise<void> | void;

	/**
	 * The name of this command
	 */
	name: string;
}
