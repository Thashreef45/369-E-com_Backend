import { Schema, model } from "mongoose";

//schema for Subcategory
const subcategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    }
})


//schema for Category
const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },

    subcategories: {
        type : [subcategorySchema],
        default : []
    },
}, { timestamps: true })


const categoryModel = model('Category-Service', categorySchema,'Category-Service');

export default categoryModel;