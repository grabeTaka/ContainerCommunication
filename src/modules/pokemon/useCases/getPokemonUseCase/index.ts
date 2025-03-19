import { pokemonType } from '@/types/pokemon'
import { getPokemonUsecaseInterface } from './index.d'
import { pokemonServiceInterface } from '@/services/pokemon/index.d'
import { NotFoundError } from '@/utils/errors/notFound'

export class GetPokemonUseCase implements getPokemonUsecaseInterface {
    private pokemonService: pokemonServiceInterface
    private pokemonName: string

    constructor(pokemonRepository: pokemonServiceInterface) {
        this.pokemonService = pokemonRepository
    }

    prepare = (name: string): void => {
        this.pokemonName = name.toLocaleLowerCase().trim()
    }

    execute = async (): Promise<pokemonType> => {
        const result = await this.pokemonService.getByName(this.pokemonName)

        if (!result) throw new NotFoundError({ message: 'Pokemon not found' })

        const abilities = result.abilities.map((pokemon) => {
            return pokemon.ability.name
        })

        const pokemon: pokemonType = {
            abilities,
        }

        return pokemon
    }
}
