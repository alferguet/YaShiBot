import * as dotenv from 'dotenv'
import { initiateBot } from './client'
import { stat } from 'fs/promises'

async function run() {
  const existsEnvFile = (await stat('.env'))?.isFile()
  if (!existsEnvFile) throw new Error('No env file provided')
  dotenv.config()
  await initiateBot()
}

run().catch((err) => console.log(`Bot initialization failed: ${err.message}`))
