import { pokemonType } from '../../../../types/pokemon'

export interface sortPokemonAbilityUsecaseInterface {
    prepare: (pokemon: pokemonType) => void
    execute: () => pokemonType
}
