type abilityType = {
    ability: {
        name: string
        url: string
    }
}
export interface getbyNameResult {
    name: string
    abilities: abilityType[],
}

export interface pokemonServiceInterface {
    url: string
    getByName: (name: string) => Promise<getbyNameResult>
}
