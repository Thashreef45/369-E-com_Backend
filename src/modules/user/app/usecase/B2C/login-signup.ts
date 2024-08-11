import IRepository from '../../../infrastructure/interface/IRepository'
import StatusCode from '../../../infrastructure/config/status-code'

class Login_Signup {

    private repository: IRepository
    private generateOtp: any
    private sendOtp: any
    private createToken: any

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
        this.generateOtp = dependencies.generateOtp
        this.createToken = dependencies.createToken

        this.sendOtp = dependencies.sendOtp
    }

    async execute(data: Input): Promise<Output> {

        const credential = this.#checkInputCredentials(data)
        if (!credential.success) return {
            response: { message: credential.message },
            status: credential.status
        }

        try {

            const user = await this.repository.findByPhone(data.phone)

            const otp = this.generateOtp()
            const token = this.createToken(data.phone)

            if (!user) {

                // Update user to database
                const createUser = await this.repository.createUser(data.phone, otp)

                // send otp to the user
                this.sendOtp(data.phone, otp)

                return {
                    response: { message: 'Account created', token: token },
                    status: StatusCode.CREATED
                }

            } else {

                // Update user data with new otp
                const updateDB = await this.repository.updateOtp(data.phone, otp)

                // send otp to the user
                this.sendOtp(data.phone, otp)

                return {
                    response: { message: 'Success', token: token },
                    status: StatusCode.OK
                }
            }
        } catch (error) {

            return {
                response: { message: 'Internal error' },
                status: StatusCode.INTERNAL_ERROR
            }
        }

    }


    #checkInputCredentials(data: Input): { message: string, success: boolean, status: StatusCode } {

        if (!data.phone) return {
            message: "Credentials missing",
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        if (typeof data.phone != 'string') return {
            message: "Credentials type not matching",
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        if (data.phone.length > 13) return {
            message: "Invalid credential",
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        return {
            message: "",
            status: StatusCode.OK,
            success: true
        }
    }
}

export default Login_Signup


interface Dependencies {
    repository: IRepository
    generateOtp: any
    createToken(phone: string): any
    sendOtp(phone: string, otp: string): any
}

interface Input {
    phone: string
}

interface Output {
    response: { message: string, token?: string },
    status: StatusCode
}
