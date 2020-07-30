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
    const messageContent = message.content.trim()
    if (messageContent.startsWith('ysb!')) {
      const userRequest = messageContent.split('!')[1].trim()
      const parameters = userRequest.split(' ')
      const module = parameters[0]
      const commandData = parameters.slice(1)
      let answer: string
      switch (module) {
        case 'glossary':
          answer = this.glossaryManager.getDefinition(commandData)
          break
        case 'bc':
          answer = await this.babelcarpManager.search(commandData)
          break
        case 'help':
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
