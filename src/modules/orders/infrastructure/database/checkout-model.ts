import { Schema, model } from "mongoose";


const schema = new Schema({

    userId : Schema.Types.ObjectId,
    addressId : Schema.Types.ObjectId,

    paymentId : String,
    cod : Boolean,
    
    status : {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },


}, { timestamps: true })

const checkOutModel  = model('Checkout',schema,'Checkout')


export default checkOutModel