import { createApi } from './services/utils/webhooks.js'
import { CommunityRanks } from './services/index.js'
import { IConfig } from './types/interactions.js'
import axios from 'axios'

export class UnitCommanderWebhookService {
  actions: any = {}

  webhookAddAction(type: string, action: Function): void {
    this.actions[type] = action
  }

  webhookListen(port: number = 3000): void {
    createApi(this.actions).listen(port, () => {
      console.log(`UnitCommander Webhook Listener is running on port: ${port}`)
    })
  }
}

/**
 * @description UnitCommander Interaction Service, use this to help you interact with Unit Commander using a bot token
 * @type {IConfig}
 * @param config botToken, communityAbbreviation, communityId
 */
export class UnitCommanderServices {
  configuration: IConfig

  constructor(config: IConfig) {
    config.apiEndpoint = config.apiEndpoint
      ? config.apiEndpoint
      : 'https://api.unitcommander.co.uk'
    if (!config.communityAbbreviation || !config.botToken) {
      throw new Error(
        'You are missing values. Required values are communityAbbreviation and botToken'
      )
    }
    this.configuration = config
  }

  /**
   * @description initalizes your configuration options again UnitCommander API's
   */
  async initilize() {
    if (!this.configuration.communityId) {
      const response = await axios.get(
        `${this.configuration.apiEndpoint}/community/abbreviation/${this.configuration.communityAbbreviation}`
      )
      this.configuration.communityId = response.data.id
    }
  }

  /**
   * @description Creates the object used for creating / updating entities
   * @param data a JSON object of the body data
   * @param img an image buffer from your local directory used to add images to UnitCommander
   * @returns formData object for creating / updating
   */
  createBody(data: Object, img: Buffer) {
    const form = new FormData()
    const body = new Blob([JSON.stringify(data)], { type: 'application/json' })
    const image = new Blob([img], { type: 'image/png' })
    form.append('body', body)
    form.append('image', image)
    return form
  }

  /**
   * @description Community Ranks, all options for getting, adding, deleting and modifying ranks
   */
  Ranks() {
    return new CommunityRanks(this.configuration)
  }
}
