import mongoose from 'mongoose';
import { z } from 'zod'

//TODO levar isso para os utils
const isCoordinateValid = (longitude: number, latitude: number): boolean => {
    const isLongitudeValid = longitude >= -180 && longitude <= 180;
    const isLatitudeValid = latitude >= -90 && latitude <= 90;

    return isLongitudeValid && isLatitudeValid;
};

const isFirstAndLastSame = (firstCoordinate: number[], lastCoordinate: number[]): boolean => {
    return firstCoordinate[0] === lastCoordinate[0] && firstCoordinate[1] === lastCoordinate[1]
};

const hasDuplicatesCoordinates = (coordinates: number[][]) => {
    return coordinates
        .slice(0, coordinates.length - 1)
        .some(([lat, lng], index, array) =>
            array.slice(index + 1).some(([otherLat, otherLng]) => lat === otherLat && lng === otherLng)
        );
}

export const regionSchema = z.object({
    name: z.string().min(2).max(255),
    location: z.object({
        type: z.literal('Polygon', {
            invalid_type_error: 'Region type must be Polygon',
        }),

        coordinates: z.array(
            z
                .array(z.array(z.number())
                    .length(2)
                    .refine(
                        (data) => isCoordinateValid(data[0], data[1]),
                        'Longitude(first position) must be between -180 and 180, Latitude(second position) must be between -90 and 90'
                    ))
                .min(4, 'Polygons must have at least four coordinates')
                .refine(
                    (value) => {
                        return isFirstAndLastSame(value[0], value[value.length - 1])
                    },
                    {
                        message: 'First and last coordinates must be the same',
                    }
                )
                .refine(
                    (value) => {
                        const hasDuplicates = hasDuplicatesCoordinates(value)
                        return !hasDuplicates
                    },
                    {
                        message:
                            'Coordinates must not have duplicates, except for the first and last coordinates',
                    }
                )
        )
    })
    
    //user: zObjectId,
})

export const createRegionSchema = z.object({
    body: regionSchema,
})

export const updateRegionSchema = z.object({
    params: z.object({
            id: z
            .string()
            .refine((data) => mongoose.Types.ObjectId.isValid(data), {
                message: 'Invalid id',
            }),
    }),
    body: regionSchema
        .partial(),
})