import { IConfig } from "../types/interactions.js";
import { IRankOrder } from "../typings.js";
import { HttpMethods } from "./utils/httpMethods.js";

/**
 * @description Community Ranks, all options for getting, adding, deleting and modifying ranks
 */
export class CommunityRanks {
  private config: IConfig
  private http: any = undefined;

  constructor(config: IConfig) {
    this.http = new HttpMethods(config);
      this.config = config;
    }

  async listRanks() {
    return await this.http.httpGet(`${this.config.apiEndpoint}/community/${this.config.communityId}/ranks`)
  }

  async getRank(rank: number) {
    return await this.http.httpGet(`${this.config.apiEndpoint}/community/${this.config.communityId}/ranks/${rank}`)
  }

  async deleteRank(rank: number) {
    return await this.http.httpDelete(`${this.config.apiEndpoint}/community/${this.config.communityId}/ranks/${rank}`)
  }

  async createRank(body: any) {
    return await this.http.httpPost(`${this.config.apiEndpoint}/community/${this.config.communityId}/ranks`, body, true)
  }

  async updateRank(rank: number, body: any) {
    return await this.http.httpPut(`${this.config.apiEndpoint}/community/${this.config.communityId}/ranks/${rank}`, body, true)
  }

  async updateRankOrder(order: [IRankOrder]) {
    return await this.http.httpPut(`${this.config.apiEndpoint}/community/${this.config.communityId}/ranks/change-order`, order, false)
  }
}
