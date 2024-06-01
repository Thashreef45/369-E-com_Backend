import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    dob: String,
    phone: {
        require: true,
        unique: true,
        type: String
    },
    address: [
        {
            name: String,
            address: String,
            phone: String,
            pin: String,
        }
    ],

    cart: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                unique: true
            },
            quantity: {
                type: Number,
                default: 1,
            }
        }
    ],

    wishlist: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product",
            unique: true
        },
    ],

    otp: String

    // otp : {
    //     number : String,
    //     createAt : Date,
    // }

}, { timestamps: true })


const userModel = model('User', userSchema)
export default userModel