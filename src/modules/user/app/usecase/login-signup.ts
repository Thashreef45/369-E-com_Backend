import IRepository from '../../infrastructure/interface/IRepository'
import StatusCode from '../../infrastructure/config/staus-code'

class Login_Signup {

    private repository: IRepository
    private generateOtp
    private sendOtp
    private createToken

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
        this.generateOtp = dependencies.generateOtp
        this.createToken = dependencies.createToken

        this.sendOtp = dependencies.sendOtp
    }

    async execute(data: Input) {

        if (!data.phone) return {
            response: { message: "Credentials missing" },
            status: StatusCode.BAD_REQUEST
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
                    response: { message: 'Login success', token: token },
                    status: StatusCode.OK
                }
            }
        } catch (error) {
            return {
                response: { message: 'Internal error'},
                status: StatusCode.INTERNAL_ERROR
            }
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
