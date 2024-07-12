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


        //check input credentials
        if (!data.otp || !data.phone) return {
            response: { message: "Credentials missing" },
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

            // todo
            // const token = generateToken()
            // const refreshToken = generateRefreshToken()

            const token = this.createToken(data.phone)

            
            //demo function 
            //const updated = await remove_otp_from_db(data.phone)
            

            //response message with token
            return {
                response: { message: "Success", token: token,
                    // refreshToken : ""
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
    createToken(phone: string): any
}


interface Output {
    response: { message: string, token?: string },
    status: StatusCode
}

