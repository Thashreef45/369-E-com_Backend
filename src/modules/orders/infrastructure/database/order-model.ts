import { Schema, model } from "mongoose";


const orderSchema = new Schema({

    checkoutId: Schema.Types.ObjectId,
    productId: String,
    quantity: Number,
    price: Number,
    // status : {
        //     type: String,
        //     enum: ['pending','initiated', 'shipped', 'out for delivery', 'delivered','cancelled'],
        //     // default: 'pending'
    // },
        
        
    cod : Boolean,
    status: { 
        pending: Boolean,
        initiated: {
            status: { type: Boolean, default: false },
            time: { type: Date, default: null }
        },
        shipped: {
            status: { type: Boolean, default: false },
            time: { type: Date, default: null }
        },
        outForDelivery: {
            status: { type: Boolean, default: false },
            time: { type: Date, default: null }
        },
        delivered: {
            status: { type: Boolean, default: false },
            time: { type: Date, default: null }
        },
        cancelled: {
            status: { type: Boolean, default: false },
            time: { type: Date, default: null }
        },
    },

    userId: Schema.Types.ObjectId,
    addressId: Schema.Types.ObjectId,

}, { timestamps: true })

const orderModel = model('Order', orderSchema, 'Order')


export default orderModel