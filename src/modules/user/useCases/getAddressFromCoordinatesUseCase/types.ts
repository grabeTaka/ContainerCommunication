export interface IGetAddressFromCoordinatesUseCase {
    prepare(coordinates: [number, number])
    execute(): Promise<string>
}