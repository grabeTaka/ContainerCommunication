import { getModelForClass, modelOptions, mongoose, Prop, Ref } from "@typegoose/typegoose"
import ObjectId = mongoose.Types.ObjectId
import { RegionSchema } from "@/schemas"
import GeoJSON from "./geoJSON"
import { User } from "@/modules/user/model"

//TODO VERIFICAR ESSE INDEX

@modelOptions({ schemaOptions: { validateBeforeSave: false } })
export class Region implements RegionSchema {
    @Prop({ required: true, default: () => new ObjectId().toString() })
    _id: string

    @Prop({ required: true })
    name!: string

    @Prop({ type: () => GeoJSON, index: '2dsphere', required: true })
    location!: {
        type: 'Polygon'
        coordinates: number[][][]
    }

    /*@Prop({ ref: () => User, required: true, type: () => String })
    user: Ref<User>*/

   
}

export const regionModel = getModelForClass(Region);