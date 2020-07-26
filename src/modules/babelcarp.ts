import { JSDOM } from 'jsdom'
import axios, { AxiosInstance } from 'axios'

export class BabelcarpManager {
  private readonly http: AxiosInstance
  constructor() {
    this.http = axios.create({
      baseURL: 'https://www.babelcarp.org/babelcarp/babelcarp.cgi',
    })
  }
  async search(terms: string[]): Promise<string> {
    const query = this.buildQuery(terms)
    const rawDom = await this.getRawDOM(query)
    if (!rawDom) return 'There was a problem fetching the definition'
    const dom = new JSDOM(rawDom, {
      includeNodeLocations: true,
    })
    const definitions = dom.window.document.getElementById('translation')
    return definitions.textContent.slice(12)
  }

  private buildQuery(terms: string[]): string {
    return `?phrase=${terms.join('+')}`
  }

  private async getRawDOM(query: string): Promise<string> {
    try {
      const response = await this.http.post(query)
      if (response.status === 200) {
        return response.data
      }
    } catch (err) {
      console.log(`Error fetching babelcarp definition: ${err.message}`)
    }
  }
}
