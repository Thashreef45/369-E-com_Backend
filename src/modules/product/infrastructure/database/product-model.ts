import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        trim: true, 
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0, 
    },
    images: {
        type: [String],
        default: [],
    },
    thumbnail: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    }
}, { timestamps: true });

const productModel = model('Product', productSchema);

export default productModel;
