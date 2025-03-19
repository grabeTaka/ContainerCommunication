/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosInstance } from 'axios'
import { getbyNameResult, pokemonServiceInterface } from './index.d'
import { pokemonType } from '@/types/pokemon'

export const pokemonMock: pokemonType = {
    abilities: ['thunderbolt', 'thunder'],
}

const pokemonResultMock: getbyNameResult = {
    name: 'pikachu',
    abilities: [
        {
            ability: {
                name: 'thunderbolt',
                url: 'https://pokeapi.co/api/v2/ability/44/',
            },
        },
        {
            ability: {
                name: 'thunder',
                url: 'https://pokeapi.co/api/v2/ability/34/',
            },
        },
    ],
}

const getPokemonMock = (name: string): getbyNameResult | null => {
    if (name === pokemonResultMock.name) return pokemonResultMock
    else return null
}

export class PokemonServiceMock implements pokemonServiceInterface {
    api: AxiosInstance
    url: null

    getByName = jest.fn((name: string) => Promise.resolve(getPokemonMock(name)))
}
