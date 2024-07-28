import {config} from 'dotenv'
config()

const env = {
    Port : process.env.PORT,
    MongoDb_Connection : process.env.MongoDb_Connection as string,
    NODE_ENV : process.env.NODE_ENV,
    JWT_SIGNATURE : process.env.JWT_SIGNATURE,
    OTP_JWT_SIGNATURE :  process.env.OTP_JWT_SIGNATURE
}

export default env

