import { Schema, model } from "mongoose";


// --------------------- Product user feedback schema --------------------- //
const feedbackSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    rating: {
        type: Number,
        required: true,
        min: 1, max: 5
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
        // maxlength : 12,
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

    actualPrice: {
        type: Number,
        required: true,
        min: 0,
    },

    offer: {
        type: Boolean,
        default: false
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

    rating: {
        one: {
            default: 0,
            type: Number
        },
        two: {
            default: 0,
            type: Number
        },
        three: {
            default: 0,
            type: Number
        },
        four: {
            default: 0,
            type: Number
        },
        five: {
            default: 0,
            type: Number
        },
    },

    // averageRating : Number

    feedbacks: {
        type: [feedbackSchema],
        default: []
    },


    ownership: {

        isAdmin: {
            type: Boolean,
            default: false
        },
        ownerId: Schema.Types.ObjectId,

    }

}, { timestamps: true });


// ---------------------------- VIRTUAL FIELD------------------------------
productSchema.virtual('averageRating').get(function() {

    const ratings = this.rating || { one: 0, two: 0, three: 0, four: 0, five: 0 };  // to avoid undefined (* rating field)

    const totalRatings = ratings.one + ratings.two + ratings.three + ratings.four + ratings.five;
    if (totalRatings === 0) return 0;

    const totalScore = (ratings.one * 1) + (ratings.two * 2) + (ratings.three * 3) + (ratings.four * 4) + (ratings.five * 5);
    return totalScore / totalRatings;
});

//virtual fields,serialization
productSchema.set('toObject', { virtuals: true });
productSchema.set('toJSON', { virtuals: true });

// ---------------------------------------------------------------------------




const productModel = model('Product', productSchema);

export default productModel;