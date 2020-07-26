import * as dotenv from 'dotenv'
import { initiateBot } from './client'

async function run() {
  dotenv.config()
  await initiateBot()
}

run().catch((err) => console.log(`Bot initialization failed: ${err.message}`))

