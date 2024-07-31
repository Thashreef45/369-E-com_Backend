import IRepository from '../../infrastructure/interface/IRepository'
import StatusCode from '../../infrastructure/config/status-code'

class verifyOtp {

    private repository: IRepository
    private createAccessToken: (phone: string) => string
    private createRefreshToken: (phone: string) => string

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository

        this.createAccessToken = dependencies.createAccessToken
        this.createRefreshToken = dependencies.createRefreshToken
    }

    async execute(data: Input): Promise<Output> {


        //check input credentials
        if (!data.otp || !data.phone) return {
            response: { message: "Credentials missing" },
            status: StatusCode.BAD_REQUEST
        }
        if (typeof data.otp != 'string' || typeof data.phone != 'string') return {
            response: { message: "Credentials type not matching" },
            status: StatusCode.BAD_REQUEST
        }


        try {


            // check user
            const user = await this.repository.findByPhone(data.phone)
            if (!user) return {
                response: { message: 'Account not found' },
                status: StatusCode.NOT_FOUND
            }



            //checking the otp 
            if (user.otp != data.otp) return {
                response: { message: 'Invalid OTP' },
                status: StatusCode.UNAUTHORIZED
            }


            const accessToken = this.createAccessToken(data.phone)
            const refreshToken = this.createRefreshToken(data.phone)


            //demo function 
            //const updated = await remove_otp_from_db(data.phone)


            //response message with token
            return {
                response: {
                    message: "Success", accessToken, refreshToken,
                },
                status: StatusCode.OK
            }

        } catch (error) {
            return {
                response: { message: "Internal error" },
                status: StatusCode.INTERNAL_ERROR
            }
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
    createAccessToken(phone: string): string
    createRefreshToken(phone: string): string
}


interface Output {
    response: {
        message: string,
        accessToken?: string,
        refreshToken?: string
    },
    status: StatusCode
}

