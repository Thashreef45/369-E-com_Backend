import {sign,verify} from 'jsonwebtoken'
import env from '../config/environment'


// Common function to generate token
const generateToken = (email :string, time:string) => {
    
    const payload = { email : email,role : "vendor" }

    return sign(payload,env.JWT_SIGNATURE,{expiresIn:time})
}


// Generate token for 5 minute
const createTempToken = (email : string) : string => {
    const token = generateToken(email,'5m')
    return token
}


//Generate token for 12 hour
const createToken = (email : string) : string => {
    const token = generateToken(email,'14h')
    return token
}




export {
    createToken,
    createTempToken,
} 
