import mongoose from "mongoose";
import { z } from "zod";

export const deleteDbResultSchema = z.object({
    acknowledged: z.boolean(),
    deletedCount: z.number()
})

export const updateDbResultSchema = z.object({
    acknowledged: z.boolean(),
    modifiedCount: z.number(),
    upsertedCount: z.number(),
    matchedCount: z.number()
})
