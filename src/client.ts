import { Client } from 'discord.js'
import { MessageManager } from './message-manager'

export async function initiateBot(): Promise<string> {
  try {
    const messageManager = new MessageManager()
    return await initiateClient(messageManager)
  } catch (err) {
    console.log(
      `Error during the initialization of the Discord client: ${err.message}`,
    )
  }
}

async function initiateClient(messageManager: MessageManager): Promise<string> {
  const client = new Client()
  client.on('ready', () => {
    console.log('I am ready!')
  })
  client.on('message', (message) => {
    messageManager
      .process(message)
      .catch((err) =>
        console.log(`The message couldn't be processed: ${err.message}`),
      )
  })
  return await client.login(process.env.BOT_TOKEN)
}
