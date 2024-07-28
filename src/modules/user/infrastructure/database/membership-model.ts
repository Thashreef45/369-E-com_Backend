import { Schema, model } from "mongoose"

const schema = new Schema({
    name: String,
    description: String,
    price : Number,
    thumbanail : String,
    features: [String]
}, { timestamps: true })


const membershipModel = model('Membership', schema, 'Membership')
export default membershipModel