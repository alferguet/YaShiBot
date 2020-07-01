import { google } from 'googleapis'
import { CronJob } from 'cron'

export class GlossaryManager {
  glossary: Map<string, string> = new Map<string, string>()

  constructor() {
    const job = new CronJob('*/15 * * * * *', async () => {
      try {
        await this.getGlossary()
      } catch (err) {
        console.log(`Error updating the glossary: ${err.message}`)
      }
    })
    job.start()
  }

  async getGlossary(): Promise<void> {
    const sheets = google.sheets('v4')
    const res = await sheets.spreadsheets.values.get({
      auth: process.env.G_API_KEY,
      spreadsheetId: '1kAhzWYFtAnXwzjbQGJKrvLbzKiSMcQAWNVb8RKICC-I',
      range: 'A:B',
    })
    const rows = res.data.values
    if (rows.length === 0) {
      throw new Error('No data found')
    }
    this.parseGlossary(rows)
  }

  getDefinition(key: string): string {
    return this.glossary.get(key.toLowerCase())
  }

  parseGlossary(rows: string[][]): void {
    this.glossary = new Map<string, string>()
    for (const row of rows) {
      if (row[0] && row[1]) {
        for (const entry of row[0].split(',')) {
          this.glossary.set(entry.trim().toLowerCase(), row[1])
        }
      }
    }
  }
}
