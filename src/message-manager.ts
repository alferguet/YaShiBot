import * as Discord from 'discord.js'
import { GlossaryManager } from './modules/glossary'

export class MessageManager {
  private readonly glossaryManager: GlossaryManager

  constructor() {
    this.glossaryManager = new GlossaryManager()
  }

  async process(message: Discord.Message): Promise<void> {
    const messageContent = message.content.trim()
    if (messageContent.startsWith('ysb!')) {
      const userRequest = messageContent.split('!')[1].trim()
      const parameters = userRequest.split(' ')
      const module = parameters[0]
      const commandData = parameters[1]
      switch (module) {
        case 'glossary':
          await message.channel.send(
            this.glossaryManager.getDefinition(commandData),
          )
          break
        case 'help':
          await message.channel.send(`WIP`)
          break
        default:
          await message.channel.send(
            `The request doesn't match any features of this bot`,
          )
          break
      }
    }
  }
}
