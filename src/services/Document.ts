import { IConfig } from "../types/interactions.js";
import { HttpMethods } from "./utils/httpMethods.js";

// Currently Broken
export class CommunityDocuments extends HttpMethods {
  interactionInstance: any = undefined;
  config: IConfig

  constructor(UnitCommanderInteractionServiceInstance: any) {
    super(UnitCommanderInteractionServiceInstance.configuration)
      this.interactionInstance = UnitCommanderInteractionServiceInstance;
      this.config = this.interactionInstance.configuration
    }

  async listDocuments() {
    // return this.httpGet(`${this.interactionInstance.}`)
    console.log(this.config)
    // console.error.
    return await this.httpGet(`${this.config.apiEndpoint}/community/${this.config.communityId}/documents`)

  }

}
