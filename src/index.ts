import * as Discord from 'discord.js';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
  // If the message is "ping"
  if (message.content === 'y! YS') {
    // Send "pong" to the same channel
    message.channel.send('Yunnan Sourcing');
  }
});

client.login(process.env.BOT_TOKEN)