import { Schema, model } from 'mongoose';

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
    // price: {
    //     type: Number,
    //     required: true,
    //     min: 0,
    // },
    thumbnail: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        default: [],
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category-B2B',
        required: true
    },

    subcategoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category-B2B',
        required: true
    },
    
    ownerId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });


const productModel = model('Product-B2B', productSchema,'Product-B2B');

export default productModel;


