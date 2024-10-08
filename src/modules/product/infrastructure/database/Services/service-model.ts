import { Schema, model } from "mongoose";


// --------------------- Service schema --------------------- //

const serviceSchema = new Schema({
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
        ref: 'Category-Service',
        required: true
    },
    subcategoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category-Service.subcategories',
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





const serviceModel = model('Service', serviceSchema);

export default serviceModel;