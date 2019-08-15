import * as Discord from 'discord.js';
import { GlossaryManager } from "./glossary.manager";

export class MessageManager {

    private readonly glossaryManager: GlossaryManager;

    constructor(){
        this.glossaryManager = new GlossaryManager();
    }

    async process(message: Discord.Message) {
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
            }
        }
    }
}