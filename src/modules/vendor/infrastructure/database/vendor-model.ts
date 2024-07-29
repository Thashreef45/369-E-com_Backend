import { Schema, model } from "mongoose";


const vendorSchema = new Schema({

    name: String,

    phone: String,

    password : String,

    email: String,

    whatsapp : String,

    active: {
        type: Boolean,
        default: false
    },

    about : String,

    otp : {
        number : String,
        verified : Boolean,
    },


}, { timestamps: true })

const vendorModel  = model('Vendor',vendorSchema,'Vendor')


export default vendorModel