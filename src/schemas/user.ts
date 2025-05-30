import mongoose from 'mongoose'
import { z } from 'zod'

export const userSchema = z.object({
    name: z.string().min(1).max(255),
    email: z.string().email(),
    address: z.string().min(1).max(255).optional(),
    coordinates: z.tuple([z.number(), z.number()]).refine((arr) => {
        const [lat, lng] = arr;
        return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
      }, {
        message: 'Latitude must be between -90 and 90, Longitude must be between -180 and 180.',
      }).optional()
})

export const createUserSchema = z.object({
    body: userSchema.refine(
        (data) => !!data?.address !== !!data?.coordinates,
        'Need to provide address or coordinates, not both.'
    ),
})

export const updateUserSchema = z.object({
    params: z.object({
        id: z
        .string()
        .refine((data) => mongoose.Types.ObjectId.isValid(data), {
            message: 'Invalid id',
        }),
    }),
    body: userSchema
        .partial()
        .refine(
            (data) => !(!!data?.address && !!data?.coordinates),
            'You only can provide address OR coordinates, neither both'
        ),
})