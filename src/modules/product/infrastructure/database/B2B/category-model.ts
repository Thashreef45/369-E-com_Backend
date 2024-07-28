import { Schema, model } from 'mongoose';

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
});


const categoryModel = model('Category-B2B', categorySchema,'Category-B2B');

export default categoryModel;