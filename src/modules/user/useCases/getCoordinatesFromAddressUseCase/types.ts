export interface IGetCoordinatesFromAddressUseCase {
    prepare(address: string)
    execute(): Promise<[number, number]>
}