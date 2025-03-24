import { BadRequestError } from "../../../../utils/errors/badRequest";
import { IGetAddressFromCoordinatesUseCase } from "./types";
import node_geocoder from 'node-geocoder'

//TODO adicionar validação caso usuário enviei env do google maps api

export class GetAddressFromCoordinatesUseCase implements IGetAddressFromCoordinatesUseCase {
    coordinates: [number, number]
    geoCoder: node_geocoder.Geocoder

    constructor() {
        this.geoCoder = node_geocoder({
            provider: 'openstreetmap',
        })        
    }

    prepare(coordinates: [number, number]) {
        this.coordinates = coordinates
    }
    async execute(): Promise<string> {
        try {
            const [lat, lng] = this.coordinates
            const address = await this.geoCoder.reverse({ lat: lat, lon: lng })
            if (!address.length) {
                throw new BadRequestError(
                    { message: 'Unable to get address from coordinates' }
                )
            }
            return address[0].formattedAddress
        } catch (error) {
            throw new BadRequestError(
                { message: 'Unable to get address from coordinates' }

            )
        }
    }
}