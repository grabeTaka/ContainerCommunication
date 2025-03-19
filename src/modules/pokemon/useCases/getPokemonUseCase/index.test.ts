import { PokemonServiceMock, pokemonMock } from '@/services/pokemon/mock'

import { GetPokemonUseCase } from './index'

const pokemonService = new PokemonServiceMock()

describe('Testing about GetPokemonUseCase', () => {
    it('Sould return object of pokemon', async () => {
        const useCase = new GetPokemonUseCase(pokemonService)
        useCase.prepare('pikachu')
        const result = await useCase.execute()

        expect(result).toEqual(pokemonMock)
    })

    it('Sould return null, pokemon not found', async () => {
        const useCase = new GetPokemonUseCase(pokemonService)
        useCase.prepare('chinchar')
        const executeCall = async () => await useCase.execute()
        expect(await executeCall).rejects.toThrowError('Pokemon not found')
    })
})
