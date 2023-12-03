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

  /**
   * 
   * @returns List of ranks
   */
  async listRanks() {
    return await this.http.httpGet(`${this.config.apiEndpoint}/community/${this.config.communityId}/ranks`)
  }

  /**
   * 
   * @param rank the rank number you would like to get
   * @returns Details on a single rank
   */
  async getRank(rank: number) {
    return await this.http.httpGet(`${this.config.apiEndpoint}/community/${this.config.communityId}/ranks/${rank}`)
  }

  /**
   * 
   * @param rank rank the rank number you would like to delete
   * @returns Nothing
   */
  async deleteRank(rank: number) {
    return await this.http.httpDelete(`${this.config.apiEndpoint}/community/${this.config.communityId}/ranks/${rank}`)
  }

  /**
   * 
   * @param body 
   * @returns 
   */
  async createRank(body: any) {
    return await this.http.httpPost(`${this.config.apiEndpoint}/community/${this.config.communityId}/ranks`, body, true)
  }

  /**
   * 
   * @param rank the rank number you wish to update
   * @param body 
   * @returns 
   */
  async updateRank(rank: number, body: any) {
    return await this.http.httpPut(`${this.config.apiEndpoint}/community/${this.config.communityId}/ranks/${rank}`, body, true)
  }

  /**
   * 
   * @param order a list of objects consisting of rank ID's and their new order
   * @returns Nothing
   */
  async updateRankOrder(order: [IRankOrder]) {
    return await this.http.httpPut(`${this.config.apiEndpoint}/community/${this.config.communityId}/ranks/change-order`, order, false)
  }
}
