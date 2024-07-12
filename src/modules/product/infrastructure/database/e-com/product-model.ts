import { Schema, model } from "mongoose";


// --------------------- Product user feedback schema --------------------- //
const feedbackSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0, max: 5
    },
    comment: {
        type: String,
        trim: true
    }
}, { _id: false });
//----------------------------------------------------------------------------//




// --------------------- Product schema --------------------- //

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

    actualPrice : {
        type: Number,
        required: true,
        min: 0,
    },

    discount:{
        type: Boolean,
        default : false
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
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subcategoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category.subcategories',
        required: true
    },

    feedbacks: {
        type: [feedbackSchema],
        default: []
    },

    // // total no.of rating
    // ratingCount : {
    //     type : Number,
    //     default: 0
    // },
    // // no.of users did rating 
    // ratedBy : {
    //     type : Number,
    //     default: 0
    // }
}, { timestamps: true });


// ---------------------------- VIRTUAL FIELD------------------------------
// Virtual field for average rating
// productSchema.virtual('averageRating').get(function () {
    
//     if (this.feedbacks.length === 0) return 0

//     const totalRating = this.feedbacks.reduce((acc: number, feedback: any) => acc + feedback.rating, 0)
//     return totalRating / this.feedbacks.length
// });

// Serialize
// productSchema.set('toJSON', { virtuals: true });
// productSchema.set('toObject', { virtuals: true });

// ---------------------------------------------------------------------------




const productModel = model('Product', productSchema);

export default productModel;