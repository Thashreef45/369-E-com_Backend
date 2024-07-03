import {sign,verify} from 'jsonwebtoken'
import env from '../config/environment'


// Common function to generate token
const generateToken = (phone :string, time:string) => {
    
    const payload = { phone : phone,role : "user" }

    return sign(payload,env.JWT_SIGNATURE,{expiresIn:time})
}


// Generate token for 5 minute
const createTempToken = (phone : string) : string => {
    const token = generateToken(phone,'5m')
    return token
    
}


//Generate token for 3 day
const createToken = (phone : string) : string => {
    const token = generateToken(phone,'3d')
    return token
}




export {
    createToken,
    createTempToken,
} 
