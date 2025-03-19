import { pokemonType } from '../../../../types/pokemon'

export interface getPokemonUsecaseInterface {
    prepare: (name: string) => void
    execute: () => Promise<pokemonType>
}
