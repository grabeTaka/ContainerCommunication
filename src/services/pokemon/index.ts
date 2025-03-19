/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosInstance } from 'axios'
import { pokemonServiceInterface } from './index.d'

export class PokemonServiceError extends Error {
    public code: number
    constructor(error) {
        const errorData = error.response?.data || {}
        const errorStatus = error.response?.status || null
        const errorMessage = errorData.message || null
        const errorRequest = error.request || {}
        super(errorMessage || 'Erro na integração com a api de pokemon')
        this.name = 'Erro na integração com a api de pokemon'
        this.code = errorStatus || 400
        console.error({
            request: {
                method: errorRequest.method,
                path: errorRequest.path,
            },
            response: errorData,
        })
    }
}

export class PokemonService implements pokemonServiceInterface {
    url: string
    api: AxiosInstance

    constructor(url: string) {
        this.url = url

        this.api = axios.create({ baseURL: this.url })

        this.api.interceptors.response.use(
            (response) => response,
            (error) => {
                return Promise.reject(new PokemonServiceError(error))
            }
        )
    }

    getByName = async (name: string) => {
        const response = await this.api.get(`/${name}`)
        return response.data
    }
}
