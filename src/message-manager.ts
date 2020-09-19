import * as Discord from 'discord.js'
import { GlossaryManager } from './modules/glossary'
import { BabelcarpManager } from './modules/babelcarp'
import {
  HELP_MESSAGE,
  INCORRECT_FEATURE,
  NO_TEAPARTY,
  TEA_PARTY_PLACE,
} from './messages'

export class MessageManager {
  private readonly glossaryManager: GlossaryManager
  private readonly babelcarpManager: BabelcarpManager

  private readonly teaPartyRoleId: string

  constructor() {
    this.glossaryManager = new GlossaryManager()
    this.babelcarpManager = new BabelcarpManager()
    console.log(process.env)
    this.teaPartyRoleId = process.env.TEA_PARTY_ID
  }

  async process(message: Discord.Message): Promise<void> {
    const messageContent = message.content.trim().toLowerCase()
    const regex = /^([Yy][Ss][bB])!\s*([A-z]*)\s*(.*)/
    const parsedMessage = messageContent.match(regex)

    if (parsedMessage) {
      const module = parsedMessage[2]
      const commandData = parsedMessage[3]?.split(' ')
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
        case 'teaparty':
          if (message.channel.type === 'text') {
            answer = this.prepareTeaParty(
              message.member,
              commandData?.join(' '),
            )
          } else {
            answer = TEA_PARTY_PLACE
          }
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

  private checkPartyPermissions(member: Discord.GuildMember): boolean {
    return member.roles.cache.some((role) =>
      /(teaple|aristeacrats|royaltea|deitea|Vendors|Streamers|Bloggers and Reviewers|VIPs)/.test(
        role.name,
      ),
    )
  }

  private prepareTeaParty(
    member: Discord.GuildMember,
    message: string,
  ): string {
    if (this.checkPartyPermissions(member)) {
      return `<@&${this.teaPartyRoleId}> ${message || ''}`
    } else {
      return NO_TEAPARTY
    }
  }
}
