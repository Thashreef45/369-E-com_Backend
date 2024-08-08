import { sign, verify } from 'jsonwebtoken'
import env from '../config/environment'


// Common function to generate token
const generateToken = (email: string, SIGNATURE : string, time: string) => {

    const payload = { email: email, role: "vendor" }

    // return sign(payload, env.JWT_SIGNATURE, { expiresIn: time })
    return sign(payload, SIGNATURE, { expiresIn: time })

}


// Generate token for 5 minute
const createOtpToken = (email: string): string => {
    const token = generateToken(email,env.JWT_OTP_SIGNATURE, '5m')
    return token
}


//Generate token for 14 hour
const createToken = (email: string): string => {
    const token = generateToken(email,env.JWT_SIGNATURE, '14h')
    return token
}




export {
    createToken,
    createOtpToken,
} 
