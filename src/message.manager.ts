import * as Discord from 'discord.js';
import { GlossaryManager } from "./glossary.manager";

export class MessageManager {

    private readonly glossaryManager: GlossaryManager;

    constructor(){
        this.glossaryManager = new GlossaryManager();
    }

    async process(message: Discord.Message) {
        try {
            const messageContent = message.content.trim();
            if (messageContent.startsWith('ysb!')) {
                const userRequest = messageContent.split('!')[1].trim();
                const parameters = userRequest.split(' ');
                const module = parameters[0];
                const commandData = parameters[1];
                console.log(userRequest, parameters, module, commandData);
                switch(module){
                    case ('glossary'):
                        message.channel.send(this.glossaryManager.getDefinition(commandData));
                        break;
                    default:
                        message.channel.send(`The request doesn't match any features of this bot`);
                        break;
                }
            }
        } catch (err) {
            console.log(`The message couldn't be processed: ${err.message}`)
        }
    }
}