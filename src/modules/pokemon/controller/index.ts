/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express'
import { PokemonService } from '@/services/pokemon/index'
import { GetPokemonUseCase } from '@/modules/pokemon/useCases/getPokemonUseCase/index'
import { SortPokemonAbilityUseCase } from '@/modules/pokemon/useCases/sortPokemonAbility/index'
import { fromRequest } from '@/utils/fromRequest'
const { POKEMON_API_URL } = process.env

class PokemonController {
    public async listByName(request: Request, response: Response) {
        const pokemonName: string = fromRequest(
            request,
            'params',
            'pokemon_name',
            true
        )
        const pokemonService = new PokemonService(
            POKEMON_API_URL || 'https://pokeapi.co/api/v2/pokemon'
        )

        const getPokemonUseCase = new GetPokemonUseCase(pokemonService)
        getPokemonUseCase.prepare(pokemonName)
        let pokemon = await getPokemonUseCase.execute()

        const sortPokemonAbilityUseCase = new SortPokemonAbilityUseCase()
        sortPokemonAbilityUseCase.prepare(pokemon)
        pokemon = await sortPokemonAbilityUseCase.execute()

        return pokemon
    }
}

const pokemonController = new PokemonController()
export default pokemonController
