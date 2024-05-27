import {Schema,model} from "mongoose";

const adminSchema = new Schema ({
    email : {
        type : String,
        trim : true 
    },
    password : String,

    otp : String

},{ timestamps: true })


const adminModel = model('admin',adminSchema)
export default adminModel