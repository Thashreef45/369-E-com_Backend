import IRepository from '../../infrastructure/interface/IRepository'
import StatusCode from '../../infrastructure/config/staus-code'

class verifyOtp {

    private repository: IRepository
    private createToken

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
        this.createToken = dependencies.createToken
    }

    async execute(data: Input): Promise<Output> {

        // db data fetch
        const user = await this.repository.findByPhone(data.phone)
        if (!user) {
            return {
                response: { message: 'Account not found' },
                status: StatusCode.NOT_FOUND
            }
        }

        //checking the otp 
        if (user.otp != data.otp) {
            return {
                response: { message: 'Invalid OTP' },
                status: StatusCode.UNAUTHORIZED
            }
        }

        // todo
        // const token = generateToken()
        // const refreshToken = generateRefreshToken()

        const token = this.createToken(data.phone)

        //response message with token
        return {
            response: { message: "Success", token: token },
            status: StatusCode.OK
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
    createToken(phone:string): any
}


interface Output {
    response: { message: string, token?: string },
    status: StatusCode
}

