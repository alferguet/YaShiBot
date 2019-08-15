import { google } from 'googleapis';

export class GlossaryManager {


  glossary: Map<string, string> = new Map<string, string>();

  constructor() {
    this.getGlossary();
    setInterval(this.getGlossary, 43200000);
  }

  async getGlossary() {
    const sheets = google.sheets('v4');
    const res = await sheets.spreadsheets.values.get(
      {
        auth: process.env.G_API_KEY,
        spreadsheetId: '1kAhzWYFtAnXwzjbQGJKrvLbzKiSMcQAWNVb8RKICC-I',
        range: 'A:B',
      })
    const rows = res.data.values;
    if (rows.length === 0) {
      throw new Error('No data found')
    }
    this.parseGlossary(rows);
  }

  getDefinition(key: string): string {
    console.log(key.toLowerCase(), this.glossary.has('ys'))
    const value = this.glossary.get(key.toLowerCase());
    console.log(value, this.glossary);
    return value;
  }

  parseGlossary(rows: string[][]): void {
    this.glossary = new Map<string, string>();
    for (const row of rows) {
      if (row[0] && row[1]) {
        for (const entry of row[0].split(',')) {
          this.glossary.set(entry.trim().toLowerCase(), row[1]);
        }
      }
    }
  }
}
