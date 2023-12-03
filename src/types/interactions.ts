

export interface IConfig {
    apiEndpoint?:string,
    communityId?: number,
    communityAbbreviation: string,
    botToken: string,
}

export interface IHttpReturnType {
    data: any,
    headers?: any,
    status?: number
}