import { PokemonService } from './index'

describe('Tests about pokemon service', () => {
    it('Should check the query parameter to send', async () => {
        const url = 'http://test/api/v2/pokemon'

        const pokemonService = new PokemonService(url)

        jest.spyOn(pokemonService.api, 'get').mockReturnValueOnce(
            Promise.resolve({})
        )
        await pokemonService.getByName('chinchar')
        expect(pokemonService.api.get).toHaveBeenCalledWith('/chinchar')
    })

    it('Should return null with if doesnt find pokemon', async () => {
        const url = 'http://test/api/v2/pokemon'

        const pokemonService = new PokemonService(url)

        jest.spyOn(pokemonService.api, 'get').mockReturnValueOnce(
            Promise.resolve({})
        )
        const result = await pokemonService.getByName('chinchar')
        expect(result).toBeUndefined()
    })
})
