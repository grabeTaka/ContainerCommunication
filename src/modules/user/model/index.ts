import { getModelForClass, modelOptions, mongoose, Prop } from "@typegoose/typegoose"
import ObjectId = mongoose.Types.ObjectId
import { IUser } from "@/types/user"
import { UserSchema } from "@/schemas"


@modelOptions({ schemaOptions: { validateBeforeSave: false } })
export class User implements UserSchema {
    @Prop({ required: true, default: () => new ObjectId().toString() })
    _id: string
    
    @Prop({ required: true })
    name!: string

    @Prop({ required: true })
    email!: string

    @Prop({ required: true })
    address: string

    @Prop({ required: true, type: () => [Number] })
    coordinates: [number, number]
}

export const userModel = getModelForClass(User);