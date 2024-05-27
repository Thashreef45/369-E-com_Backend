import IRepository from '../../infrastructure/interface/IRepository'
import StatusCode from '../../infrastructure/config/staus-code'

class verifyOtp {

    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input) {

        // db data fetch
        const user = await this.repository.findByPhone(data.phone)
        if (!user) {
            return {
                response: { message: 'Account not found'},
                status: StatusCode.NOT_FOUND
            }
        }

        //checking the otp 
        if (user.otp != data.otp){
            return {
                response: { message: 'Invalid OTP'},
                status: StatusCode.UNAUTHORIZED
            }
        }

        // todo: generateTokens
        // const token = generateToken()
        // const refreshToken = generateRefreshToken()

        //response message with token
        return {
            response : {message:"Success",token:"",refreshToken:''},
            status : StatusCode.OK
        }
    }
}

export default verifyOtp


interface Input {
    phone: string,
    otp: string,
}

interface Dependencies {
    repository: IRepository
}

