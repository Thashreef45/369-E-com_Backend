import { Schema, model } from 'mongoose';

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

const categorySchema = new Schema({
    
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

    subcategories: {
        type: [subcategorySchema],
        default: []
    }

});


const categoryModel = model('Category-B2B', categorySchema, 'Category-B2B');

export default categoryModel;