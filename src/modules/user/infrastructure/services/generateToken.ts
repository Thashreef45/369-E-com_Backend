import {sign,verify} from 'jsonwebtoken'
import env from '../config/environment'

const createToken = (phone : string) => {
    const token = {
        phone : phone,
        role : "user"
    }

    // todo : time has to be changed
    const time = 0

    return sign(token,env.JWT_SIGNATURE,{expiresIn:time})
}

export default createToken