import { BadRequestError } from "../../../../utils/errors/badRequest";
import { IGetCoordinatesFromAddressUseCase } from "./types";
import node_geocoder from 'node-geocoder'


export class GetGoordinatesFromAddressUseCase implements IGetCoordinatesFromAddressUseCase {
    address: string
    geoCoder: node_geocoder.Geocoder

    constructor() {
        this.geoCoder = node_geocoder({
                    provider: 'openstreetmap',
        })        
    }

    prepare(address: string) {
        this.address = address
    }
    async execute(): Promise<[number, number]> {
        try {
            
            const locations = await this.geoCoder.geocode(this.address)
            console.log(locations)
            if (!locations.length) {
                throw new BadRequestError(
                    { message: 'Unable to get coortinates from address' }
                )
            }
            return [locations[0].latitude, locations[0].longitude]
        } catch (error) {
            throw new BadRequestError(
                { message: 'Unable to get coortinates from address' }

            )
        }
    }
}

// TODO MELHORAR TRATAMENTO DE ERROS