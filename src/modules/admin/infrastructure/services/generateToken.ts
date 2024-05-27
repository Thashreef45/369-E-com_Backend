import {sign,verify} from 'jsonwebtoken'
import env from '../config/environment'

const createToken = (email : string) => {
    const payload = {
        email : email,
        role : "admin"
    }
    
    const time = '12h'

    return sign(payload,env.JWT_SIGNATURE,{expiresIn:time})
}

export default createToken