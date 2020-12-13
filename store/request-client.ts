import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Meta, Params } from '~/store/types'

export class RequestClient {
  public axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  async get(uri: string, params: Params = {}) {
    const queryString = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&')
    const query = queryString.length > 0 ? `${uri}?${queryString}` : uri
    return await this.axios.$get<Meta>(query)
  }
}

export function createRequestClient(axios: NuxtAxiosInstance) {
  return new RequestClient(axios)
}
