import { pokemonType } from '@/types/pokemon'
import { sortPokemonAbilityUsecaseInterface } from './index.d'

// eslint-disable-next-line prettier/prettier
export class SortPokemonAbilityUseCase implements sortPokemonAbilityUsecaseInterface {
    private pokemon: pokemonType

    prepare = (pokemon: pokemonType): void => {
        this.pokemon = pokemon
    }

    execute = (): pokemonType => {
        this.pokemon.abilities.sort((a, b) => (a > b ? 1 : -1))
        return this.pokemon
    }
}
