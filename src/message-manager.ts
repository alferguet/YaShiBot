import * as Discord from 'discord.js'
import { GlossaryManager } from './modules/glossary'

export class MessageManager {
  private readonly glossaryManager: GlossaryManager

  constructor() {
    this.glossaryManager = new GlossaryManager()
  }

  async process(message: Discord.Message): Promise<void> {
    const messageContent = message.content.trim()
    const regex = /([Yy][Ss][bB])!\s([A-z]*)\s(.*)/
    const parsedMessage = messageContent.match(regex)

    if (parsedMessage.length == 4) {
      const module = parsedMessage[2].toLowerCase()
      const commandData = parsedMessage[3].toLowerCase()
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
