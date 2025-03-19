import { pokemonMock } from '@/services/pokemon/mock'

import { SortPokemonAbilityUseCase } from './index'

describe('Testing about GetPokemonUseCase', () => {
    it('Sould return object of pokemon', async () => {
        const useCase = new SortPokemonAbilityUseCase()
        useCase.prepare(pokemonMock)
        const result = await useCase.execute()
        expect(result).toEqual(pokemonMock)
    })
})
