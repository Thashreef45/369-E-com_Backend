import {sign,verify} from 'jsonwebtoken'
import env from '../config/environment'


// Common function to generate token
const generateToken = (phone :string, time:string,signature:string) => {
    
    const payload = { phone : phone,role : "user" }

    return sign(payload,signature,{expiresIn:time})
}


// Generate token for 5 minute
const createTempToken = (phone : string) : string => {

    const token = generateToken(phone,'5m',env.OTP_JWT_SIGNATURE)
    return token
    
}


//Generate token for 3 day
// const createToken = (phone : string) : string => {
    
//     const token = generateToken(phone,'3d',env.JWT_SIGNATURE)
//     return token
// }


// accessToken
const createAccessToken = (phone : string) : string => {
    
    const token = generateToken(phone,'10m',env.JWT_SIGNATURE)
    return token
}

// refreshToken
const createRefreshToken = (phone : string) : string => {

    const token = generateToken(phone,'15d',env.REFRESH_JWT_SIGNATURE)
    return token
}



export {
    // createToken,
    createTempToken,
    createRefreshToken,
    createAccessToken,
} 
