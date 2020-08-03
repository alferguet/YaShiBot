import * as Discord from 'discord.js'
import { GlossaryManager } from './modules/glossary'
import { BabelcarpManager } from './modules/babelcarp'
import { HELP_MESSAGE, INCORRECT_FEATURE } from './messages'

export class MessageManager {
  private readonly glossaryManager: GlossaryManager
  private readonly babelcarpManager: BabelcarpManager

  constructor() {
    this.glossaryManager = new GlossaryManager()
    this.babelcarpManager = new BabelcarpManager()
  }

  async process(message: Discord.Message): Promise<void> {
    const messageContent = message.content.trim().toLowerCase()
    const regex = /^([Yy][Ss][bB])!\s*([A-z]*)\s*(.*)/
    const parsedMessage = messageContent.match(regex)

    if (parsedMessage) {
      const module = parsedMessage[2]
      const commandData = (parsedMessage[3] || '').split(' ')
      let answer: string

      switch (module) {
        case 'glossary':
        case 'g':
          answer = this.glossaryManager.getDefinition(commandData)
          break
        case 'babelcarp':
        case 'bc':
          answer = await this.babelcarpManager.search(commandData)
          break
        case 'help':
        case 'h':
          answer = HELP_MESSAGE
          break
        default:
          answer = INCORRECT_FEATURE
          break
      }
      await message.channel.send(answer)
    }
  }
}
