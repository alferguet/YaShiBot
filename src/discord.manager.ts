import * as Discord from 'discord.js';
import { MessageManager } from './message.manager';

export class DiscordManager {

    private readonly client: Discord.Client;
    private readonly messageManager: MessageManager;

    constructor() {
        this.client = new Discord.Client();
        this.messageManager = new MessageManager();
        this.client.on('ready', () => {
            console.log('I am ready!');
        });
        this.client.on('message', message => {
            this.messageManager.process(message);
        });
        this.client.login(process.env.BOT_TOKEN)
    }      
}