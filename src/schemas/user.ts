import { z } from 'zod'

export const userSchema = z.object({
    name: z.string().min(1).max(255),
    email: z.string().email(),
    address: z.string().min(1).max(255).optional(),
    coordinates: z.array(z.number()).length(2).optional(),
})

export const createUserSchema = z.object({
    body: userSchema.refine(
        (data) => !!data?.address !== !!data?.coordinates,
        'Need to provide address or coordinates, not both.'
    ),
})