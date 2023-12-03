import axios from 'axios'
import { IConfig, IHttpReturnType } from '../../typings.js'
import createHttpError from 'http-errors';

export class HttpMethods {
  config: IConfig
  constructor(config: IConfig) {
    this.config = config
  }
  
  private getHeaders(auth: string, multipart = false) {
    return multipart ? {
      headers: {
        Authorization: 'Bot ' + auth,
        "Content-Type": "multipart/form-data",
      },
      validateStatus: () => true
    } : {
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bot ' + auth
      },
      validateStatus: () => true
    }
  }

  private validateHttpStatus(code: number, data: any): void {
    if(code != 200){
        throw createHttpError(code, data.message)
    }
  }

  async httpGet(endpoint: string): Promise<IHttpReturnType> {
    const {data, status} = await axios.get(endpoint, this.getHeaders(this.config.botToken));
    this.validateHttpStatus(status, data);
    return data;
  }

  async httpDelete(endpoint: string): Promise<IHttpReturnType> {
    const {data, status} = await axios.delete(endpoint, this.getHeaders(this.config.botToken));
    this.validateHttpStatus(status, data);
    return data;
  }

  async httpPost(endpoint: string, body: any = null, multipart = false): Promise<IHttpReturnType> {
    const {data, status} = await axios.post(endpoint, body ? body : null, this.getHeaders(this.config.botToken, multipart));
    this.validateHttpStatus(status, data);
    return data;
  }

  async httpPut(endpoint: string, body: any = null, multipart = false): Promise<IHttpReturnType> {
    const {data, status} = await axios.put(endpoint, body ? body : null, this.getHeaders(this.config.botToken, multipart));
    this.validateHttpStatus(status, data);
    return data;
  }
}
