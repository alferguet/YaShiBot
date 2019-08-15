
import * as dotenv from 'dotenv';
import { DiscordManager } from './discord.manager';

try {
  dotenv.config();
  const discordManager = new DiscordManager();
} catch (err) {
  console.log('Bot initialization failed')
}
