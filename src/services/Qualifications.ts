import { IConfig } from "../types/interactions.js";
import { IQualificationOrder } from "../typings.js";
import { HttpMethods } from "./utils/httpMethods.js";

/**
 * @description Community Qualifications, all options for getting, adding, deleting and modifying qualifications
 */
export class CommunityQualifications {
  private config: IConfig
  private http: any = undefined;

  constructor(config: IConfig) {
    this.http = new HttpMethods(config);
      this.config = config;
    }

  /**
   * 
   * @returns List of qualifications
   */
  async listQualifications() {
    return await this.http.httpGet(`${this.config.apiEndpoint}/community/${this.config.communityId}/qualifications`)
  }

  /**
   * 
   * @param qualification the qualification number you would like to get
   * @returns Details on a single qualification
   */
  async getQualification(qualification: number) {
    return await this.http.httpGet(`${this.config.apiEndpoint}/community/${this.config.communityId}/qualifications/${qualification}`)
  }

  /**
   * 
   * @param qualification qualification the qualification number you would like to delete
   * @returns Nothing
   */
  async deleteQualification(qualification: number) {
    return await this.http.httpDelete(`${this.config.apiEndpoint}/community/${this.config.communityId}/qualifications/${qualification}`)
  }

  /**
   * 
   * @param body 
   * @returns 
   */
  async createQualification(body: any) {
    return await this.http.httpPost(`${this.config.apiEndpoint}/community/${this.config.communityId}/qualifications`, body, true)
  }

  /**
   * 
   * @param qualification the qualification number you wish to update
   * @param body 
   * @returns 
   */
  async updateQualification(qualification: number, body: any) {
    return await this.http.httpPut(`${this.config.apiEndpoint}/community/${this.config.communityId}/qualifications/${qualification}`, body, true)
  }

  /**
   * 
   * @param order a list of objects consisting of qualification ID's and their new order
   * @returns Nothing
   */
  async updateQualificationOrder(order: [IQualificationOrder]) {
    return await this.http.httpPut(`${this.config.apiEndpoint}/community/${this.config.communityId}/qualifications/change-order`, order, false)
  }
}
